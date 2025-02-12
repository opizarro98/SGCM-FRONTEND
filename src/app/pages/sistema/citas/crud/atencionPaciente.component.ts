import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PersonService } from 'src/externalService/service/person/PersonService';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/externalService/model/person/Person';
import { CommonModule } from '@angular/common';
import { Attentions } from 'src/externalService/model/attentions/attentions';
import { AttentionsService } from 'src/externalService/service/attentions/attentionsService';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/externalService/service/category/CategoryService';
import { Category } from 'src/externalService/model/category/Category';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentService } from 'src/externalService/service/appointment/AppointmentService';
import { AntecedentsService } from 'src/externalService/service/antecedets/antecedentService';
import { Antecedent } from 'src/externalService/model/antecedents/Antecedent';
import { DiagnosisPersonService } from 'src/externalService/service/diagnosisPerson/DiagnosisPersonService';
import { DiagnosisPerson } from 'src/externalService/model/diagnosisPerson/DiagnosisPerson';
import {DiagnosisPersonsIDDTO} from '../../../../../externalService/model/diagnosisPerson/DiagnosisPersonsIDDTO';
import { DiagnosisService } from 'src/externalService/service/diagnosis/DiagnosisService';
import { map, switchMap } from 'rxjs';

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
  diagnosis: string = ''; // Diagnóstico actual
  antecedentes: string = ''; // Antecedentes actuales
  updateAntecedent: Antecedent | null = null;
  updateDiagnosis: DiagnosisPersonsIDDTO | null = null;
  token: string | null = null;
  tieneantecedentes: boolean = false;
  tieneDiagnostico: boolean = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private attentionsService: AttentionsService,
    private dialogRef: MatDialogRef<AtencionPacienteDialog>,
    private snackBar: MatSnackBar,
    private appontmentService: AppointmentService,
    private antecedentService: AntecedentsService,
    private diagnosisPersonService: DiagnosisPersonService,
    private categoryService: CategoryService,
    private diagnosisService: DiagnosisService,
    private antecedentsService: AntecedentsService,
    @Inject(MAT_DIALOG_DATA) public data: { identification: string, reason: string, id: string }
  ) {
    this.token = localStorage.getItem('token');
    this.personForm = this.fb.group({
      cedula: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      fechaNacimiento: [{ value: '', disabled: true }],
      ocupacion: [{ value: '', disabled: true }],
      antecedentes: ['', Validators.required],
      categoria: ['', Validators.required], // Control para categoría
      diagnosis: ['', Validators.required], // Control para diagnóstico
      motivoConsulta: [this.data.reason, Validators.required], // Campos editables
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


  /* ************************************************************
  // *                                                          *
  // *                    BUSCAR PACIENTE                       *
  // *                                                          *
  // ************************************************************/
  buscarPersona() {
    const token = this.token || '';
    this.personService.getPersonByIdentification(this.data.identification).subscribe({
      next: (person: any) => {
        // Setear información básica de la persona
        this.personForm.patchValue({
          cedula: person.identification,
          nombre: person.firstName,
          apellido: person.lastName,
          fechaNacimiento: person.birthDate,
          ocupacion: person.occupancy
        });

        // Obtener antecedentes
        this.antecedentsService.getAntecedentsByPersonId(person.id, token).subscribe({
          next: (response) => {
            if (response && response.description?.trim() !== '') {
              this.tieneantecedentes = true;
              this.personForm.patchValue({ antecedentes: response.description });
            } else {
              this.tieneantecedentes = false;
              this.personForm.patchValue({ antecedentes: '' });
            }
          },
          error: (error) => {
            console.error('No se encontraron antecedentes de la persona:', error);
            this.tieneantecedentes = false;
            this.personForm.patchValue({ antecedentes: '' });
          }
        });

        // Obtener diagnósticos
        this.diagnosisPersonService.getDiagnosisByPersonIdComplete(person.id, token).subscribe({
          next: (diagnosisResponse) => {
            if (diagnosisResponse && diagnosisResponse.diagnosisPerson?.id) {
              const diagnosisCIE = diagnosisResponse.diagnosisPerson.diagnosisCIE;
              const categoryId = parseInt(diagnosisResponse.idCategory, 10);

              this.tieneDiagnostico = true;

              // Primero seleccionamos la categoría
              this.personForm.get('categoria')?.setValue(categoryId);

              // Luego esperamos a que los diagnósticos de la categoría se carguen antes de setear el diagnóstico
              this.onCategoryChange(categoryId);

              // Usamos un pequeño retraso para asegurar que los diagnósticos estén cargados antes de setear
              setTimeout(() => {
                this.personForm.get('diagnosis')?.setValue(diagnosisCIE.id);
              }, 300);  // Ajusta el tiempo si es necesario según la velocidad de carga
            } else {
              this.tieneDiagnostico = false;
              this.personForm.get('diagnosis')?.setValue('');
            }
          },
          error: (error) => {
            console.error('No se encontraron diagnósticos de la persona:', error);
            this.tieneDiagnostico = false;
            this.personForm.get('diagnosis')?.setValue('');
          }
        });

        this.historyId = person.history?.id || null;
      },
      error: () => {
        console.error('Error al buscar la persona');
      }
    });
  }



  onSubmit(): void {
    if (this.personForm.invalid || this.historyId === null) {
      this.showSnackbar('Complete todos los campos requeridos');
      return;
    }

    const token = localStorage.getItem('token') || '';

    const attention: Attentions = {
      reason: this.personForm.get('motivoConsulta')?.value,
      currentStatus: this.personForm.get('estadoActual')?.value,
      intersessionTask: this.personForm.get('tareasInterseccion')?.value,
      history: { id: this.historyId }
    };

    // Marcar la cita como atendida
    this.appontmentService.attendedAppointment(this.data.id, token).subscribe({
      next: () => this.handlePersonData(token),
      error: () => this.showSnackbar('Error al registrar la atención')
    });

    // Crear la atención
    this.attentionsService.createAttention(attention, token).subscribe({
      next: () => {
        this.showSnackbar('Atención registrada correctamente');
        this.dialogRef.close(true);
      },
      error: () => this.showSnackbar('Error al registrar la atención')
    });
  }

  private handlePersonData(token: string): void {
    this.personService.getPersonByIdentification(this.data.identification).subscribe({
      next: (person: Person) => {
        this.processAntecedents(person, token);
        this.processDiagnosis(person, token);
      },
      error: () => this.showSnackbar('Error al obtener la persona')
    });
  }

  private processAntecedents(person: Person, token: string): void {
    if (!this.tieneantecedentes) {
      const antecedent: Antecedent = {
        id: '',
        description: this.personForm.get('antecedentes')?.value,
        person: person
      };
      this.antecedentService.createAntecents(antecedent, token).subscribe({
        next: () => this.showSnackbar('Antecedente registrado con éxito'),
        error: () => this.showSnackbar('Error al registrar el antecedente')
      });
    } else {
      this.antecedentsService.getAntecedentsByPersonId(person.id, token).subscribe({
        next: (antecedent) => {
          antecedent.description = this.personForm.get('antecedentes')?.value;
          this.antecedentService.updateAntecedent(antecedent, token).subscribe({
            next: () => this.showSnackbar('Antecedente actualizado con éxito'),
            error: () => this.showSnackbar('Error al actualizar el antecedente')
          });
        },
        error: () => this.showSnackbar('Error al obtener antecedentes')
      });
    }
  }

  private processDiagnosis(person: Person, token: string): void {
    const diagnosisId = this.personForm.get('diagnosis')?.value;

    if (!this.tieneDiagnostico) {
      if (!diagnosisId) {
        this.showSnackbar('Por favor, selecciona un diagnóstico antes de continuar.');
        return;
      }

      // Buscar el diagnóstico antes de crear la relación
      this.diagnosisService.getDiagnosisByID(diagnosisId).pipe(
        map((diagnosisData) => {
          const diagnosisperson: DiagnosisPerson = {
            diagnosisCIE: diagnosisData,  // Asignar el diagnóstico encontrado
            person: person
          };

          return diagnosisperson;
        }),
        switchMap((diagnosisperson) => {
          return this.diagnosisPersonService.createDiagnosisPerson(diagnosisperson, token);
        })
      ).subscribe({
        next: () => this.showSnackbar('Diagnóstico registrado con éxito'),
        error: (error) => {
          console.error('Error al registrar el diagnóstico:', error);
          this.showSnackbar('Error al registrar el diagnóstico');
        }
      });

    } else {
      // Proceso para actualizar el diagnóstico existente
      this.diagnosisPersonService.getDiagnosisByPersonIdComplete(person.id, token).pipe(
        switchMap((diagnosis) => {
          if (!diagnosisId) {
            this.showSnackbar('Por favor, selecciona un diagnóstico antes de continuar.');
            throw new Error('No se seleccionó diagnóstico');
          }

          return this.diagnosisService.getDiagnosisByID(diagnosisId).pipe(
            map((diagnosisData) => {
              diagnosis.diagnosisPerson.diagnosisCIE = diagnosisData;
              return diagnosis;
            })
          );
        }),
        switchMap((updatedDiagnosis) => {
          return this.diagnosisPersonService.updateDiagnosis(updatedDiagnosis, token);
        })
      ).subscribe({
        next: () => this.showSnackbar('Diagnóstico actualizado con éxito'),
        error: (error) => {
          console.error('Error durante la actualización:', error);
          this.showSnackbar('Error al actualizar el diagnóstico');
        }
      });
    }
  }


  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

}
