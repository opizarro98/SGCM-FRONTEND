import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from 'src/externalService/service/person/PersonService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/externalService/model/person/Person';
import {  Component, ViewChild } from '@angular/core';
import {PersonListDTO} from '../../../../externalService/model/person/PersonListDTO';
import { Observable, tap, throwError } from 'rxjs';
import { NuevaPersonaDialog } from './crud/nuevaPersonaDialog.component';
import {EditarPersonaDialog} from './crud/editarPersonaDialog.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
})
export class PersonaComponent {
  displayedColumns: string[] = ['identification', 'fullName', 'birth_date', 'occupancy', 'actions'];
  dataSource = new MatTableDataSource<PersonListDTO>();

  // Mapeo para los filtros de cada columna
  columnFilters: { [key: string]: string } = {};
  token: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personService: PersonService, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.token = localStorage.getItem('token');
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllPersons();
  }

  loadAllPersons() {
    this.personService.getPersons().subscribe((person) => {
      this.dataSource.data = person;
    });
  }

  // Filtro general de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para editar una persona
  editPerson(personIdentification: string) {
    const dialogRef = this.dialog.open(EditarPersonaDialog, {
      data: { identification: personIdentification } // Enviar la cédula
    });

    // Escuchar el resultado del diálogo, si es necesario
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAllPersons();
        console.log("Persona actualizada");
      }
    });
  }

  // Método para eliminar una persona
  deletePerson(person: Person) {
    
  }

  // Metodo para abrir el dialog
  openDialog() {
    const dialogRef = this.dialog.open(NuevaPersonaDialog);

    dialogRef.afterClosed().subscribe((result: any | null) => {
      if (result) {
        this.loadAllPersons();
      }
    });
  }

  //Metodo para buscar una persona
  buscarPersona(identification: string): Observable<Person> {
  if (!this.token) {
    this.snackBar.open('Error: token no encontrado. Por favor, inicie sesión nuevamente.', 'Cerrar', { duration: 3000 });
    return throwError('Token no encontrado');
  }

  return this.personService.getPersonByIdentification(identification).pipe(
    tap((personFind: Person) => {
      this.snackBar.open('El paciente ya se encuentra registrado', 'Cerrar', { duration: 3000 });
    })
  );
}
}