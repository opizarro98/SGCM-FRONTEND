import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Antecedent } from 'src/externalService/model/antecedents/Antecedent';

@Injectable({
  providedIn: 'root'
})
export class AntecedentsService {
  private apiUrl = environment.urlHost + 'antecedentsRest/';

  constructor(private http: HttpClient) { }

  createAntecents(cita: Antecedent, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}createNewAntecedent`, cita, { headers }).pipe(
      tap((response) => {

      }),
      catchError(this.handleError)
    );
  }

  getAntecedentsByPersonId(personId: string, token: string): Observable<Antecedent[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Antecedent[]>(`${this.apiUrl}getAntecedentsByPersonId/${personId}`, { headers }).pipe(
      tap((response) => {
        console.log('el id de la persona a consultar es: ' + response);
      }),
      catchError(this.handleError)
    );
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
          errorMessage = 'Error al crear el antecedente';
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