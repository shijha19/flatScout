import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const center = [21.1458, 79.0882]; // India center


const locations = [
  { name: 'NIT Raipur', position: [21.2497, 81.6051], isNit: true },
  { name: 'Hostel A (Near NIT)', position: [21.2502, 81.6060] },
  { name: 'Hostel B (Near NIT)', position: [21.2490, 81.6045] },
  { name: 'Hostel C (Near NIT)', position: [21.2505, 81.6070] },
  { name: 'Hostel D (Near NIT)', position: [21.2485, 81.6055] }
];

const MapComponent = () => {
  return (
    <MapContainer center={[21.2514, 81.6296]} zoom={13} style={{ width: '100%', height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={loc.position}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
