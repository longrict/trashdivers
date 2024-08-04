import React, { useState, useEffect, useCallback } from 'react';
import {APIProvider,Map,useMap, AdvancedMarker,Pin} from "@vis.gl/react-google-maps";
import MarkerModal from './components/marker_modal/marker_modal.js';

const PoiMarkers = props => {
  const map = useMap()
  const [markers, setMarkers] = useState({})

  const [isMarkerModalOpen, setMarkerModalOpen] = useState(false);
  const [markerFormData, setMarkerFormData] = useState(null);

  const handleOpenMarkerModal = () => {
    setMarkerModalOpen(true);
  };

  const handleCloseMarkerModal = () => {
    setMarkerModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    setMarkerFormData(data);
    console.log(markerFormData);
    handleCloseMarkerModal();
  };
    
  const handleClick = useCallback(ev => {
    if (!map) return
    if (!ev.latLng) return
    if (markerFormData) console.log(markerFormData)
    //console.log('marker clicked: ', ev.latLng.toString());
    handleOpenMarkerModal()
    map.panTo(ev.latLng)
  })

  console.log(props)
  console.log(props.pois)

  return (
    <>
      {props.pois.map(poi => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          onClick={handleClick}
	  title='Trash'
        >
	<img src="/images/trash-can-svgrepo-com.svg" width={32} height={32}/>
        </AdvancedMarker>
      ))}
	{markerFormData && markerFormData.notes && (
        <div className="msg-box">
          <b>{markerFormData.notes}</b> requested a{' '}
          <b>{markerFormData.garbageType}</b> newsletter.
        </div>
      )}

      <MarkerModal
        isOpen={isMarkerModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleCloseMarkerModal}
      />
    </>
  )
}


function LoadMap() {
  const [locations, setLocations] = useState([])

  const onMapClick = (ev) => {
    const latLng = ev.detail.latLng
    const existingLocation = locations.find((location) => location.key === latLng.lat.toString())
    if (!existingLocation) {
      setLocations([...locations, 
      { 
        key: latLng.lat.toString(),
        location: latLng
      }])
    }
  }
  
  return (
    <div style={{height:"90vh"}}>
      <APIProvider
        apiKey= {process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged= {ev =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
          mapId="da37f3254c6a6d1c"
          onClick={onMapClick}
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
    </div>
  )
}

export {LoadMap};
