import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

export interface UserSession {
  id: number;
  email: string;
  name: string;
  role: string;
  status: boolean;
  token?: string; // opcional, si después usás JWT real
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly storageKey = 'kioskito_user';

  // signals
  currentUser = signal<UserSession | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) this.currentUser.set(JSON.parse(saved));
  }

  /** 🔹 Login básico contra json-server */
  login(email: string, password: string) {
    return this.http.get<UserSession[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length === 1 && users[0].status) {
          const user = users[0];
          localStorage.setItem(this.storageKey, JSON.stringify(user));
          this.currentUser.set(user);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  /** 🔹 Cerrar sesión */
  logout() {
    localStorage.removeItem(this.storageKey);
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
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
