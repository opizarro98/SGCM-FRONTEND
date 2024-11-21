import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { Category } from 'src/externalService/model/category/Category';
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
    MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevoDiagnosticoDialog { 
  diagnosisForm: FormGroup;
  isFormEnabled: boolean = false;
  isDiagnosisRegistered: boolean = false;
  token: string | null = null;// Reemplaza con el token correcto
  founddiagnosis: Diagnosis | null = null;

  constructor(
    private fb: FormBuilder,
    private diagnosisService: DiagnosisService,
    private snackBar: MatSnackBar, // Para mostrar notificaciones 
    private dialogRef: MatDialogRef<NuevoDiagnosticoDialog>,

  ) {
    this.token = localStorage.getItem('token');
    this.diagnosisForm = this.fb.group({
      id: new FormControl(''),
      codigo: new FormControl(''),
      nombre: new FormControl(''),
    });

    this.diagnosisForm = this.fb.group({
      id: ['', Validators.required],
      codigo: [{ value: '', disabled: false }, Validators.required],
      nombre: [{ value: '', disabled: false }, Validators.required],
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


  onSubmit() {
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }
    const newCategory: Category = {
      id: '',
      code: this.diagnosisForm.get('codigo')?.value,
      name: this.diagnosisForm.get('nombre')?.value
    };
    const newDiagnosis: Diagnosis = {
      id: '',
      code: this.diagnosisForm.get('codigo')?.value,
      name: this.diagnosisForm.get('nombre')?.value,
      category: newCategory
    };
    this.diagnosisService.createNewDiagnosis(newDiagnosis, this.token).subscribe({
      next: () => {
        this.snackBar.open('Dagnostico creado con exito.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open("Error al registrar el paciente. Consulte al Administrador.", 'Cerrar', { duration: 3000 });
      }
    });
  }

}
