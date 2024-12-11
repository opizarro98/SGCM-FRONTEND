export interface Diagnosis {
  id: string;
  name: string;
  code:string;
  category: {
    id: string;
    name: string;
  };
}