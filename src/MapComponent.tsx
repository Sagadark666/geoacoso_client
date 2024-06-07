import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  onMapClick: (lat: number, lng: number) => void;
  coordinates: Array<{ latitude: number; longitude: number }>;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick, coordinates }) => {
  const MapEvents = () => {
    useMapEvents({
      click: (e: any) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      },
    });
    return null;
  };

  const markers = useMemo(
    () =>
      coordinates.map((coord, index) => (
        <Marker key={index} position={new LatLng(coord.latitude, coord.longitude)} />
      )),
    [coordinates]
  );

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;
