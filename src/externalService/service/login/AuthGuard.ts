import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    // Revisamos en sessionStorage o localStorage si hay un token
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    if (token) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']);
      return false; // Bloqueamos el acceso a la ruta protegida
    }
  }
}