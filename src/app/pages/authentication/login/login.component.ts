import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logindto } from 'src/externalService/model/logindto';
import { LoginService } from 'src/externalService/service/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData: Logindto = this.loginForm.value;
      this.loginService.login(loginData).subscribe({
        next: (response) => {
          // Maneja el éxito del login
          console.log('Usuario logueado', response);
        },
        error: (err) => {
          // Maneja errores
          console.error('Error en el login', err);
        }
      });
    }
  }
}