import React from 'react';
import './evento-card.component.css';

export interface EventoCardProps {
  evento: {
    nombre: string;
    escudo1Url?: string;
    escudo2Url?: string;
    equipo1: { nombre: string };
    equipo2: { nombre: string };
  };
}

const EventoCard: React.FC<EventoCardProps> = ({ evento }) => (
  <div className="evento-card">
    <div className="evento-nombre">{evento.nombre}</div>
    <div className="evento-escudos">
      {evento.escudo1Url && (
        <img src={evento.escudo1Url} alt={`${evento.equipo1.nombre} escudo`} className="evento-escudo" />
      )}
      <span className="evento-vs">vs</span>
      {evento.escudo2Url && (
        <img src={evento.escudo2Url} alt={`${evento.equipo2.nombre} escudo`} className="evento-escudo" />
      )}
    </div>
  </div>
);

export default EventoCard; 