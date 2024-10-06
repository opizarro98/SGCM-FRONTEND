import {Component, inject, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {NuevaCitaDialog} from '../citas/citas.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
})
export class DiagnosticoComponent {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource<elementos>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(NuevaCitaDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

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
    citaForm = new FormGroup({
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    ocupacion: new FormControl(''),
    fecha: new FormControl(''),
    hora: new FormControl(''),
    motivo: new FormControl('')
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.citaForm.value);
  }

  buscarPersona(){

  }
}


export interface elementos {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: elementos[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079},
  { position: 2, name: 'Helium', weight: 4.0026},
  { position: 3, name: 'Lithium', weight: 6.941},
  { position: 4, name: 'Beryllium', weight: 9.0122 },
  { position: 5, name: 'Boron', weight: 10.811},
  { position: 6, name: 'Carbon', weight: 12.0107},
  { position: 7, name: 'Nitrogen', weight: 14.0067},
  { position: 8, name: 'Oxygen', weight: 15.9994},
  { position: 9, name: 'Fluorine', weight: 18.9984},
];