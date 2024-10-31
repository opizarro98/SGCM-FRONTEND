import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, map, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Person } from 'src/externalService/model/person/Person';
import { Diagnosis } from 'src/externalService/model/diagnosis/Diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private apiUrl = environment.urlHost + 'diagnosisRest/';

  constructor(private http: HttpClient) { }

  // Lista todas los diagnosticos
  getDiagnosis(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "searchForAllDiagnosis");
  }


  // Crea nuevo diagnostico
  createNewDiagnosis(diagnosis: Diagnosis, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}createNewDiagnosis`, diagnosis, { headers }).pipe(
      tap((response) => {
        console.log('Diagnosis created successfully:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Busca un diagnostico por su codigo
  getDiagnosisByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}searchDiagnosisForCode/${code}`).pipe(
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