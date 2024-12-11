import { Component } from '@angular/core';
import { PersonService } from 'src/externalService/service/person/PersonService';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
})
export class HistoriaComponent {
  identification: string = '';
  paciente: any = null; // Aquí se guarda el paciente buscado
  token: string | null = null;
  attentions: any[] = []; // Lista de atenciones para el acordeón

  
    constructor(private personService: PersonService) {
    this.token = localStorage.getItem('token');
   }

  buscarPaciente() {
    if (!this.identification) {
      console.error('La cédula no puede estar vacía');
      return;
    }
    

    this.personService.getPersonByIdentification(this.identification).subscribe({
      next: (person) => {
        this.paciente = {
          id: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          occupancy: person.occupancy,
          history: person.history,
          appointments: person.appointments
        };

        this.attentions = person.history?.attentions || []; // Obtener lista de atenciones
      },
      error: () => {
        console.error('Error al buscar la persona');
        this.paciente = null;
        this.attentions = [];
      }
    });
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
}