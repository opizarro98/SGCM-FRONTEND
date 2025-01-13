import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { CategoryService } from 'src/externalService/service/category/CategoryService';
import { Category } from 'src/externalService/model/category/Category';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'nuevodiagnostico',
  templateUrl: 'nuevodiagnostico.html',
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
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevoDiagnosticoDialog { 
  diagnosisForm: FormGroup;
  isFormEnabled: boolean = false;
  isDiagnosisRegistered: boolean = false;
  token: string | null = null;// Reemplaza con el token correcto
  founddiagnosis: Diagnosis | null = null;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private diagnosisService: DiagnosisService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NuevoDiagnosticoDialog>,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef //

  ) {
    this.token = localStorage.getItem('token');
    this.diagnosisForm = this.fb.group({
      id: new FormControl(''),
      codigo: new FormControl(''),
      nombre: new FormControl(''),
    });

    this.diagnosisForm = this.fb.group({
      id: [''],
      codigo: [{ value: '', disabled: false }, Validators.required],
      nombre: [{ value: '', disabled: false }, Validators.required],
      categoria: [null],
    });

  }

  ngOnInit(): void {
    console.log('cargo las categorias');
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data); // Asegúrate de que los datos se impriman aquí
        this.cdr.detectChanges(); // Forzar la actualización de la vista
      },
      error: (err) => {
        console.error('Error al recuperar categorías:', err);
        this.snackBar.open('No se pudo cargar la lista de categorías.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  buscarDiagnosis() {
    const codigo = this.diagnosisForm.get('codigo')?.value;
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.diagnosisService.getDiagnosisByCode(codigo).subscribe({
      next: (diagnosis: Diagnosis) => {
        this.snackBar.open('El diagnostico ya se encuentra registrado', 'Cerrar', { duration: 3000 });
        // Usuario encontrado, llenamos el formulario
        this.founddiagnosis = diagnosis;
        this.isDiagnosisRegistered = true;
        this.diagnosisForm.patchValue({
          codigo: diagnosis.code,
          nombre: diagnosis.name,
        });
        this.diagnosisForm.disable();

      },
      error: (error) => {
        this.isDiagnosisRegistered = false;
        this.snackBar.open(error, 'Cerrar', { duration: 3000 });
        this.isFormEnabled = true;
        this.diagnosisForm.enable();
        this.snackBar.open('diagnostico no registrado', 'Cerrar', { duration: 3000 });
        this.founddiagnosis = null;
      }
    });
  }

  onSubmit(): void {
    if (this.diagnosisForm.invalid) {
      this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', { duration: 3000 });
      return;
    }

    const newDiagnosis: Diagnosis = {
      id: '', // Puedes generar un ID si es necesario, o dejar que el backend lo asigne
      code: this.diagnosisForm.get('codigo')?.value,
      name: this.diagnosisForm.get('nombre')?.value,
      category: {
        id: this.diagnosisForm.get('categoria')?.value,
        name: this.categories.find(category => category.id === this.diagnosisForm.get('categoria')?.value)?.name || '',
      },
    };

    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.diagnosisService.createNewDiagnosis(newDiagnosis, this.token).subscribe({
      next: (response) => {
        this.snackBar.open('Diagnóstico registrado con éxito.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al registrar el diagnóstico:', error);
        this.snackBar.open('Error al registrar el diagnóstico.', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
