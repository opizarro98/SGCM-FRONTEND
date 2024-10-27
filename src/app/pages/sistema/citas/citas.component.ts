import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { Appointment } from 'src/externalService/model/appointment/Appointment';
import { PersonService } from 'src/externalService/service/person/PersonService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/externalService/model/person/Person';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'hour', 'description'];
  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appointmentsService: AppointmentService,private dialog:MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getAppointments().subscribe((appointments) => {
      this.dataSource.data = appointments;
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(NuevaCitaDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      console.log(`Dialog result: ${result}`);
    });
  }

    
}

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

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar, // Para mostrar notificaciones 
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
      fecha: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      motivoConsulta: [{ value: '', disabled: true }, Validators.required],
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
        this.isUserRegistered = true;
        this.citaForm.patchValue({
          nombre: person.first_name,
          apellido: person.last_name,
          fechaNacimiento: person.birth_date,
          ocupacion: person.occupancy
        });
      },
      error: (error) => {
         this.isUserRegistered = false;
          this.snackBar.open(error, 'Cerrar', { duration: 3000 });
          this.isFormEnabled =true;
          this.citaForm.enable();
          this.snackBar.open('Usuario no registrado', 'Cerrar', { duration: 3000 });
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
      // Creación de nueva persona
      const newPerson: Person = {
        identification: this.citaForm.get('cedula')?.value,
        first_name: this.citaForm.get('nombre')?.value,
        last_name: this.citaForm.get('apellido')?.value,
        birth_date:formatDate(this.citaForm.get('fechaNacimiento')?.value,'yyyy-MM-dd', "en-US"),
        occupancy: this.citaForm.get('ocupacion')?.value
      };

      this.personService.createPerson(newPerson, this.token).subscribe({
        next: (response) => {
          this.snackBar.open('Persona registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.registrarCita(); // Llama a la función para registrar la cita
        },
        error: (error) => {
          this.snackBar.open("Error, al registrar la persona, consulte al Administrador", 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      // Si el usuario ya existe, registramos la cita directamente
      this.registrarCita();
    }
  }

  registrarCita() {
    const cita = {
      fecha: this.citaForm.get('fecha')?.value,
      hora: this.citaForm.get('hora')?.value,
      motivo: this.citaForm.get('motivo')?.value,
      cedula: this.citaForm.get('cedula')?.value // Aquí enlazamos la cita con la persona
    };

    // Aquí deberías llamar al servicio que registre la cita
    // Ejemplo:
    // this.citaService.createCita(cita).subscribe({
    //   next: () => this.snackBar.open('Cita registrada exitosamente', 'Cerrar', { duration: 3000 }),
    //   error: () => this.snackBar.open('Error al registrar la cita', 'Cerrar', { duration: 3000 })
    // });
  }
}

