import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, LayersControl, useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { streets, satellite } from "../config/layers";
import Popup from "./Popup";
import "../styles/Map.css";

interface MapProps {
  onMapClick: (lat: number, lng: number, showSuccess: (message: string) => void) => Promise<void>;
}

const Map: React.FC<MapProps> = ({ onMapClick }) => {
  const [popupPosition, setPopupPosition] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("Obteniendo dirección...");
  const [shouldResetMap, setShouldResetMap] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initialCenter: LatLng = new LatLng(5.3328378, -72.4116007);
  const initialZoom: number = 14;

  const getAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || "Dirección no encontrada";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error obteniendo la dirección";
    }
  };

  useEffect(() => {
    if (popupPosition) {
      getAddress(popupPosition.lat, popupPosition.lng).then(setAddress);
    }
  }, [popupPosition]);

  const MapEvents = () => {
    useMapEvents({
      click: async (e) => {
        if (!popupPosition) {
          const { lat, lng } = e.latlng;
          setPopupPosition(new LatLng(lat, lng));
          setAddress("Obteniendo dirección...");
          setSuccessMessage(null);
          setErrorMessage(null);

          const fetchedAddress = await getAddress(lat, lng);
          setAddress(fetchedAddress);
        }
      },
    });
    return null;
  };

  const ResetMapComponent: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      if (shouldResetMap) {
        map.flyTo(initialCenter, initialZoom, {
          animate: true,
          duration: 1.5,
        });
        setPopupPosition(null);
        setShouldResetMap(false);
      }
    }, [shouldResetMap, map]);

    return null;
  };

  const handleReport = useCallback(async () => {
    if (popupPosition) {
      try {
        await onMapClick(popupPosition.lat, popupPosition.lng, (message) => {
          setSuccessMessage(message);
          setTimeout(() => {
            setSuccessMessage(null);
            setPopupPosition(null);
            setShouldResetMap(true);
          }, 2000);
        });
      } catch (error) {
        console.error('Error during report:', error);
        setErrorMessage('Error al guardar el reporte. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  }, [onMapClick, popupPosition]);

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopupPosition(null);
  };

  const handlePopupClose = () => {
    setPopupPosition(null);
  };

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: "100%", width: "100%" }}
      className="map-container"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Calles">
          <TileLayer url={streets.url} {...streets.options} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite">
          <TileLayer url={satellite.url} {...satellite.options} />
        </LayersControl.BaseLayer>
      </LayersControl>
      <MapEvents />
      {popupPosition && (
        <Popup
          position={popupPosition}
          address={address}
          successMessage={successMessage}
          errorMessage={errorMessage} // Pass error message to Popup
          onCancel={handleCancel}
          onReport={handleReport}
          onClose={handlePopupClose}
        />
      )}
      <ResetMapComponent />
    </MapContainer>
  );
};

export default Map;
