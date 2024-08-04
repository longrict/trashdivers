import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
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
lat: 37.774546,
lng: -122.433523
};

function Heated() {
    const [points, setPoints] = useState([]);
    useEffect(() => {
        fetch(
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json"
        )
        .then((res) => res.json())
        .then((data) => {
            setPoints(data.map(({ COORDINATES: [lng, lat] }) => ({ lat, lng })));
        });
    }, []);
    return (
    // <div style={{ height: "90vh" }}>
    //   <LoadScript
    //     googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    //     libraries={['visualization']}
    //   >
    //     <GoogleMap
    //       mapContainerStyle={mapContainerStyle}
    //       center={center}
    //       zoom={13}
    //       onLoad={map => setMap(map)}
    //       mapTypeId="satellite"
    //     >
    //       {map && (
    //         <HeatmapLayer
    //           data={heatmapData.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
    //         />
    //       )}
    //     </GoogleMap>
    //   </LoadScript>
    // </div>
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