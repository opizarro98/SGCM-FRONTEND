import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { Category } from 'src/externalService/model/category/Category';
import { CategoryService } from 'src/externalService/service/category/CategoryService';
import { NuevoDiagnosticoDialog } from './crud/nuevoDiagnosticoDialog.component';
import { MatDialog } from '@angular/material/dialog';
import {PersonListDTO} from '../../../../externalService/model/person/PersonListDTO';
import {MatPaginator} from '@angular/material/paginator';
import {PersonService} from 'src/externalService/service/person/PersonService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
})
export class DiagnosticoComponent {
  displayedColumnsCategories: string[] = ['id', 'name'];
  displayedColumnsDiagnoses: string[] = ['id', 'code', 'name'];

  dataSourceCategories = new MatTableDataSource<Category>();
  dataSourceDiagnoses = new MatTableDataSource<Diagnosis>();

  selectedCategory: Category | null = null;
  selectedDiagnosisList: Diagnosis[] = [];

  selectedCategoryId: number | null = null; 

  @ViewChild(MatPaginator) paginatorCategories!: MatPaginator;
  @ViewChild(MatPaginator) paginatorDiagnoses!: MatPaginator;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
     if (this.selectedCategory) {
      this.selectedCategoryId = this.selectedCategory.id;
    }
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe((categories) => {
      this.dataSourceCategories.data = categories;
      if (categories.length > 0) {
        this.selectedCategoryId = categories[0].id; // Selecciona el primer ID como predeterminado
        this.onCategoryChange(this.selectedCategoryId); // Carga los diagnósticos iniciales
      }
    });
  }

  onCategoryChange(categoryId: number): void {
    const selectedCategory = this.dataSourceCategories.data.find(
      (category) => category.id === categoryId
    );
    this.selectedCategory = selectedCategory || null;
    this.selectedCategoryId = categoryId;

    if (this.selectedCategory && this.selectedCategory.diagnoses) {
      this.selectedDiagnosisList = this.selectedCategory.diagnoses;
    } else {
      this.selectedDiagnosisList = [];
    }

    // Actualiza el dataSource de la tabla
    this.dataSourceDiagnoses.data = this.selectedDiagnosisList;
  }

  ngAfterViewInit(): void {
  this.dataSourceCategories.paginator = this.paginatorCategories;
  this.dataSourceDiagnoses.paginator = this.paginatorDiagnoses;
}
}
