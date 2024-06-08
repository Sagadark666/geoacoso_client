import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Popup, LayersControl, useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { streets, satellite } from "../config/layers";
import "../styles/Popup.css";

interface MapComponentProps {
  onMapClick: (lat: number, lng: number, showSuccess: (message: string) => void) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick }) => {
  const [popupPosition, setPopupPosition] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("Obteniendo dirección...");
  const [shouldResetMap, setShouldResetMap] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      click: async (e: any) => {
        // Only set a new popup position if it is currently null
        if (!popupPosition) {
          const { lat, lng } = e.latlng;
          setPopupPosition(new LatLng(lat, lng));
          setAddress("Obteniendo dirección...");
          setSuccessMessage(null); // Clear any previous success message

          // Fetch address asynchronously
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
          duration: 1.5, // Adjust the duration for the smoothness you want
        });
        setPopupPosition(null); // Remove popup
        setShouldResetMap(false); // Reset the trigger
      }
    }, [shouldResetMap, map]);

    return null;
  };

  const handleReport = useCallback(() => {
    if (popupPosition) {
      onMapClick(popupPosition.lat, popupPosition.lng, (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
          setSuccessMessage(null);
          setPopupPosition(null);
          setShouldResetMap(true); // Trigger map reset
        }, 2000); // Adjust the time as needed
      });
    }
  }, [onMapClick, popupPosition]);

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent map click from being triggered
    setPopupPosition(null);
  };

  const popupContent = (
    <div className="popup-content">
      {successMessage ? (
        <div className="popup-success">
          <p>{successMessage}</p>
        </div>
      ) : (
        <>
          <div className="popup-header">
            <span className="icon">📍</span> {/* Use any suitable icon */}
            Realizar Reporte
          </div>
          {popupPosition && (
            <>
              <div className="popup-coordinates">
                <p><strong>Latitud:</strong> {popupPosition.lat.toPrecision(6)} <strong>Longitud:</strong> {popupPosition.lng.toPrecision(6)}</p>
              </div>
              <div className="popup-address">
                <p><strong>Dirección:</strong> {address}</p>
              </div>
              <div className="popup-buttons">
                <button onClick={handleCancel} className="popup-button cancel">Cancelar</button>
                <button onClick={handleReport} className="popup-button report">Reportar</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

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
          eventHandlers={{
            remove: () => setPopupPosition(null), // This handles the popup close event
          }}
        >
          {popupContent}
        </Popup>
      )}
      <ResetMapComponent /> {/* Include the reset component */}
    </MapContainer>
  );
};

export default MapComponent;
