import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {PersonService} from 'src/externalService/service/person/PersonService';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person} from 'src/externalService/model/person/Person';
import { formatDate } from '@angular/common';

@Component({
  selector: 'atencionPaciente',
  templateUrl: 'atencionPaciente.html',
  standalone: true,
  imports: [MatDialogModule,
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
export class AtencionPacienteDialog {
  atencionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AtencionPacienteDialog>
  ) {
    this.atencionForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      ocupacion: ['', Validators.required],
      razonConsulta: ['', Validators.required],
      estadoActual: ['', Validators.required],
      tareasInterseccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.atencionForm.valid) {
      // Lógica para manejar el envío de datos
      console.log('Formulario enviado', this.atencionForm.value);
      this.snackBar.open('Atención registrada con éxito', 'Cerrar', { duration: 3000 });
      this.dialogRef.close(this.atencionForm.value);
    } else {
      this.snackBar.open('Complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }
}