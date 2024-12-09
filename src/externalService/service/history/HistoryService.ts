import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, map, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Person } from 'src/externalService/model/person/Person';
import { ClinicHistorie } from 'src/externalService/model/history/ClinicHistorie';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

    private apiUrl = environment.urlHost + 'historieRest/';

  constructor(private http: HttpClient) { }


  // Crea una nueva historia
  createNewHistory(history: ClinicHistorie, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}createNewHistory`, history, { headers }).pipe(
      tap((response) => {
        console.log('History created successfully:', response);
      }),
      catchError(this.handleError)
    );
  }





  //----------------------------------------
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