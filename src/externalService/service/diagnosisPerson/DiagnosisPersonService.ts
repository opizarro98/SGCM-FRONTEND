import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { DiagnosisPerson } from 'src/externalService/model/diagnosisPerson/DiagnosisPerson';
import {DiagnosisPersonsIDDTO} from '../../model/diagnosisPerson/DiagnosisPersonsIDDTO';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisPersonService {
    private apiUrl = environment.urlHost + 'diagnosisPersonRest/';

    constructor(private http: HttpClient) { }

    createDiagnosisPerson(cita: DiagnosisPerson, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${this.apiUrl}createNewDiagnosis`, cita, { headers }).pipe(
            tap((response) => {
                console.log('se creo con exito el diagnostico de la persona ' + response)
            }),
            catchError(this.handleError)

        );
    }

    updateDiagnosis(cita: DiagnosisPersonsIDDTO, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.put<any>(`${this.apiUrl}updateDiagnosis`, cita, { headers }).pipe(
            tap((response) => {
                console.log('se creo con exito el diagnostico de la persona ' + response)
            }),
            catchError(this.handleError)

        );
    }

    getDiagnosisByPersonId(personId: string, token: string): Observable<DiagnosisPersonsIDDTO> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<DiagnosisPersonsIDDTO>(`${this.apiUrl}getDiagnosisPersonByPersonId/${personId}`, { headers }).pipe(
            tap((response) => {
                console.log('Respuesta del servicio de antecedentes:', response);
            }),
            catchError(this.handleError)
        );
    }

    getDiagnosisByPersonIdComplete(personId: string, token: string): Observable<DiagnosisPersonsIDDTO> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<DiagnosisPersonsIDDTO>(`${this.apiUrl}getDiagnosisPersonByPersonId/${personId}`, { headers }).pipe(
            tap((response) => {
                console.log('Respuesta del servicio de antecedentes:', response);
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