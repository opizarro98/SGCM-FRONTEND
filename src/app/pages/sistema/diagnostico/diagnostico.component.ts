import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, tap, throwError} from 'rxjs';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { NuevoDiagnosticoDialog } from './crud/nuevoDiagnosticoDialog.component';
import { EditarPersonaDialog } from '../persona/crud/editarPersonaDialog.component';
import {EditarDiagnosisDialog} from './crud/editarDiagnosticoDialog.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
})
export class DiagnosticoComponent {
  displayedColumns: string[] = ['id', 'code', 'name', 'actions'];
  dataSource = new MatTableDataSource<Diagnosis>();

  // Mapeo para los filtros de cada columna
  columnFilters: { [key: string]: string } = {};
  token: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private diagnosiservice: DiagnosisService, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.token = localStorage.getItem('token');
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllDiagnosis();
  }

  loadAllDiagnosis() {
    this.diagnosiservice.getDiagnosis().subscribe((diagnosis) => {
      this.dataSource.data = diagnosis;
    });
  }

  // Filtro general de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para editar un diagnostico
  editdiagnosis(diagnosisCode: string) {
    const dialogRef = this.dialog.open(EditarDiagnosisDialog, {
      data: { identification: diagnosisCode } // Enviar la cédula
    });

    // Escuchar el resultado del diálogo, si es necesario
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAllDiagnosis();
        console.log("Diagnostico Actualizado");
      }
    });
  }

  // Método para eliminar un diagnostico
  deletediagnosis(diagnosis: Diagnosis) {
    
  }

  // Metodo para abrir el dialog
  openDialog() {
    const dialogRef = this.dialog.open(NuevoDiagnosticoDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAllDiagnosis();
      }
    });
  }

  //Metodo para buscar un diagnostico
  buscardiagnosisa(code: string): Observable<Diagnosis> {
  if (!this.token) {
    this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
    return throwError('Token no encontrado');
  }

  return this.diagnosiservice.getDiagnosisByCode(code).pipe(
    tap((diagnosisFind: Diagnosis) => {
      this.snackBar.open('El diagnostico ya se encuentra registrado', 'Cerrar', { duration: 3000 });
    })
  );
}
}