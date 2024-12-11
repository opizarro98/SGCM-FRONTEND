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
import { ClinicHistorie } from 'src/externalService/model/history/ClinicHistorie';
import { switchMap } from 'rxjs';
import { HistoryService } from 'src/externalService/service/history/HistoryService';

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
    private historyService: HistoryService
    
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
          nombre: person.firstName,
          apellido: person.lastName,
          fechaNacimiento: person.birthDate,
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
      }
    });
  }

  onSubmit() {
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const cedula = this.citaForm.get('cedula')?.value;

    // Si la persona ya está registrada, solo rellenamos los campos del formulario
    if (this.isUserRegistered && this.foundPerson) {
      this.snackBar.open('Persona encontrada. Rellenando datos del formulario...', 'Cerrar', { duration: 3000 });
      this.citaForm.patchValue({
        nombre: this.foundPerson.firstName,
        apellido: this.foundPerson.lastName,
        fechaNacimiento: this.foundPerson.birthDate,
        ocupacion: this.foundPerson.occupancy,
      });

      // Registrar la cita con la persona encontrada
      this.registrarCita(this.foundPerson);
    } else {
      // Si la persona no está registrada, creamos una nueva
      const newPerson: Person = {
        id: '',
        identification: cedula,
        firstName: this.citaForm.get('nombre')?.value,
        lastName: this.citaForm.get('apellido')?.value,
        birthDate: formatDate(this.citaForm.get('fechaNacimiento')?.value, 'yyyy-MM-dd', "en-US"),
        occupancy: this.citaForm.get('ocupacion')?.value
      };

      this.personService.createPerson(newPerson, this.token).pipe(
        switchMap(() => {
          this.snackBar.open('Paciente creado con éxito.', 'Cerrar', { duration: 3000 });
          return this.personService.getPersonByIdentification(newPerson.identification);
        }),
        switchMap((personfind) => {
          if (!this.token) {
            this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
            throw new Error('Token no encontrado');
          }
          const clinicHistory: ClinicHistorie = {
            id: '',
            person: personfind
          };
          return this.historyService.createNewHistory(clinicHistory, this.token);
        })
      ).subscribe({
        next: (personfind) => {
          this.snackBar.open('Historia clínica creada con éxito.', 'Cerrar', { duration: 3000 });

          // Registrar la cita con la persona creada
          this.registrarCita(personfind);

          this.dialogRef.close(true); // Cierra el diálogo tras éxito
        },
        error: (err) => {
          this.snackBar.open('Error al procesar la solicitud: ' + err.message, 'Cerrar', { duration: 3000 });
        }
      });
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
      reason: this.citaForm.get('motivoConsulta')?.value,
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
