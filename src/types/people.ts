export interface Person {
  id: string;
  name: string;
  biography?: string;
  birthDate?: string;
  deathDate?: string;
  roles: string[]; // composer, lyricist, performer, etc.
  aliases?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonFormData {
  name: string;
  biography: string;
  birthDate: string;
  deathDate: string;
  roles: string[];
  aliases: string;
  notes: string;
}