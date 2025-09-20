import { useState, useEffect } from "react";
import { Person, PersonFormData } from "@/types/people";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface PersonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (person: Omit<Person, "id" | "createdAt" | "updatedAt">) => void;
  person?: Person | null;
}

const defaultRoles = ["composer", "lyricist", "performer", "vocalist", "musician", "arranger", "producer"];

export function PersonFormModal({ isOpen, onClose, onSubmit, person }: PersonFormModalProps) {
  const [formData, setFormData] = useState<PersonFormData>({
    name: "",
    biography: "",
    birthDate: "",
    deathDate: "",
    roles: [],
    aliases: "",
    notes: "",
  });

  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        biography: person.biography || "",
        birthDate: person.birthDate || "",
        deathDate: person.deathDate || "",
        roles: person.roles,
        aliases: person.aliases?.join(", ") || "",
        notes: person.notes || "",
      });
    } else {
      setFormData({
        name: "",
        biography: "",
        birthDate: "",
        deathDate: "",
        roles: [],
        aliases: "",
        notes: "",
      });
    }
  }, [person, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const processedPerson = {
      name: formData.name.trim(),
      biography: formData.biography.trim() || undefined,
      birthDate: formData.birthDate || undefined,
      deathDate: formData.deathDate || undefined,
      roles: formData.roles,
      aliases: formData.aliases.trim() 
        ? formData.aliases.split(",").map(alias => alias.trim()).filter(Boolean)
        : undefined,
      notes: formData.notes.trim() || undefined,
    };

    onSubmit(processedPerson);
    onClose();
  };

  const addRole = (role: string) => {
    if (role && !formData.roles.includes(role)) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, role]
      }));
    }
  };

  const removeRole = (roleToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(role => role !== roleToRemove)
    }));
  };

  const addCustomRole = () => {
    if (newRole.trim()) {
      addRole(newRole.trim().toLowerCase());
      setNewRole("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {person ? "Edit Person" : "Add New Person"}
          </DialogTitle>
          <DialogDescription>
            {person ? "Update person information" : "Add a new person to the database"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aliases">Aliases</Label>
              <Input
                id="aliases"
                value={formData.aliases}
                onChange={(e) => setFormData(prev => ({ ...prev, aliases: e.target.value }))}
                placeholder="Comma-separated aliases"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deathDate">Death Date</Label>
              <Input
                id="deathDate"
                type="date"
                value={formData.deathDate}
                onChange={(e) => setFormData(prev => ({ ...prev, deathDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Roles</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.roles.map((role) => (
                <Badge key={role} variant="secondary" className="flex items-center gap-1">
                  {role}
                  <button
                    type="button"
                    onClick={() => removeRole(role)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {defaultRoles
                .filter(role => !formData.roles.includes(role))
                .map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addRole(role)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {role}
                  </Button>
                ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Add custom role"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomRole();
                  }
                }}
              />
              <Button type="button" onClick={addCustomRole} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="biography">Biography</Label>
            <Textarea
              id="biography"
              value={formData.biography}
              onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
              placeholder="Brief biography or description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or comments"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-ocean-deep hover:bg-ocean-deep/90">
              {person ? "Update Person" : "Add Person"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}