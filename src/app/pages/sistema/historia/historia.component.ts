import { Component } from '@angular/core';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { AntecedentsService } from 'src/externalService/service/antecedets/antecedentService';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { DiagnosisPersonService } from 'src/externalService/service/diagnosisPerson/DiagnosisPersonService';
import { PersonService } from 'src/externalService/service/person/PersonService';
import { Person } from 'src/externalService/model/person/Person';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
})
export class HistoriaComponent {
  nombre: string = '';
  paciente: any = null; // Aquí se guarda el paciente buscado
  token: string | null = null;
  attentions: any[] = []; // Lista de atenciones para el acordeón
  diagnosis: string = ''; // Diagnóstico actual
  antecedentes: string = ''; // Antecedentes actuales
  personasFiltradas: any[] = [];

  constructor(
    private personService: PersonService,
    private diagnosisService: DiagnosisPersonService,
    private antecedentsService: AntecedentsService
  ) {
    this.token = localStorage.getItem('token');
  }

  calcularEdad(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  buscarPorNombre() {
    //console.log('ingresa a la busqeuda por nombre')
    const nombre = this.nombre; // Evita undefined
    if (nombre.length > 2) {
      this.personService.getPersonByName(nombre).pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((data: any) => {
        this.personasFiltradas = data || [];
        //console.log(this.personasFiltradas);
      });
    }
  }


  seleccionarPersona(event: any) {
    const personaSeleccionada: Person = event.option.value;
    if (personaSeleccionada) {
      this.nombre = personaSeleccionada.firstName + " " + personaSeleccionada.lastName;
      this.buscarPaciente(personaSeleccionada.identification);
    }
  }

  buscarPaciente(identificacion: string) {
    if (!this.nombre) {
      console.error('La cédula no puede estar vacía');
      return;
    }

    const token = this.token || ''; // Obtener el token
    //console.log(' la cedual es: ' + identificacion);

    this.personService.getPersonByIdentification(identificacion).subscribe({
      next: (person) => {
        // Construir el objeto paciente
        this.paciente = {
          id: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          occupancy: person.occupancy,
          history: person.history,
          appointments: person.appointments
        };

        // Obtener antecedentes
        this.antecedentsService.getAntecedentsByPersonId(person.id, token).subscribe({
          next: (response) => {
            if (Array.isArray(response) && response.length > 0) {
              this.antecedentes = response[0].description; // Usar el primer elemento del arreglo
            } else if (response && response.description) {
              this.antecedentes = response.description; // Si es un único objeto
            } else {
              this.antecedentes = 'No se encontraron antecedentes.';
            }
          },
          error: (error) => {
            console.error('Error al obtener antecedentes:', error);
            this.antecedentes = 'No se encontraron antecedentes.';
          }
        });


        //obtener diagnostico
        this.diagnosisService.getDiagnosisByPersonId(person.id, token).subscribe({
          next: (diagnosisResponse) => {
            if (diagnosisResponse && diagnosisResponse) {
              this.diagnosis = diagnosisResponse.diagnosisPerson.diagnosisCIE.code + " - " + diagnosisResponse.diagnosisPerson.diagnosisCIE.name;
            } else {
              this.diagnosis = "No se encontraron diagnósticos.";
            }
          },
          error: (error) => {
            console.error('Error al obtener diagnósticos:', error);
            this.diagnosis = "No se encontraron diagnósticos.";
          }
        });

        // Obtener lista de atenciones
        this.attentions = person.history?.attentions || [];
      },
      error: () => {
        console.error('Error al buscar la persona');
        this.paciente = null;
        this.attentions = [];
        this.diagnosis = '';
        this.antecedentes = '';
      }
    });
  }
}