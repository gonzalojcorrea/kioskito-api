import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../models/customer.model';
import { GeocodingService } from '../../../services/geolocation/geocoding.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map-customers',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatButtonModule],
  template: `
    <div class="map-dialog">
      <h2 class="mat-mdc-dialog-title">Mapa de Clientes</h2>

      <div class="map-container">
        <google-map
          width="100%"
          height="100%"
          [center]="center"
          [zoom]="zoom">
          <map-marker
            *ngFor="let m of markers"
            [position]="m.position"
            [label]="m.label"
            [title]="m.title"
            (mapClick)="zoomToMarker(m)">
          </map-marker>
        </google-map>
      </div>

      <footer class="map-footer">
        <button class="btn btn-cancel" (click)="closeDialog()">Cerrar</button>
        <button class="btn btn-primary" (click)="traceRoute()">Trazar ruta</button>
      </footer>
    </div>
  `,
  styles: [`
    /* === CONTENEDOR PRINCIPAL === */
    .map-dialog {
      display: flex;
      flex-direction: column;
      height: 90vh; /* 🔹 Más alto */
      width: 100%;
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }

    /* === HEADER === */
    .mat-mdc-dialog-title {
      background-color: #1a3d66;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      padding: 5px 10px;
      margin: 0;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    /* === MAPA === */
    .map-container {
      flex: 1 1 auto;
      min-height: 0;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    google-map {
      display: block;
      height: 100%;
      width: 100%;
    }

    /* === FOOTER === */
    .map-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 14px 16px;
      background: #f9f9f9;
      border-top: 1px solid #ddd;
    }

    /* === BOTONES (idénticos al modal de acción) === */
    .btn,
    button.mat-mdc-button-base {
      font-weight: 600;
      border-radius: 4px;
      padding: 8px 24px; /* 🔹 Igual que modal acción */
      text-transform: none;
      transition: all 0.2s ease;
      cursor: pointer;
      box-shadow: none !important;
    }

    .btn-cancel {
      background-color: #fff;
      color: #1a3d66;
      border: 1px solid #1a3d66;
    }

    .btn-cancel:hover {
      background-color: #eaf0fa;
      color: #005cbb;
      border-color: #0f2b4c;
    }

    .btn-primary {
      background-color: #1a3d66;
      color: #fff;
      border: none;
    }

    .btn-primary:hover {
      background-color: #0f2b4c;
    }

    /* Sin halo de foco */
    button:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  `]
})
export class MapCustomersComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -34.6037, lng: -58.3816 };
  zoom = 11;
  markers: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer[],
    private geo: GeocodingService,
    private dialogRef: MatDialogRef<MapCustomersComponent>
  ) {}

  ngOnInit() {
    this.data.forEach(c => {
      if (c.address) {
        this.geo.geocodeAddress(c.address).subscribe(coords => {
          if (coords) {
            this.markers.push({
              position: coords,
              label: { text: c.name, color: '#0f2b4c', fontWeight: '500', fontSize: '12px' },
              title: c.name
            });
            if (this.markers.length === 1) this.center = coords;
          }
        });
      }
    });
  }

  zoomToMarker(marker: any) {
    this.center = marker.position;
    this.zoom = 17;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  traceRoute() {
    const clientsWithAddress = this.data.filter(c => c.address);
    if (!clientsWithAddress.length) {
      alert('⚠️ No hay direcciones disponibles para trazar la ruta.');
      return;
    }
    const addresses = clientsWithAddress.map(c => encodeURIComponent(c.address)).join('/');
    const url = `https://www.google.com/maps/dir/${addresses}`;
    window.open(url, '_blank');
  }
}
