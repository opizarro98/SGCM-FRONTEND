import { Diagnosis } from '../diagnosis/Diagnosis';
import { Person } from '../person/Person';
export interface DiagnosisPersonComplete {
    id:string;
    diagnosisCIE: Diagnosis;
    person: Person;
}