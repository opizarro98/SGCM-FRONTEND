import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {PersonService} from 'src/externalService/service/person/PersonService';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person} from 'src/externalService/model/person/Person';
import { formatDate } from '@angular/common';

@Component({
  selector: 'editarPersona',
  templateUrl: 'editarPersona.html',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarPersonaDialog {
    personForm: FormGroup;
    token: string | null = null;
    idGlobalPerson: string | null =null;
     

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarPersonaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { identification: string }
  ) {
    this.token = localStorage.getItem('token');
    // Crear formulario vacío
    this.personForm = this.fb.group({
      cedula: [''],
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      ocupacion: ['']
    });

    // Buscar persona y setear datos
    this.buscarPersona();
  }

  buscarPersona() {
    this.personService.getPersonByIdentification(this.data.identification).subscribe({
      next: (person) => {
        this.personForm.patchValue({
          cedula: person.identification,
          nombre: person.first_name,
          apellido: person.last_name,
          fechaNacimiento: person.birth_date,
          ocupacion: person.occupancy
        });
        this.personForm.enable(); // Habilitar el formulario para edición
        this.personForm.get('cedula')?.disable();
        this.idGlobalPerson = person.id;
      },
      error: () => {
        console.error('Error al buscar la persona');
      }
    });
  }

  
  onSubmit() {
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    if(this.idGlobalPerson == null){
        this.snackBar.open('Error: El paciente no tiene un id para el sistema, consulte al adminsitrador', 'Cerrar', { duration: 3000 });
        return;
    }

    const editPerson: Person = {
      id: this.idGlobalPerson,
      identification: this.personForm.get('cedula')?.value,
      first_name: this.personForm.get('nombre')?.value,
      last_name: this.personForm.get('apellido')?.value,
      birth_date: formatDate(this.personForm.get('fechaNacimiento')?.value, 'yyyy-MM-dd', "en-US"),
      occupancy: this.personForm.get('ocupacion')?.value
    };
    this.personService.UpdatePerson(editPerson, this.token).subscribe({
      next: () => {
        this.snackBar.open('Paciente actualziado.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open("Error al actualizar al paciente. Consulte al Administrador.", 'Cerrar', { duration: 3000 });
      }
    });
  }

}
