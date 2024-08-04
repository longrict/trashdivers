import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import axios from 'axios';
const API_KEY =window.GOOGLE_MAPS_API_KEY ?? (process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const Heatmap = ({ data }) => {
    const map = useMap();
    const visualization = useMapsLibrary("visualization");
  
    const heatmap = useMemo(() => {
      if (!visualization) return null;
  
      return new window.google.maps.visualization.HeatmapLayer({
        radius: 10,
        opacity: 0.6,
      });
    }, [visualization]);
  
    useEffect(() => {
      if (!heatmap) return;
  
      heatmap.setData(data.map((p) => new window.google.maps.LatLng(p.lat, p.lng)));
    }, [heatmap, data]);
  
    useEffect(() => {
      if (!heatmap) return;
  
      heatmap.setMap(map);
    }, [heatmap, map]);
  
    return null;
  };
        
const mapContainerStyle = {
height: "90vh",
width: "100%"
};

const center = {
lat: 37.774546,
lng: -122.433523
};

function Heated() {
    const [points, setPoints] = useState([]);
    useEffect(() => {
      axios.post('http://localhost:8081/get-locations', {})
        .then(response => {
          setPoints(response.data.map(({ lat, lng }) => ({ lat, lng })));
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
        });
    }, []);
    
    return (

    <div style={{ height: "90vh" }}>
        <APIProvider
            apiKey={API_KEY}
            onLoad={() => console.log("Maps API has loaded.")}
        >
        <Map
            mapContainerStyle={mapContainerStyle}
                defaultcenter={center}
                defaultzoom={13}
                disableDefaultUI={true}

        >
            <Heatmap data={points} />
        </Map>
        </APIProvider>
    </div>
  );
};

export { Heated };