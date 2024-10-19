import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); // Verifica si hay un token en localStorage
    if (token) {
      console.log(token + "--------------------")
      return true; // Si hay token, permite el acceso
    } else {
      this.router.navigate(['/authentication/login']); // Si no hay token, redirige al login
      return false; // No permite el acceso
    }
  }
}
