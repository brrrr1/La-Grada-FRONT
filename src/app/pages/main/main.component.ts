import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EquipoService, Equipo } from '../../services/equipo.service';

interface EquipoCard extends Equipo {
  escudoUrl?: string;
  fondoUrl?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  equipos: EquipoCard[] = [];
  loading = true;
  errorMsg = '';

  constructor(public auth: AuthService, private equipoService: EquipoService) {}

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
}
