import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 21.1458, // default location (India center)
  lng: 79.0882
};

const MapComponent = ({ listings = [] }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {listings.map((listing, index) => (
          <Marker
            key={index}
            position={{ lat: listing.latitude, lng: listing.longitude }}
            title={listing.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
