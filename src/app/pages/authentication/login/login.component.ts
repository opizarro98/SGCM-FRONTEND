import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      // Codificar las credenciales en Base64
      const credentials = btoa(`${loginData.usuario}:${loginData.contrasena}`);

      // Establecer las cabeceras de la solicitud
      const headers = new HttpHeaders({
        'Authorization': `Basic ${credentials}`
      });

      console.log(credentials + 'asdasdadasdsad');
      // Realizar la solicitud GET a tu endpoint
      this.http.get('http://localhost:8081/api/auth/login', { headers })
        .subscribe(response => {
          // Manejo de respuesta aquí
          console.log('Login successful', response);
        }, error => {
          // Manejo de error aquí
          console.error('Login failed', error);
        });
    }
  }
}
