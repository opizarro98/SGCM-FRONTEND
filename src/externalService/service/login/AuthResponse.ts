export interface AuthResponse {
  token: string; // Token de autenticación
  expiresIn: number; // Tiempo en segundos hasta que el token expire
  username: string; // Nombre de usuario (opcional)
  // Puedes incluir otros campos según lo que tu API devuelva
}
