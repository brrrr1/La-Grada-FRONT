import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento, EventoService } from '../../../services/evento.service';
import { EquipoService } from '../../../services/equipo.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent implements OnInit {
  evento?: Evento;
  cargando = true;
  error?: string;
  escudo1Url?: string;
  escudo2Url?: string;
  fondo1Url?: string;
  fondo2Url?: string;
  usuarioId: string | null = null;
  yaTieneEntrada = false;
  comprando = false;
  compraMsg = '';

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private equipoService: EquipoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usuarioId = this.auth.getUserId();
    if (id) {
      this.eventoService.getEventoPorId(id).subscribe({
        next: (evento: Evento) => {
          this.evento = evento;
          this.cargarImagenes();
          this.cargando = false;
          this.comprobarEntrada();
        },
        error: (err: any) => {
          this.error = 'No se pudo cargar el evento';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'ID de evento no encontrado';
      this.cargando = false;
    }
  }

  cargarImagenes() {
    if (!this.evento) return;
    const token = this.auth.getToken();
    if (!token) return;
    this.equipoService.downloadImage(this.evento.equipo1.fotoEscudo, token).subscribe({
      next: (blob) => {
        this.escudo1Url = URL.createObjectURL(blob);
      },
      error: () => {
        this.escudo1Url = undefined;
      }
    });
    this.equipoService.downloadImage(this.evento.equipo2.fotoEscudo, token).subscribe({
      next: (blob) => {
        this.escudo2Url = URL.createObjectURL(blob);
      },
      error: () => {
        this.escudo2Url = undefined;
      }
    });
    this.equipoService.downloadImage(this.evento.equipo1.fotoFondo, token).subscribe({
      next: (blob) => {
        this.fondo1Url = URL.createObjectURL(blob);
      },
      error: () => {
        this.fondo1Url = undefined;
      }
    });
    this.equipoService.downloadImage(this.evento.equipo2.fotoFondo, token).subscribe({
      next: (blob) => {
        this.fondo2Url = URL.createObjectURL(blob);
      },
      error: () => {
        this.fondo2Url = undefined;
      }
    });
  }

  comprobarEntrada() {
    if (!this.evento || !this.usuarioId) {
      this.yaTieneEntrada = false;
      return;
    }
    this.yaTieneEntrada = this.evento.entradas.some(e => e.usuarioId === this.usuarioId);
  }

  comprarEntrada() {
    if (!this.evento || this.yaTieneEntrada || this.evento.entradasRestantes <= 0) return;
    this.comprando = true;
    this.compraMsg = '';
    this.eventoService.buyTicket(this.evento.id).subscribe({
      next: () => {
        this.compraMsg = '¡Entrada comprada con éxito!';
        // Actualizar estado local
        this.evento!.entradasRestantes--;
        if (this.usuarioId) {
          this.evento!.entradas.push({
            id: 'fake', // El backend no devuelve la entrada, pero así se actualiza el estado visual
            usuarioId: this.usuarioId,
            usuarioNombre: '',
            usuarioApellidos: '',
            usuarioCorreo: ''
          });
        }
        this.comprobarEntrada();
        this.comprando = false;
      },
      error: (err) => {
        this.compraMsg = err?.error?.message || 'Error al comprar la entrada';
        this.comprando = false;
      }
    });
  }
}
