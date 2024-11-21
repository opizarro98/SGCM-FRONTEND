import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {AppointmentService} from 'src/externalService/service/appointment/AppointmentService';
import {PersonService} from 'src/externalService/service/person/PersonService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person} from 'src/externalService/model/person/Person';
import {formatDate} from '@angular/common';
import {Appointment} from 'src/externalService/model/appointment/Appointment';

@Component({
  selector: 'nuevacita',
  templateUrl: 'nuevacita.html',
  standalone: true,
  imports: [ MatDialogModule, 
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
export class NuevaCitaDialog { 
  citaForm: FormGroup;
  isFormEnabled : boolean = false;
  isUserRegistered: boolean = false;
  token: string | null = null;// Reemplaza con el token correcto
  foundPerson: Person | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar, // Para mostrar notificaciones 
    private appointmentService:  AppointmentService,
    private dialogRef: MatDialogRef<NuevaCitaDialog>,
    
  ) {
    this.token = localStorage.getItem('token');
    this.citaForm = this.fb.group({
      cedula: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      ocupacion: new FormControl(''),
      fecha: new FormControl(''),
      hora: new FormControl(''),
      motivoConsulta: new FormControl(''),
    });
    
    this.citaForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      fechaNacimiento: [{ value: '', disabled: true }, Validators.required],
      ocupacion: [{ value: '', disabled: true }, Validators.required],
      fecha: [{ value: '' }, Validators.required],
      hora: [{ value: ''}, Validators.required],
      motivoConsulta: [{ value: ''}, Validators.required],
    });

    
  }

  buscarPersona() {
    const cedula = this.citaForm.get('cedula')?.value;
      if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }
    
    this.personService.getPersonByIdentification(cedula).subscribe({
      next: (person: Person) => {
        // Usuario encontrado, llenamos el formulario
        this.foundPerson = person;
        this.isUserRegistered = true;
        this.citaForm.patchValue({
          nombre: person.first_name,
          apellido: person.last_name,
          fechaNacimiento: person.birth_date,
          ocupacion: person.occupancy,
          fecha: new Date(),
          motivoConsulta: ''
        });
        
      },
      error: (error) => {
         this.isUserRegistered = false;
          this.snackBar.open(error, 'Cerrar', { duration: 3000 });
          this.isFormEnabled =true;
          this.citaForm.enable();
          this.snackBar.open('Usuario no registrado', 'Cerrar', { duration: 3000 });
          this.foundPerson = null;
        // if (error === 'Error interno del servidor') {
        //   // Usuario no registrado, habilitamos el formulario
        //  // Habilita el formulario para llenar los datos
        // } else {
          
        // }
      }
    });
  }

  onSubmit() {
  if (!this.token) {
    this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
    return;
  }

  if (!this.isUserRegistered) {
    const newPerson: Person = {
      id: '',
      identification: this.citaForm.get('cedula')?.value,
      first_name: this.citaForm.get('nombre')?.value,
      last_name: this.citaForm.get('apellido')?.value,
      birth_date: formatDate(this.citaForm.get('fechaNacimiento')?.value, 'yyyy-MM-dd', "en-US"),
      occupancy: this.citaForm.get('ocupacion')?.value
    };
    this.personService.createPerson(newPerson, this.token).subscribe({
      next: () => {
        this.personService.getPersonByIdentification(newPerson.identification).subscribe({
          next: (person) => {
            this.foundPerson = person;
            this.registrarCita(person);
          },
          error: () => {
            this.snackBar.open('Error al buscar la persona recién creada.', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open("Error al registrar la persona. Consulte al Administrador.", 'Cerrar', { duration: 3000 });
      }
    });
    } else {
      if (!this.foundPerson) {
        this.snackBar.open('Error: no se ha encontrado una persona registrada para esta cita.', 'Cerrar', { duration: 3000 });
        return;
      }
      this.registrarCita(this.foundPerson);
      this.snackBar.open('Se ha agendado correctamente la cita', 'Cerrar', { duration: 3000 });
    }
  }

  registrarCita(person: Person) {
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const newAppointment: Appointment = {
      date: this.citaForm.get('fecha')?.value,
      hour: this.citaForm.get('hora')?.value,
      description: this.citaForm.get('motivoConsulta')?.value,
      person: person,
    };

    this.appointmentService.createAppointment(newAppointment, this.token).subscribe({
      next: () => {
        this.snackBar.open('Cita registrada exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Cierra el diálogo y actualiza la tabla en el componente principal
      },
      error: () => this.snackBar.open('Error al registrar la cita', 'Cerrar', { duration: 3000 })
    });
  }

}
