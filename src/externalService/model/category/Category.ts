import { Diagnosis } from "../diagnosis/Diagnosis";

export interface Category {
  id: number; // Cambiado de string a number
  code: string;
  name: string;
  diagnoses: Diagnosis[]; // Lista de diagnósticos relacionados con la categoría
}