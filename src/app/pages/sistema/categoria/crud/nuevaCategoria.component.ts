import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CategoryCreate } from 'src/externalService/model/category/CategoryCreate';
import { CategoryService } from 'src/externalService/service/category/CategoryService';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'nuevaCategoria',
  templateUrl: 'nuevaCategoria.html',
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
export class NuevaCategoriaDialog {
    categoryForm: FormGroup;
    token: string | null = null;

    constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar, // Para mostrar notificaciones 
    private dialogRef: MatDialogRef<NuevaCategoriaDialog>,

  ) {
    this.token = localStorage.getItem('token');

    this.categoryForm = this.fb.group({
      codigo: new FormControl(''),
      nombre: new FormControl(''),
    });

    this.categoryForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
    });


  }
  
  onSubmit() {
    console.log('Formulario enviado');
    if (!this.token) {
      this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const newCategory: CategoryCreate = {
      id: '',
      code: this.categoryForm.get('codigo')?.value,
      name: this.categoryForm.get('nombre')?.value,
    };

    console.log('Datos a enviar:', newCategory);

    this.categoryService.createNewCategory(newCategory, this.token).pipe(
      switchMap((response) => {
        console.log('Respuesta de la API al crear categoría:', response);
        this.snackBar.open('Categoria creada con éxito.', 'Cerrar', { duration: 3000 });
        return this.categoryService.getCategoryByCode(newCategory.code);
      }),
      catchError((error) => {
        const errorMessage = error?.error?.message || 'Error desconocido.';
        console.error('Error al crear la categoría:', error);
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        return of(null);
      })
    ).subscribe((data) => {
      console.log('Datos obtenidos tras crear la categoría:', data);
      this.dialogRef.close(true);
    });
  }
}