import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { PersonService } from 'src/externalService/service/person/PersonService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/externalService/model/person/Person';
import { formatDate } from '@angular/common';
import { Appointment } from 'src/externalService/model/appointment/Appointment';
import { AppointmentListDTO } from 'src/externalService/model/appointment/AppintmentListDTO';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
})
export class PersonaComponent {
  displayedColumns: string[] = ['id', 'identification', 'first_name', 'last_name', 'birth_date', 'occupancy'];
  dataSource = new MatTableDataSource<Person>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personService: PersonService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllPersons();
  }

  loadAllPersons() {
    this.personService.getPersons().subscribe((person) => {
      this.dataSource.data = person;
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(NuevaPersonaDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAllPersons();
      }
    });
  }


}

@Component({
  selector: 'nuevaPersona',
  templateUrl: 'nuevaPersona.html',
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
export class NuevaPersonaDialog {
  citaForm: FormGroup;
  isFormEnabled: boolean = false;
  isUserRegistered: boolean = false;
  token: string | null = null;// Reemplaza con el token correcto
  foundPerson: Person | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar, // Para mostrar notificaciones 
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<NuevaPersonaDialog>,

  ) {
    this.token = localStorage.getItem('token');
    this.citaForm = this.fb.group({
      cedula: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      ocupacion: new FormControl('')
    });

    this.citaForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      fechaNacimiento: [{ value: '', disabled: true }, Validators.required],
      ocupacion: [{ value: '', disabled: true }, Validators.required],
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
        this.snackBar.open('El paciente ya se encuentra registrado', 'Cerrar', { duration: 3000 });
        // Usuario encontrado, llenamos el formulario
        this.foundPerson = person;
        this.isUserRegistered = true;
        this.citaForm.patchValue({
          nombre: person.first_name,
          apellido: person.last_name,
          fechaNacimiento: person.birth_date,
          ocupacion: person.occupancy,
        });
        this.citaForm.disable();

      },
      error: (error) => {
        this.isUserRegistered = false;
        this.snackBar.open(error, 'Cerrar', { duration: 3000 });
        this.isFormEnabled = true;
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
        this.snackBar.open('Paciente creado con exito.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open("Error al registrar el paciente. Consulte al Administrador.", 'Cerrar', { duration: 3000 });
      }
    });
  }

}
