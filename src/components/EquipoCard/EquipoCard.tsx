import React from 'react';
import './equipo-card.component.css';

export interface EquipoCardProps {
  equipo: {
    nombre: string;
    escudoUrl?: string;
    fondoUrl?: string;
  };
}

const EquipoCard: React.FC<EquipoCardProps> = ({ equipo }) => (
  <div className="equipo-card">
    <div className="card-fondo">
      {equipo.fondoUrl && (
        <img src={equipo.fondoUrl} alt="Fondo estadio" className="fondo-blur" />
      )}
    </div>
    <div className="card-nombre-escudo">
      <div className="card-nombre">
        <span className="equipo-nombre">{equipo.nombre}</span>
      </div>
      {equipo.escudoUrl && (
        <img className="equipo-escudo" src={equipo.escudoUrl} alt={`${equipo.nombre} escudo`} />
      )}
    </div>
  </div>
);

export default EquipoCard; 