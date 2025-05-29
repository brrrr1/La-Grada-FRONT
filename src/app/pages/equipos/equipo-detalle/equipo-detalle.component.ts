import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoService, Equipo } from '../../../services/equipo.service';
import { AuthService } from '../../../services/auth.service';
import { EventoService, Evento } from '../../../services/evento.service';

interface EventoCard extends Evento {
  escudo1Url?: string;
  escudo2Url?: string;
}

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.component.html',
  styleUrls: ['./equipo-detalle.component.css']
})
export class EquipoDetalleComponent implements OnInit {
  equipo: Equipo | null = null;
  escudoUrl?: string;
  fondoUrl?: string;
  loading = true;
  errorMsg = '';
  eventos: EventoCard[] = [];
  eventosLoading = false;
  eventosError = '';

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private auth: AuthService,
    private eventoService: EventoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.equipoService.getEquipoById(id).subscribe({
        next: (data) => {
          this.equipo = data;
          this.loadImages();
          this.loading = false;
          this.loadEventos();
        },
        error: () => {
          this.errorMsg = 'Error al cargar el equipo';
          this.loading = false;
        }
      });
    } else {
      this.errorMsg = 'ID de equipo no válido';
      this.loading = false;
    }
  }

  loadImages() {
    if (!this.equipo) return;
    const token = this.auth.getToken();
    if (!token) return;
    this.equipoService.downloadImage(this.equipo.fotoEscudo, token).subscribe({
      next: (blob) => {
        this.escudoUrl = URL.createObjectURL(blob);
      },
      error: () => {
        this.escudoUrl = undefined;
      }
    });
    this.equipoService.downloadImage(this.equipo.fotoFondo, token).subscribe({
      next: (blob) => {
        this.fondoUrl = URL.createObjectURL(blob);
      },
      error: () => {
        this.fondoUrl = undefined;
      }
    });
  }

  loadEventos() {
    if (!this.equipo) return;
    this.eventosLoading = true;
    this.eventosError = '';
    this.eventoService.getEventosPorEquipo(this.equipo.nombre).subscribe({
      next: (data) => {
        this.eventos = data;
        this.loadEventoEscudos();
        this.eventosLoading = false;
      },
      error: () => {
        this.eventosError = 'No se pudieron cargar los próximos eventos.';
        this.eventosLoading = false;
      }
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
}
