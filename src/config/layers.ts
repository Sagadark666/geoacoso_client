// OpenStreetMap standard layer
const streets = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  options: {
    attribution: '© OpenStreetMap contributors'
  }
};

// Esri World Imagery
const satellite = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  options: {
    attribution: 'Tiles © Esri'
  }
};

export { streets, satellite };
