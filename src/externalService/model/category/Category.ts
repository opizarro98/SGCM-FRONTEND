import { Diagnosis } from "../diagnosis/Diagnosis";

export interface Category {
  id: string;
  code: string;
  name: string;
  diagnoses: Diagnosis[]; // Lista de diagnósticos relacionados con la categoría
}
