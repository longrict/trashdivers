import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

function Heated() {
  const [map, setMap] = useState(null);

  const heatmapData = [
    { lat: 37.782, lng: -122.447 },
    { lat: 37.782, lng: -122.445 },
    { lat: 37.782, lng: -122.443 },
    { lat: 37.782, lng: -122.441 },
    { lat: 37.782, lng: -122.439 },
    { lat: 37.782, lng: -122.437 },
    { lat: 37.782, lng: -122.435 },
    { lat: 37.785, lng: -122.447 },
    { lat: 37.785, lng: -122.445 },
    { lat: 37.785, lng: -122.443 },
    { lat: 37.785, lng: -122.441 },
    { lat: 37.785, lng: -122.439 },
    { lat: 37.785, lng: -122.437 },
    { lat: 37.785, lng: -122.435 }
  ];

  const mapContainerStyle = {
    height: "90vh",
    width: "100%"
  };

  const center = {
    lat: -33.860664,
    lng: 151.208138
  };

  return (
    <div>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries={['visualization']}>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onLoad={map => setMap(map)}
            mapTypeId="satellite"
        >
            {map && (
            <HeatmapLayer
                data={heatmapData.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
            />
            )}
        </GoogleMap>
        </LoadScript>
    </div>
  );
};

export {Heated};