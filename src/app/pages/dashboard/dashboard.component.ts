import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentListDTO } from 'src/externalService/model/appointment/AppintmentListDTO';
import { PersonListDTO } from 'src/externalService/model/person/PersonListDTO';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { AttentionsService } from 'src/externalService/service/attentions/attentionsService';
import { PersonService } from 'src/externalService/service/person/PersonService';
import {AtencionPacienteDialog} from '../sistema/citas/crud/atencionPaciente.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent {
  personColumns: string[] = ['avatar', 'identification', 'fullName', 'birth_date', 'occupancy'];
  datapersons = new MatTableDataSource<PersonListDTO>();
  appointments: AppointmentListDTO[] = [];
  currentyear : number = 0;
  allAnnualAttentions : string = '';



  token: string | null = null;

  avatars: string[] = [
    'assets/images/profile/user-1.jpg',
    'assets/images/profile/user-2.jpg',
    'assets/images/profile/user-3.jpg',
    'assets/images/profile/user-4.jpg'
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  snackBar: any;

  constructor(
    private personService: PersonService,
    private appointmentsService: AppointmentService,
    private attentiosService:  AttentionsService,
    private dialog:MatDialog
  ) {
    this.token = localStorage.getItem('token');
  }

  ngAfterViewInit() {
    this.datapersons.paginator = this.paginator;
    this.loadAllPersons();
    this.loadAppointments();
    this.getAnnualAttentions();
  }


  loadAllPersons() {
    this.personService.getPersons().subscribe((persons: PersonListDTO[]) => {

      const lastFivePersons = persons.slice(-5);
      lastFivePersons.forEach((person: PersonListDTO) => {
        person.avatar = this.getRandomAvatar();
      });

      this.datapersons.data = lastFivePersons;
    });
  }

  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[randomIndex];
  }

  loadAppointments(): void {
    this.appointmentsService.getAppointmentsnotAttended().subscribe((data: AppointmentListDTO[]) => {
      this.appointments = data;
    });
  }


  getAnnualAttentions(): void {

    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }
      this.attentiosService.getAnnualAttentions(this.token).subscribe({
    next: (attentionsResponse) => {
      if (attentionsResponse ) {
        this.currentyear = attentionsResponse.year;
        if(attentionsResponse.annualAttentions == 1){
            this.allAnnualAttentions = attentionsResponse.annualAttentions + ' - Atención';
        }else{
            this.allAnnualAttentions = attentionsResponse.annualAttentions + ' - Atenciones';
        }
        
      }
          }
  });
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
        this.getAnnualAttentions()
      }
    });
  }

}
