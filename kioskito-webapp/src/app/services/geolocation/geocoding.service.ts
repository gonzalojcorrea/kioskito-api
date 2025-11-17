import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private apiKey = 'AIzaSyBg3qDewsRE1nfN8P39x2pBXR2l_Au7Dvw';
  private baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<{ lat: number; lng: number } | null> {
    console.log("📨 Geocoding recibido:", address);

    if (!address) {
      console.log("⚠️ Dirección vacía:", address);
      return of(null);
    }

    const url = `${this.baseUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    console.log("🌐 Geocoding REQUEST:", url);

    return this.http.get<any>(url).pipe(
      map(res => {
        console.log("🌐 Geocoding RESPONSE:", res);

        if (res.status === 'OK' && res.results.length > 0) {
          const loc = res.results[0].geometry.location;
          return { lat: loc.lat, lng: loc.lng };
        }

        console.log("❌ Geocoding sin resultados:", res.status);
        return null;
      })
    );
  }
}
