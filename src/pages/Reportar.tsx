import React from 'react';
import Map from '../components/Map';
import { addCoordinate } from '../db/model';
import '../styles/Reportar.css';

const Reportar: React.FC = () => {
  const handleMapClick = async (lat: number, lng: number, showSuccess: (message: string) => void): Promise<void> => {
    try {
      await addCoordinate(lat, lng);
      showSuccess("¡Reporte guardado exitosamente!");
    } catch (error) {
      throw error; // Ensure this returns a rejected Promise
    }
  };

  return (
    <div className="reportar">
      <div className="app-name">GeoAcoso - Reportar</div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Map onMapClick={handleMapClick} />
      </React.Suspense>
      <div className="map-attribution">
        <span className="organization-name">Colectivo Las Polas</span>
      </div>
    </div>
  );
};

export default Reportar;
