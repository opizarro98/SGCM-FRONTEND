import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {PersonService} from 'src/externalService/service/person/PersonService';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Person} from 'src/externalService/model/person/Person';
import { CommonModule, formatDate } from '@angular/common';
import { Attentions } from 'src/externalService/model/attentions/attentions';
import { AttentionsService } from 'src/externalService/service/attentions/attentionsService';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/externalService/service/category/CategoryService';
import { Category } from 'src/externalService/model/category/Category';
import { MatSelectModule } from '@angular/material/select';

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
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtencionPacienteDialog {
   personForm: FormGroup;
   historyId: number | null = null;
   categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private attentionsService:  AttentionsService,
    private dialogRef: MatDialogRef<AtencionPacienteDialog>,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { identification: string, reason:  string}
  ) {
    this.personForm = this.fb.group({
      cedula: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      fechaNacimiento: [{ value: '', disabled: true }, Validators.required],
      ocupacion: [{ value: '', disabled: true }, Validators.required],
      motivoConsulta: [this.data.reason, Validators.required],
      estadoActual: ['', Validators.required],
      tareasInterseccion: ['', Validators.required]
    });

    this.buscarPersona();
  }

    ngOnInit(): void {
    console.log('cargo las categorias');
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data); // Asegúrate de que los datos se impriman aquí
      },
      error: (err) => {
        console.error('Error al recuperar categorías:', err);
        this.snackBar.open('No se pudo cargar la lista de categorías.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  buscarPersona() {
    this.personService.getPersonByIdentification(this.data.identification).subscribe({
      next: (person: any) => {
        this.personForm.patchValue({
          cedula: person.identification,
          nombre: person.firstName,
          apellido: person.lastName,
          fechaNacimiento: person.birthDate,
          ocupacion: person.occupancy
        });
         this.historyId = person.history?.id || null;
      },
      error: () => {
        console.error('Error al buscar la persona');
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.valid && this.historyId !== null) {
      // Construir el objeto de tipo Attentions
      const attention: Attentions = {
        reason: this.personForm.get('motivoConsulta')?.value,
        currentStatus: this.personForm.get('estadoActual')?.value,
        intersessionTask: this.personForm.get('tareasInterseccion')?.value,
        history: { id: this.historyId } 
      };

      // Obtener el token desde el almacenamiento local o un servicio
      const token = localStorage.getItem('token') || '';

      // Llamar al servicio para crear la atención
      this.attentionsService.createAttention(attention, token).subscribe({
        next: (response) => {
          this.snackBar.open('Atención registrada correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al registrar la atención:', error);
          this.snackBar.open('Error al registrar la atención', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }
}
