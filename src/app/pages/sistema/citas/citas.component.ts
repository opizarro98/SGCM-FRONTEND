import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppointmentService } from 'src/externalService/service/citasMedicas/AppointmentService';
import { Appointment } from 'src/externalService/model/Appointment';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'hour', 'description'];
  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialog: any;

  constructor(private appointmentsService: AppointmentService) {}

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
    citaForm = new FormGroup({
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    ocupacion: new FormControl(''),
    fecha: new FormControl(''),
    hora: new FormControl(''),
    motivo: new FormControl('')
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.citaForm.value);
  }

  buscarPersona(){

  }
}

