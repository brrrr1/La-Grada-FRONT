import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

export interface Equipo {
  id: string;
  nombre: string;
  fotoEscudo: string;
  fotoFondo: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${BASE_URL}/equipo/`);
  }

  downloadImage(filename: string, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${BASE_URL}/download/${filename}`, { headers, responseType: 'blob' });
  }

  getEquipoById(id: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${BASE_URL}/equipo/${id}`);
  }
}
