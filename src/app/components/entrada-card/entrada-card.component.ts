import { Component, Input } from '@angular/core';
import { GetEntradaDto } from '../../services/evento.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-entrada-card',
  templateUrl: './entrada-card.component.html',
  styleUrls: ['./entrada-card.component.css']
})
export class EntradaCardComponent {
  @Input() entrada!: GetEntradaDto;

  constructor(private sanitizer: DomSanitizer) {}

  getSafeQrUrl(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64);
  }
} 