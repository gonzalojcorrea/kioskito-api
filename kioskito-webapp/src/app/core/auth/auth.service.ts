import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';

export interface UserSession {
  id: number;
  email: string;
  name: string;
  role: string;
  status: boolean;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly storageKey = 'kioskito_user';
  private readonly tokenKey = 'kioskito_token';

  // signals
  currentUser = signal<UserSession | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) this.currentUser.set(JSON.parse(saved));
  }

  /** 🔹 Login contra el API real */
  login(email: string, password: string) {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, { 
      email, 
      password 
    }).pipe(
      map((response) => {
        // El token viene dentro de response.data
        const token = response?.data;
        
        if (token) {
          // Guardar el token
          localStorage.setItem(this.tokenKey, token);
          
          // Decodificar el JWT para obtener la información del usuario
          const payload = this.decodeToken(token);
          
          if (payload) {
            const user: UserSession = {
              id: payload.sub || payload.userId,
              email: payload.unique_name || payload.email,
              name: payload.unique_name || payload.name,
              role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role,
              status: true,
              token: token
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(user));
            this.currentUser.set(user);
            return true;
          }
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  /** 🔹 Decodificar JWT (básico, sin validación de firma) */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  /** 🔹 Cerrar sesión */
  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
  }

  /** 🔹 Obtener el token JWT */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** 🔹 Saber si hay sesión activa */
  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  /** 🔹 Obtener usuario actual */
  getUser(): UserSession | null {
    return this.currentUser();
  }
}
