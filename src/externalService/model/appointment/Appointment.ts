import { Person } from "../person/Person";

export interface Appointment {
  date: string;
  hour: string;
  reason: string;
  person: Person;
}