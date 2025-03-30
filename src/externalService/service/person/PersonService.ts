import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, map, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Person } from 'src/externalService/model/person/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = environment.urlHost + 'personRest/';

  constructor(private http: HttpClient) { }

  // Lista todas las personas
  getPersons(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "searchForAllPersons");
  }


  // Crea una nueva persona
  createPerson(person: Person, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}createNewPerson`, person, { headers }).pipe(
      tap((response) => {
      }),
      catchError(this.handleError)
    );
  }

  // Busca una persona por su identificacion
  getPersonByIdentification(identification: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}searchPersonByIdentification/${identification}`).pipe(
      tap((response) => {
      }),
      catchError(this.handleError)
    );
  }

  // Actualiza una persona
    UpdatePerson(person: Person, token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post<any>(`${this.apiUrl}updatePerson`, person, { headers }).pipe(
        tap((response) => {
        }),
        catchError(this.handleError)
      );
    }


  getPersonByName(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}buscar?nombre=${nombre}`);
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Usuario no registrado';
          break;
        case 500:
          errorMessage = 'Error en el servidor, inténtelo más tarde';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}