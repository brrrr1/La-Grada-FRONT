import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

export interface Evento {
  nombre: string;
  descripcion: string;
  fechaYHora: string;
  equipo1: {
    id: string;
    nombre: string;
    fotoEscudo: string;
    fotoFondo: string;
  };
  equipo2: {
    id: string;
    nombre: string;
    fotoEscudo: string;
    fotoFondo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(private http: HttpClient) {}

  getProximosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos`);
  }
}
