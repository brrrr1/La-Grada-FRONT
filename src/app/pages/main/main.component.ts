import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EquipoService, Equipo } from '../../services/equipo.service';
import { EventoService, Evento } from '../../services/evento.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface EquipoCard extends Equipo {
  escudoUrl?: string;
  fondoUrl?: string;
}

interface EventoCard extends Evento {
  escudo1Url?: string;
  escudo2Url?: string;
}

const BASE_URL = 'http://localhost:8080';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  equipos: EquipoCard[] = [];
  eventos: EventoCard[] = [];
  loading = true;
  loadingEventos = true;
  errorMsg = '';
  errorEventos = '';
  userName: string | null = null;

  constructor(
    public auth: AuthService,
    private equipoService: EquipoService,
    private eventoService: EventoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.loadImages();
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error al cargar los equipos';
        this.loading = false;
      }
    });
    this.eventoService.getProximosEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.loadEventoEscudos();
        this.loadingEventos = false;
      },
      error: (err) => {
        this.errorEventos = 'Error al cargar los eventos';
        this.loadingEventos = false;
      }
    });
    this.loadUserName();
  }

  loadImages() {
    const token = this.auth.getToken();
    if (!token) return;
    this.equipos.forEach((equipo, idx) => {
      // Escudo
      this.equipoService.downloadImage(equipo.fotoEscudo, token).subscribe({
        next: (blob) => {
          this.equipos[idx].escudoUrl = URL.createObjectURL(blob);
        },
        error: () => {
          this.equipos[idx].escudoUrl = undefined;
        }
      });
      // Fondo
      this.equipoService.downloadImage(equipo.fotoFondo, token).subscribe({
        next: (blob) => {
          this.equipos[idx].fondoUrl = URL.createObjectURL(blob);
        },
        error: () => {
          this.equipos[idx].fondoUrl = undefined;
        }
      });
    });
  }

  loadEventoEscudos() {
    const token = this.auth.getToken();
    if (!token) return;
    this.eventos.forEach((evento, idx) => {
      // Escudo equipo1
      this.equipoService.downloadImage(evento.equipo1.fotoEscudo, token).subscribe({
        next: (blob) => {
          this.eventos[idx].escudo1Url = URL.createObjectURL(blob);
        },
        error: () => {
          this.eventos[idx].escudo1Url = undefined;
        }
      });
      // Escudo equipo2
      this.equipoService.downloadImage(evento.equipo2.fotoEscudo, token).subscribe({
        next: (blob) => {
          this.eventos[idx].escudo2Url = URL.createObjectURL(blob);
        },
        error: () => {
          this.eventos[idx].escudo2Url = undefined;
        }
      });
    });
  }

  loadUserName() {
    const token = this.auth.getToken();
    if (!token) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.get<{ nombre: string }>(`${BASE_URL}/me`, { headers }).subscribe({
      next: (data) => {
        this.userName = data.nombre;
      },
      error: () => {
        this.userName = null;
      }
    });
  }
}
