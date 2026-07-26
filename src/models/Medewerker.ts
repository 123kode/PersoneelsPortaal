export interface Medewerker {
  id: number;
  voornaam: string;
  naam: string;

  // Werkgegevens
  dienst: string;
  team?: string;
  specifiekeGroep?: string[];
  gebouw?: string;
  functie: string;

  // Contact
  email: string;
  telefoon: string;
  vastToestel?: string;

  // Status
  aanwezig: boolean;

  // Profiel
  foto: string;
}