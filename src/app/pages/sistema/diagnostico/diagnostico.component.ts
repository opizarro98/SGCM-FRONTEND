import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError, tap } from 'rxjs';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { NuevoDiagnosticoDialog } from './crud/nuevoDiagnosticoDialog.component';
import { EditarDiagnosisDialog } from './crud/editarDiagnosticoDialog.component';
import { DiagnosisDTO } from 'src/externalService/model/diagnosis/DiagnosisDTO';
import { Category } from 'src/externalService/model/category/Category';
import { CategoryService } from 'src/externalService/service/category/CategoryService';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
})
export class DiagnosticoComponent {
  displayedColumns: string[] = ['code', 'name', 'category', 'actions'];
  dataSource = new MatTableDataSource<DiagnosisDTO>();

  categories: Category[] = []; // Lista de categorías
  selectedCategoryId: string = ''; // ID de categoría seleccionada para filtrar

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private diagnosisService: DiagnosisService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllData();
  }

  // Carga diagnósticos y categorías
  loadAllData() {
    this.loadAllDiagnosis();
    this.loadCategories();
  }

  // Cargar diagnósticos
  loadAllDiagnosis() {
    this.diagnosisService.getDiagnosis().subscribe((diagnosis: Diagnosis[]) => {
      this.dataSource.data = diagnosis.map((diag: Diagnosis) => ({
        id: diag.id, // Mapea `id` tal cual
        code: diag.code, // Mapea `code` tal cual
        name: diag.name, // Mapea `name` tal cual
        category: diag.category?.name || 'Sin categoría', // Convierte el objeto `category` a un string
      }));
    });
  }

  // Cargar categorías
  loadCategories() {
    this.categoryService.getCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Filtro general de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Filtro por categoría
  applyCategoryFilter() {
    if (this.selectedCategoryId) {
      this.dataSource.data = this.dataSource.data.filter(
        (diagnosis) => diagnosis.category === this.selectedCategoryId
      );
    } else {
      this.loadAllDiagnosis(); // Recarga todos los diagnósticos
    }
  }

  // Método para editar un diagnóstico
  editDiagnosis(diagnosisCode: string) {
    const dialogRef = this.dialog.open(EditarDiagnosisDialog, {
      data: { identification: diagnosisCode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAllDiagnosis();
        console.log('Diagnóstico actualizado');
      }
    });
  }

  // Método para eliminar un diagnóstico
  deleteDiagnosis(diagnosis: Diagnosis) {
    // Implementa lógica de eliminación aquí
  }

  // Método para abrir el diálogo de nuevo diagnóstico
  openDialog() {
    const dialogRef = this.dialog.open(NuevoDiagnosticoDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAllDiagnosis();
      }
    });
  }

  // Método para buscar un diagnóstico por código
  searchDiagnosisByCode(code: string): Observable<Diagnosis> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open(
        'Error: token no encontrado. Por favor, inicie sesión nuevamente.',
        'Cerrar',
        { duration: 3000 }
      );
      return throwError('Token no encontrado');
    }

    return this.diagnosisService.getDiagnosisByCode(code).pipe(
      tap((diagnosisFind: Diagnosis) => {
        this.snackBar.open(
          'El diagnóstico ya se encuentra registrado',
          'Cerrar',
          { duration: 3000 }
        );
      })
    );
  }
}
