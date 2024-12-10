import { Component } from '@angular/core';
import { PersonService } from 'src/externalService/service/person/PersonService';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
})
export class HistoriaComponent {
     identification: string = '';
  paciente: any = null; // Aquí se guarda el paciente buscado

  buscarPaciente(): void {
    // Simulación de la búsqueda del paciente
    // Reemplazar esto con una llamada al servicio que devuelva los datos reales del paciente
    const mockPaciente = {
      firstName: 'Abdon Geova',
      lastName: 'Intriago Giler',
      birthDate: '1998-11-12',
      occupancy: 'Estudiante'
    };
    this.paciente = mockPaciente; // Asignar los datos del paciente
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
/*cedula: string = '';
    persona: any;
    citas: any[] = [];
    selectedCita: any;
    diagnostico: string = '';
    antecedentes: string = '';

    constructor(private personService: PersonService){}//, private citasService: CitasService) {}

    ngOnInit(): void {}

    buscarPersona() {
        this.personService.getPersonByIdentification(this.cedula).subscribe(
            (data) => {
                this.persona = data;
                //  this.cargarCitas();
            },
            (error) => {
                console.error('Persona no encontrada');
            }
        );
    }

    // cargarCitas() {
    //     if (this.persona) {
    //         this.citasService.getCitasByPersonaId(this.persona.id).subscribe((data) => {
    //             this.citas = data;
    //         });
    //     }
    // }

    cargarDetallesCita() {
        if (this.selectedCita) {
            this.diagnostico = this.selectedCita.diagnostico;
            this.antecedentes = this.selectedCita.antecedentes;
        }
    }
}
*/