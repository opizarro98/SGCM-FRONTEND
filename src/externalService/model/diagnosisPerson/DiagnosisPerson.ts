import { Diagnosis } from '../diagnosis/Diagnosis';
import { Person } from '../person/Person';
export interface DiagnosisPerson {
    diagnosisCIE: Diagnosis;
    person: Person;
}