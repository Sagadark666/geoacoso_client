import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/404.css'; // Import specific styles for the 404 page

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <img 
        src="/logo192.png" 
        srcSet="/logo192.png 192w, /logo512.png 512w"
        sizes="(max-width: 600px) 192px, 512px"
        alt="404 Not Found" 
        className="not-found-image" 
      />
      <h1>Oops! Página no encontrada</h1>
      <p>Lo sentimos, pero la página que buscas no existe.</p>
      <Link to="/reportar" className="not-found-link">
        Ir a la página de reportes
      </Link>
    </div>
  );
};

export default NotFound;
