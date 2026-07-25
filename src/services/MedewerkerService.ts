import type { Medewerker } from "../models/Medewerker";

export async function getMedewerkers(): Promise<Medewerker[]> {

    const response = await fetch("/medewerkers.json");

    const medewerkers: Medewerker[] = await response.json();

    return medewerkers;
}