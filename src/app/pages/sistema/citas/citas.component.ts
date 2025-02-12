import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { AppointmentListDTO } from 'src/externalService/model/appointment/AppintmentListDTO';
import { NuevaCitaDialog } from './crud/NuevaCitaDialog.component';
import {Person} from 'src/externalService/model/person/Person';
import { AtencionPacienteDialog } from './crud/atencionPaciente.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','identification','patientname', 'date', 'hour','actions'];
  dataSource = new MatTableDataSource<AppointmentListDTO>();
  token: string | null = null;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appointmentsService: AppointmentService,private dialog:MatDialog,private snackBar: MatSnackBar) {
     this.token = localStorage.getItem('token');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getAppointments().subscribe((appointments) => {
      this.dataSource.data = appointments;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para iniciar una atencion
  atenderCita(personIdentification: string, reasonAppointment:  string, idappointment: string) {
    const dialogRef = this.dialog.open(AtencionPacienteDialog, {
      data: { identification: personIdentification, reason:  reasonAppointment, id: idappointment } 
    });

    // Escuchar el resultado del diálogo, si es necesario
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments();
      }
    });
  }

  cancelarCita(id: string) {

    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }
   this.appointmentsService.canceledAppointment(id, this.token).subscribe({
      next: () => {
        this.loadAppointments();
        this.snackBar.open('La cita fue cancalada exitosamente.', 'Cerrar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open("Error al cancelar la cita. Consulte al Administrador.", 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Método para eliminar una persona
  deletePerson(person: Person) {
    
  }



  nuevaCitaDialog() {
    const dialogRef = this.dialog.open(NuevaCitaDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAppointments(); // Actualiza la tabla si se registró la cita correctamente
      }
    });
  }

  
    
}

