import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../../../models/customer.model';
import { GeocodingService } from '../../../services/geolocation/geocoding.service';
import { ConfigService } from '../../../services/configuration.service';

@Component({
  selector: 'app-map-customers',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatButtonModule, MatIconModule],
  templateUrl: './map-customers.component.html',
  styleUrls: ['./map-customers.component.css']
})
export class MapCustomersComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -31.4201, lng: -64.1888 };
  zoom = 11;
  markers: any[] = [];
  originAddress: string | null = null;
  centralMarker: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer[],
    private geo: GeocodingService,
    private configService: ConfigService, // 🟢 agregado
    private dialogRef: MatDialogRef<MapCustomersComponent>
  ) {}

ngOnInit() {

  this.configService.getConfig().subscribe({
    next: (config) => {
      console.log("🟢 Config recibida:", config);

      this.originAddress = config.data.address;

      if (this.originAddress) {
        this.geo.geocodeAddress(this.originAddress).subscribe(coords => {
          if (coords) {
            this.centralMarker = {
              position: coords,
              label: {
                text: 'Central',
                color: '#1a3d66',
                fontWeight: 'bold',
                fontSize: '13px'
              },
              title: config.data.companyName,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }
            };

            this.center = coords;
          }
        });
      }
    },
    error: (err) => console.error('Error cargando configuración', err)
  });

  // Marcadores de clientes
  this.data.forEach(c => {
    if (c.address) {
      this.geo.geocodeAddress(c.address).subscribe(coords => {
        if (coords) {
          this.markers.push({
            position: coords,
            label: { text: c.name, color: '#0f2b4c', fontWeight: '500', fontSize: '12px' },
            title: c.name
          });

          if (this.markers.length === 1 && !this.centralMarker) {
            this.center = coords;
          }
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

    const origin = this.originAddress ? encodeURIComponent(this.originAddress) + '/' : '';
    const destinations = clientsWithAddress.map(c => encodeURIComponent(c.address)).join('/');
    const url = `https://www.google.com/maps/dir/${origin}${destinations}`;
    window.open(url, '_blank');
  }
}