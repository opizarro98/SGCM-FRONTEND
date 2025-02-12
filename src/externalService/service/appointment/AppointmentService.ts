import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Appointment } from 'src/externalService/model/appointment/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.urlHost + 'appointmentRest/';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "getAllAppointments");
  }

  getAppointmentsnotAttended(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "getAppointmentsTodaynotAttended");
  }

  createAppointment(cita: Appointment, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}createNewAppointment`, cita, { headers }).pipe(
      tap((response) => {
      }),
      catchError(this.handleError)
    );
  }

  canceledAppointment(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Incluye el ID como parte de la URL
    return this.http.put<any>(`${this.apiUrl}canceledAppointment/${id}`, null, { headers }).pipe(
      tap((response) => {
      }),
      catchError(this.handleError)
    );
  }

  attendedAppointment(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Incluye el ID como parte de la URL
    return this.http.put<any>(`${this.apiUrl}attendedAppointment/${id}`, null, { headers }).pipe(
      tap((response) => {
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
          errorMessage = 'Error al agendar la cita';
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
