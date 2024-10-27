import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  private apiUrl = environment.urlHost + 'appointmentRest/';

  constructor(private http: HttpClient) {}

  // Método para obtener todas las citas
  getAppointments(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"getAllAppointments");
  }
}
