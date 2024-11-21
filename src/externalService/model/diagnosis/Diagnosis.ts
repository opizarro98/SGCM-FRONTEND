import { Category } from "../category/Category";

export interface Diagnosis {
  id:string;
  code: string;
  name: string;
  category:Category;
}