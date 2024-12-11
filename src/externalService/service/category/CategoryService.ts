import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';
import { Category } from 'src/externalService/model/category/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.urlHost + 'categorieRest/';

  constructor(private http: HttpClient) { }

  // Lista todas las categorías
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + "searchForAllCategorie").pipe(
      catchError(this.handleError)
    );
  }

  // Crea una nueva categoría
  createNewCategory(category: Category, token: string): Observable<Category> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Category>(`${this.apiUrl}createNewCategories`, category, { headers }).pipe(
      tap((response) => {
        console.log('Categoría creada exitosamente:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Busca una categoría por su código
  getCategoryByCode(code: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}searchCategorieForCode/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Categoría no encontrada.';
          break;
        case 500:
          errorMessage = 'Error en el servidor, inténtelo más tarde.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
