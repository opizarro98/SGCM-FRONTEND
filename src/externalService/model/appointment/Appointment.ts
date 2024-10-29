import { Person } from "../person/Person";

export interface Appointment {
  date: string;
  hour: string;
  description: string;
  person: Person;
}