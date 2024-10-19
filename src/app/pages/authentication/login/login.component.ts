import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/externalService/service/login/login.service';
import { LoginRequest } from 'src/externalService/service/login/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],  // Solo requerido, sin validación de email
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        
        next: (userData) => {
          localStorage.setItem('authentication', userData);
          console.log(userData);
          this.router.navigateByUrl('/dashboard');
          console.log("redireccion listo: /");
          
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          console.info("Login exitoso");
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  logout(){
    this.loginService.logout
  }
}
