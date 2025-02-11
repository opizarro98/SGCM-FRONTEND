import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, map, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Attentions } from 'src/externalService/model/attentions/attentions';
import { AttentionWithMonthDTO } from 'src/externalService/model/attentions/attentionWithMonthDTO';
import { AnnualAttentionDTO } from 'src/externalService/model/attentions/annualAttentionDTO';

@Injectable({
  providedIn: 'root'
})
export class AttentionsService {

  private apiUrl = environment.urlHost + 'atentionRest/';

  constructor(private http: HttpClient) { }

  // Crea una nueva Attentiona
  createAttention(Attention: Attentions, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}createNewAtention`, Attention, { headers }).pipe(
      tap((response) => {
        console.log('Attention created successfully:', response);
      }),
      catchError(this.handleError)
    );
  }


  //Recuperar las atenciones del anio en curso
  getAnnualAttentions(token: string): Observable<AnnualAttentionDTO> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<AnnualAttentionDTO>(`${this.apiUrl}getAllAttentiononYear`, { headers }).pipe(
        tap((response) => {
            console.log('Respuesta del servicio de antecedentes:', response);
        }),
        catchError(this.handleError)
    );
  }


  //Recuperar las atenciones del anio con meses
  getAnnualAttentionswithMonth(token: string): Observable<AttentionWithMonthDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<AttentionWithMonthDTO[]>(`${this.apiUrl}annualAttendanceToMonth`, { headers }).pipe(
      tap((response) => {
        console.log('Respuesta del servicio de atenciones:', response);
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