import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';


import { LoginRequest } from './LoginRequest';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Variables para manejar el estado de la sesión
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {
    // Al inicializar el servicio, revisamos si hay un token guardado
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    this.currentUserLoginOn = new BehaviorSubject<boolean>(!!token);
    this.currentUserData = new BehaviorSubject<string>(token || "");
  }

  // Método para iniciar sesión
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "auth/login", credentials).pipe(
      tap((userData) => {
        //console.log("Token recibido:", userData.token);  // Depuración para asegurar que recibimos el token
        // Guardamos el token en ambos storages
        sessionStorage.setItem("token", userData.token);
        localStorage.setItem("token", userData.token);
        // Actualizamos los BehaviorSubjects
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token), // Retornamos el token como resultado
      catchError(this.handleError) // Manejamos errores
    );
  }

  // Método para cerrar sesión
  logout(): void {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.currentUserData.next(""); // Limpiamos el valor del token
    console.log("Sesión cerrada");
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('El backend retornó un código de estado:', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  // Observable para obtener el estado del token
  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  // Observable para obtener el estado de login
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  // Método para obtener el token actual (sin observable)
  get userToken(): string {
    return this.currentUserData.value;
  }
}