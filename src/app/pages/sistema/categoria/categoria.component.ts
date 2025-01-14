import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Component, ViewChild } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { NuevaCategoriaDialog } from './crud/nuevaCategoria.component';
import { Category } from 'src/externalService/model/category/Category';
import { CategoryService } from 'src/externalService/service/category/CategoryService';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent {
  displayedColumns: string[] = ['id', 'code', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  // Mapeo para los filtros de cada columna
  columnFilters: { [key: string]: string } = {};
  token: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.token = localStorage.getItem('token');
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getCategory().subscribe((category) => {
      this.dataSource.data = category;
    });
  }

  // Filtro general de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para editar una persona
  editcategory(categoryId: string) {
  }

  // Método para eliminar una persona
  deletecategory(category: Category) {
    
  }

  // Metodo para abrir el dialog
  openDialog() {
    const dialogRef = this.dialog.open(NuevaCategoriaDialog);
    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAllCategories();
      }
    });
  }

  //Metodo para buscar una persona
  buscarCategoria(identification: string): Observable<Category> {
  if (!this.token) {
    this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
    return throwError('Token no encontrado');
  }

  return this.categoryService.getCategoryByCode(identification).pipe(
    tap((category:Category) => {
      this.snackBar.open('El paciente ya se encuentra registrado', 'Cerrar', { duration: 3000 });
    })
  );
}
}
