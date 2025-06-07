import { Component, OnInit } from '@angular/core';
import { EventoService, Evento } from '../../../../services/evento.service';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  eventos: Evento[] = [];
  loading: boolean = true;
  error: string | null = null;

  deleteMode: boolean = false;
  eventoSeleccionado: Evento | null = null;
  showDeleteModal: boolean = false;

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos(): void {
    this.loading = true;
    this.eventoService.getAllEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los eventos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onEliminarClick() {
    this.deleteMode = !this.deleteMode;
    if (!this.deleteMode) {
      this.eventoSeleccionado = null;
    }
  }

  seleccionarEvento(evento: Evento) {
    if (this.deleteMode) {
      this.eventoSeleccionado = evento;
      this.showDeleteModal = true;
    }
  }

  isEventoSeleccionado(evento: Evento): boolean {
    return this.eventoSeleccionado?.id === evento.id;
  }

  onDeleteModalConfirm() {
    if (!this.eventoSeleccionado) return;
    this.eventoService.deleteEvento(this.eventoSeleccionado.id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id !== this.eventoSeleccionado?.id);
        this.showDeleteModal = false;
        this.deleteMode = false;
        this.eventoSeleccionado = null;
      },
      error: () => {
        this.error = 'No se pudo eliminar el evento.';
        this.showDeleteModal = false;
        this.deleteMode = false;
        this.eventoSeleccionado = null;
      }
    });
  }

  onDeleteModalCancel() {
    this.showDeleteModal = false;
    this.eventoSeleccionado = null;
  }
} 