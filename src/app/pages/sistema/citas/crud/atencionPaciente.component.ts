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
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { AntecedentsService } from 'src/externalService/service/antecedets/antecedentService';
import { Antecedent } from 'src/externalService/model/antecedents/Antecedent';

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
   diagnoses: any[] = [];
   selectedCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private attentionsService:  AttentionsService,
    private dialogRef: MatDialogRef<AtencionPacienteDialog>,
    private snackBar: MatSnackBar,
    private appontmentService: AppointmentService,
    private antecedentService: AntecedentsService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { identification: string, reason:  string, id: string}
  ) {
   this.personForm = this.fb.group({
      cedula: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      fechaNacimiento: [{ value: '', disabled: true }],
      ocupacion: [{ value: '', disabled: true }],
      antecedentes: ['', Validators.required],
      categoria: ['', Validators.required], // Control para categoría
      diagnosis: ['', Validators.required], // Control para diagnóstico
      motivoConsulta: [this.data.reason,Validators.required], // Campos editables
      estadoActual: ['', Validators.required],
      tareasInterseccion: ['', Validators.required],
    });

    this.buscarPersona();
  }

    ngOnInit(): void {
    // Cargamos las categorías al inicializar el componente
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });

    // Detectar cambios en la categoría seleccionada
    this.personForm.get('categoria')?.valueChanges.subscribe((categoryId) => {
      this.onCategoryChange(categoryId);
    });
  }


    onCategoryChange(categoryId: number): void {
    // Filtrar diagnósticos basados en la categoría seleccionada
    const selectedCategory = this.categories.find(
      (category) => category.id === categoryId
    );
    this.diagnoses = selectedCategory ? selectedCategory.diagnoses : [];

    // Resetear el diagnóstico seleccionado si la categoría cambia
    this.personForm.get('diagnosis')?.setValue('');
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

      this.appontmentService.attendedAppointment(this.data.id, token).subscribe({
        next: (response) => {
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al registrar la atencion', error);
          this.snackBar.open('Error al registrar la atención', 'Cerrar', { duration: 3000 });
        }
      });

      this.personService.getPersonByIdentification(this.data.identification).subscribe({
      next: (person: Person) => {
        const antecedent: Antecedent = {
          id: '',
          description: this.personForm.get('antecedentes')?.value,
          person: person, // Asignar la persona obtenida del servicio
        };

        // Guardar los antecedentes
        this.antecedentService.createAntecents(antecedent, token).subscribe({
          next: (response) => {
            this.snackBar.open('Antecedente registrado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (error: HttpErrorResponse) => {
            this.snackBar.open('Error al registrar el antecedente', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open('Error al obtener la persona', 'Cerrar', { duration: 3000 });
      }
    });

      // Llamar al servicio para crear la atención
      this.attentionsService.createAttention(attention, token).subscribe({
        next: (response) => {
          this.snackBar.open('Atención registrada correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
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
