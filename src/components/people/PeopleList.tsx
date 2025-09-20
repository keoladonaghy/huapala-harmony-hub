import { useState } from "react";
import { Person } from "@/types/people";
import { mockPeople } from "@/data/mockPeople";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PersonFormModal } from "./PersonFormModal";
import { Plus, Search, Edit2, Calendar, User } from "lucide-react";

export function PeopleList() {
  const [people, setPeople] = useState<Person[]>(mockPeople);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (person.aliases && person.aliases.some(alias => 
      alias.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const handleAddPerson = (newPerson: Omit<Person, "id" | "createdAt" | "updatedAt">) => {
    const person: Person = {
      ...newPerson,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPeople([...people, person]);
  };

  const handleEditPerson = (updatedPerson: Omit<Person, "id" | "createdAt" | "updatedAt">) => {
    if (editingPerson) {
      const person: Person = {
        ...updatedPerson,
        id: editingPerson.id,
        createdAt: editingPerson.createdAt,
        updatedAt: new Date().toISOString()
      };
      setPeople(people.map(p => p.id === editingPerson.id ? person : p));
      setEditingPerson(null);
    }
  };

  const openEditModal = (person: Person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People Management</h1>
          <p className="text-muted-foreground">Manage composers, performers, and other contributors</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-ocean-deep hover:bg-ocean-deep/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Person
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, role, or alias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{person.name}</CardTitle>
                  {person.aliases && person.aliases.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      aka {person.aliases.join(", ")}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(person)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {person.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
              
              {(person.birthDate || person.deathDate) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {person.birthDate && formatDate(person.birthDate)}
                    {person.birthDate && person.deathDate && " - "}
                    {person.deathDate && formatDate(person.deathDate)}
                  </span>
                </div>
              )}

              {person.biography && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {person.biography}
                </p>
              )}

              {person.notes && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    {person.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="text-center py-8">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No people found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms" : "Start by adding your first person"}
          </p>
        </div>
      )}

      <PersonFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingPerson ? handleEditPerson : handleAddPerson}
        person={editingPerson}
      />
    </div>
  );
}