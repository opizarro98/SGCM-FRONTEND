import { Component } from '@angular/core';
import { PersonService } from 'src/externalService/service/person/PersonService';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
})
export class HistoriaComponent {
cedula: string = '';
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
