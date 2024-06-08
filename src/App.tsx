import React from 'react';
import MapComponent from './components/MapComponent';
import { addCoordinate } from './db/model';
import './styles/App.css';

const App: React.FC = () => {
  const handleMapClick = async (lat: number, lng: number, showSuccess: (message: string) => void) => {
    await addCoordinate(lat, lng);
    showSuccess("¡Reporte guardado exitosamente!"); // Pass success message
  };

  return (
    <div className="app">
      <div className="app-name">GeoAcoso</div>
      <MapComponent onMapClick={handleMapClick} />
      <div className="map-attribution">
        <span className="organization-name">Your Organization Name</span>
      </div>
    </div>
  );
};

export default App;
