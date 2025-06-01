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

  getProximosEventos(filtros?: any): Observable<Evento[]> {
    let params: any = {};
    if (filtros) {
      if (filtros.nombre) params.nombre = filtros.nombre;
      if (filtros.equipo) params.equipo = filtros.equipo;
      if (filtros.aunQuedanEntradas) params.aunQuedanEntradas = true;
    }
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos`, { params });
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

  getProximosEventosAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos/all`);
  }

  getProximosEventosCotidianos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos/cotidianos`);
  }

  getProximosEventosImportantes(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos/importantes`);
  }

  getProximosEventosFinales(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${BASE_URL}/evento/proximos/finales`);
  }
}
