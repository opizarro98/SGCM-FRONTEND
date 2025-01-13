import { Diagnosis } from "../diagnosis/Diagnosis";

export interface CategoryCreate {
  id: string; // Cambiado de string a number
  code: string;
  name: string;
}