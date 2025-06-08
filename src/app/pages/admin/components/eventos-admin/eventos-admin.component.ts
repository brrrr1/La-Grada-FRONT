import { Component, OnInit } from '@angular/core';
import { EventoService, Evento } from '../../../../services/evento.service';
import { EquipoService } from '../../../../services/equipo.service';
import { Equipo } from '../../../../models/equipo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  eventos: Evento[] = [];
  equipos: Equipo[] = [];
  loading: boolean = true;
  error: string | null = null;

  deleteMode: boolean = false;
  editMode: boolean = false;
  eventoSeleccionado: Evento | null = null;
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;

  eventoForm: FormGroup;

  constructor(
    private eventoService: EventoService,
    private equipoService: EquipoService,
    private fb: FormBuilder
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaYHora: ['', Validators.required],
      equipo1Id: ['', Validators.required],
      equipo2Id: ['', Validators.required],
      entradasTotales: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEventos();
    this.loadEquipos();
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

  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
      }
    });
  }

  onEliminarClick() {
    this.deleteMode = !this.deleteMode;
    if (!this.deleteMode) {
      this.eventoSeleccionado = null;
    }
  }

  onEditarClick() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.eventoSeleccionado = null;
    }
  }

  seleccionarEvento(evento: Evento) {
    if (this.deleteMode) {
      this.eventoSeleccionado = evento;
      this.showDeleteModal = true;
    } else if (this.editMode) {
      this.eventoSeleccionado = evento;
      this.eventoForm.patchValue({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        fechaYHora: evento.fechaYHora,
        equipo1Id: evento.equipo1?.id,
        equipo2Id: evento.equipo2?.id,
        entradasTotales: evento.entradasTotales,
        precio: evento.precio,
        tipo: evento.tipoEvento
      });
      this.showEditModal = true;
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

  onEditModalConfirm() {
    if (this.eventoForm.valid && this.eventoSeleccionado) {
      const eventoData = this.eventoForm.value;
      this.eventoService.updateEvento(this.eventoSeleccionado.id, eventoData).subscribe({
        next: (updatedEvento) => {
          const index = this.eventos.findIndex(e => e.id === updatedEvento.id);
          if (index !== -1) {
            this.eventos[index] = updatedEvento;
          }
          this.showEditModal = false;
          this.editMode = false;
          this.eventoSeleccionado = null;
        },
        error: (error) => {
          this.error = 'No se pudo actualizar el evento.';
          console.error('Error:', error);
        }
      });
    }
  }

  onEditModalCancel() {
    this.showEditModal = false;
    this.eventoSeleccionado = null;
  }
} 