import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../../../services/equipo.service';
import { Equipo } from '../../../../models/equipo.model';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.css']
})
export class EquiposAdminComponent implements OnInit {
  equipos: Equipo[] = [];
  loading: boolean = true;
  error: string | null = null;

  deleteMode: boolean = false;
  equipoSeleccionado: Equipo | null = null;
  showDeleteModal: boolean = false;

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading = true;
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los equipos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onEliminarClick() {
    this.deleteMode = !this.deleteMode;
    if (!this.deleteMode) {
      this.equipoSeleccionado = null;
    }
  }

  seleccionarEquipo(equipo: Equipo) {
    if (this.deleteMode) {
      this.equipoSeleccionado = equipo;
      this.showDeleteModal = true;
    }
  }

  isEquipoSeleccionado(equipo: Equipo): boolean {
    return this.equipoSeleccionado?.id === equipo.id;
  }

  onDeleteModalConfirm() {
    // Aquí irá la lógica de eliminación real
    this.showDeleteModal = false;
    this.deleteMode = false;
    this.equipoSeleccionado = null;
  }

  onDeleteModalCancel() {
    this.showDeleteModal = false;
    this.equipoSeleccionado = null;
  }
} 