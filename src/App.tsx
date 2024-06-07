// src/App.tsx
import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import { addCoordinate, getCoordinates } from './db/model';
import {Coordinate} from "./types/coordinates";

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = async () => {
    setLoading(true);
    const coords = await getCoordinates();
    setCoordinates(coords);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const handleMapClick = async (lat: number, lng: number) => {
    await addCoordinate(lat, lng);
    // Fetch only the newly added coordinate if possible
    const newCoordinates = await getCoordinates(); // Adjust this to fetch only the new entry
    setCoordinates(prevCoords => [...prevCoords, ...newCoordinates]);
  };


  return (
    <div>
      <h1>Map Project</h1>
      {loading && <p>Loading...</p>}
      <MapComponent onMapClick={handleMapClick} coordinates={coordinates} />
      <ul>
        {coordinates.map((coord) => (
          <li key={coord.id}>
            {`Latitude: ${coord.latitude}, Longitude: ${coord.longitude}, Captured at: ${new Date(coord.captured_at).toLocaleString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
