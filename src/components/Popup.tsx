import React from "react";
import { LatLng } from "leaflet";
import { Popup as LeafletPopup } from "react-leaflet";
import "../styles/Popup.css";

interface PopupProps {
  position: LatLng;
  address: string;
  successMessage: string | null;
  errorMessage: string | null; // Add errorMessage to props
  onCancel: (e: React.MouseEvent) => void;
  onReport: () => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ position, address, successMessage, errorMessage, onCancel, onReport, onClose }) => {
  return (
    <LeafletPopup
      position={position}
      eventHandlers={{
        remove: onClose, // Call onClose when the popup is closed
      }}
    >
      <div className="popup-content">
        {successMessage ? (
          <div className="popup-success">
            <p>{successMessage}</p>
          </div>
        ) : errorMessage ? (
          <div className="popup-error">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <>
            <div className="popup-header">
              <span className="icon">📍</span>
              Realizar Reporte
            </div>
            <div className="popup-coordinates">
              <p><strong>Latitud:</strong> {position.lat.toPrecision(6)} <strong>Longitud:</strong> {position.lng.toPrecision(6)}</p>
            </div>
            <div className="popup-address">
              <p><strong>Dirección:</strong> {address}</p>
            </div>
            <div className="popup-buttons">
              <button onClick={onCancel} className="popup-button cancel">Cancelar</button>
              <button onClick={onReport} className="popup-button report">Reportar</button>
            </div>
          </>
        )}
      </div>
    </LeafletPopup>
  );
};

export default Popup;
