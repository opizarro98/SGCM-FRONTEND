import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { AppointmentListDTO } from 'src/externalService/model/appointment/AppintmentListDTO';
import { NuevaCitaDialog } from './crud/NuevaCitaDialog.component';
import {Person} from 'src/externalService/model/person/Person';
import { AtencionPacienteDialog } from './crud/atencionPaciente.component';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = ['identification','patientname', 'date', 'hour','actions'];
  dataSource = new MatTableDataSource<AppointmentListDTO>();

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para iniciar una atencion
  editPerson(personIdentification: string, reasonAppointment:  string) {
    const dialogRef = this.dialog.open(AtencionPacienteDialog, {
      data: { identification: personIdentification, reason:  reasonAppointment } // Enviar la cédula
    });

    // Escuchar el resultado del diálogo, si es necesario
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments
        console.log("Atención guardad con exito");
      }
    });
  }

  // Método para eliminar una persona
  deletePerson(person: Person) {
    
  }



  openDialog() {
    const dialogRef = this.dialog.open(NuevaCitaDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAppointments(); // Actualiza la tabla si se registró la cita correctamente
      }
    });
  }

  
    
}

