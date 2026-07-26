import type { Dienst } from "../models/Dienst";
import dienstenData from "../data/diensten.json";

export async function getDiensten(): Promise<Dienst[]> {
    return dienstenData;
}