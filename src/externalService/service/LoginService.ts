import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logindto } from '../model/logindto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:8081/api/userRest';

  constructor(private http: HttpClient) { }

login(credentials: Logindto): Observable<any> {
  const params = new HttpParams()
    .set('username', credentials.username)
    .set('password', credentials.password);

  return this.http.get<any>(`${this.apiURL}/loginToSystem`, { params });
}
}
