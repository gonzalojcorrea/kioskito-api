import { Injectable, signal, computed } from '@angular/core';

interface UserState {
  token: string | null;
  email: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private state = signal<UserState>({ token: null, email: null });

  readonly isAuthenticated = computed(() => !!this.state().token);
  readonly email = computed(() => this.state().email);

  constructor() {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const parsed: UserState = JSON.parse(saved);
        this.state.set(parsed);
      } catch {}
    }
  }

  login(email: string, password: string): boolean {
    // For now accept any non-empty credentials; simulate token
    if (email && password) {
      const token = 'fake-token-' + Math.random().toString(36).slice(2);
      this.state.set({ token, email });
      localStorage.setItem('auth', JSON.stringify(this.state()));
      return true;
    }
    return false;
  }

  logout(): void {
    this.state.set({ token: null, email: null });
    localStorage.removeItem('auth');
  }
}
