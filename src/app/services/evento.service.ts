import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

export interface Entrada {
  id: string;
  usuarioId: string;
  usuarioNombre: string;
  usuarioApellidos: string;
  usuarioCorreo: string;
}

export interface Evento {
  id: string;
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
  entradasRestantes: number;
  entradasTotales: number;
  precio: number;
  tipoEvento: string;
  entradas: Entrada[];
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(private http: HttpClient) {}

  getProximosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos`);
  }

  getEventosPorEquipo(nombreEquipo: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/equipo/${encodeURIComponent(nombreEquipo)}`);
  }

  getEventoPorId(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${BASE_URL}/evento/${id}`);
  }

  buyTicket(eventId: string) {
    return this.http.post(`${BASE_URL}/user/buy-ticket/${eventId}`, {});
  }
}
