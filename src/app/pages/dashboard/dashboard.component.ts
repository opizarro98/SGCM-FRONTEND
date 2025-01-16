import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { AppointmentListDTO } from 'src/externalService/model/appointment/AppintmentListDTO';
import { PersonListDTO } from 'src/externalService/model/person/PersonListDTO';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { PersonService } from 'src/externalService/service/person/PersonService';

interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent {
  personColumns: string[] = ['avatar', 'identification', 'fullName', 'birth_date', 'occupancy'];
  datapersons = new MatTableDataSource<PersonListDTO>();
  appointments: AppointmentListDTO[] = [];

  token: string | null = null;

  avatars: string[] = [
    'assets/images/profile/user-1.jpg',
    'assets/images/profile/user-2.jpg',
    'assets/images/profile/user-3.jpg',
    'assets/images/profile/user-4.jpg'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private personService: PersonService,
    private appointmentsService: AppointmentService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngAfterViewInit() {
    this.datapersons.paginator = this.paginator;
    this.loadAllPersons();
    this.loadAppointments();
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
      const today = new Date().toISOString().split('T')[0];
      this.appointments = data;
      console.log('DATA ES: ' + this.appointments)
      console.log(today + 'asdasdadsda LA FECHA ES ')
    });
  }

}
