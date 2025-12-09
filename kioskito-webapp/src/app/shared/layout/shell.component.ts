import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavItem } from './sidebar.component';
import { AuthService } from '../../core/auth/auth.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    SidebarComponent
  ],
  template: `
    <mat-sidenav-container class="shell">
      <!-- Sidebar -->
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar [items]="items" (logout)="logout()"></app-sidebar>
      </mat-sidenav>

      <!-- Contenido principal -->
      <mat-sidenav-content>
        <mat-toolbar class="toolbar">
          <div class="toolbar-content">
            <div class="toolbar-left">
              <mat-icon class="menu-icon">dashboard</mat-icon>
              <span class="view-title">{{ currentPageTitle }}</span>
            </div>
            
            <div class="toolbar-right">
              <!-- Widget de cotizaciones de dólar -->
              <div class="dollar-rates-container">
                <div class="dollar-rate-item" *ngFor="let rate of dollarRates">
                  <span class="rate-casa">{{ rate.casa }}</span>
                  <div class="rate-values">
                    <span class="rate-label">Compra</span>
                    <span class="rate-value"><span>$</span>{{ rate.compra }}</span>
                  </div>
                  <div class="rate-values">
                    <span class="rate-label">Venta</span>
                    <span class="rate-value"><span>$</span>{{ rate.venta }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-toolbar>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell { 
      height: 100vh; 
      background: #f8f9fa;
    }
    
    .sidenav { 
      width: 260px;
      background: linear-gradient(180deg, #1e3a5f 0%, #2c5282 100%);
      border-right: none;
      box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
    }
    
    .toolbar { 
      position: sticky; 
      top: 0; 
      z-index: 100; 
      background: #ffffff;
      color: #2d3748;
      padding: 0;
      height: 72px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #e2e8f0;
    }
    
    .toolbar-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      gap: 24px;
    }
    
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .menu-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: #2d3748;
    }
    
    .view-title { 
      font-weight: 600; 
      font-size: 22px;
      letter-spacing: 0.5px;
      color: #1a365d;
    }
    
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    /* Widget de cotizaciones */
    .dollar-rates-container {
      display: flex;
      gap: 16px;
      align-items: center;
      height: 50px;
    }
    
    .dollar-rate-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e0;
      transition: all 0.3s ease;
      min-width: 160px;
    }
    
    .dollar-rate-item:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #a0aec0;
      transform: translateY(-2px);
    }
    
    .rate-casa {
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      color: #2d3748;
      letter-spacing: 0.5px;
      min-width: 50px;
    }
    
    .rate-values {
      display: flex;
      flex-direction: column;
      line-height: 1;
      gap: 2px;
    }
    
    .rate-label {
      font-size: 10px;
      font-weight: 500;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    
    .rate-value {
      font-size: 13px;
      font-weight: 700;
      color: #1a365d;
    }
    
    .content { 
      padding: 24px; 
      background: #f8f9fa;
      min-height: calc(100vh - 72px);
      overflow: auto;
    }
    
    /* Responsive */
    @media (max-width: 1200px) {
      .dollar-rates-container {
        gap: 12px;
      }
      
      .dollar-rate-item {
        min-width: 140px;
        padding: 6px 10px;
      }
    }
    
    @media (max-width: 900px) {
      .toolbar-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 16px;
      }
      
      .toolbar {
        height: auto;
        min-height: 72px;
      }
      
      .dollar-rates-container {
        width: 100%;
        flex-wrap: wrap;
      }
      
      .sidenav {
        width: 220px;
      }
    }
  `]
})
export class ShellComponent implements OnInit, OnDestroy {
  @Input() title = 'Kioskito';
  @Input() items: NavItem[] = [];

  userName = '';
  currentPageTitle = 'Dashboard';
  dollarRates: any[] = [];
  private destroy$ = new Subject<void>();

  // Mapeo de rutas a títulos
  private routeTitles: { [key: string]: string } = {
    '/dashboard/home': 'Dashboard',
    '/dashboard/articulos': 'Inventario',
    '/dashboard/clientes': 'Clientes',
    '/dashboard/usuarios': 'Usuarios',
    '/dashboard/consignaciones': 'Consignaciones',
    '/dashboard/cierre-consignaciones': 'Cierre de Consignaciones'
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const user = this.auth.getUser();
    this.userName = user?.name || '';
  }

  ngOnInit() {
    // Actualizar título según la ruta actual
    this.updatePageTitle(this.router.url);
    
    // Escuchar cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        this.updatePageTitle(event.urlAfterRedirects || event.url);
      });

    // Cargar cotizaciones del dólar
    this.fetchDollarRates();
    
    // Actualizar cada 60 segundos
    setInterval(() => this.fetchDollarRates(), 60000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updatePageTitle(url: string) {
    // Buscar coincidencia exacta o parcial
    for (const [route, title] of Object.entries(this.routeTitles)) {
      if (url.includes(route)) {
        this.currentPageTitle = title;
        return;
      }
    }
    this.currentPageTitle = this.title;
  }

  private fetchDollarRates() {
    const endpoints = [
      'https://dolarapi.com/v1/dolares/oficial',
      'https://dolarapi.com/v1/dolares/blue',
      'https://dolarapi.com/v1/dolares/bolsa'
    ];

    endpoints.forEach(endpoint => {
      this.http.get<any>(endpoint)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            const index = this.dollarRates.findIndex(r => r.casa === data.casa);
            if (index >= 0) {
              this.dollarRates[index] = data;
            } else {
              this.dollarRates.push(data);
            }
            // Ordenar: Oficial, Blue, Bolsa
            this.sortRates();
          },
          error: (err) => console.error(`Error fetching ${endpoint}:`, err)
        });
    });
  }

  private sortRates() {
    const order: { [key: string]: number } = {
      'Oficial': 0,
      'Blue': 1,
      'Bolsa': 2
    };
    this.dollarRates.sort((a, b) => (order[a.casa] || 999) - (order[b.casa] || 999));
  }

  logout() {
    this.auth.logout();
  }
}
