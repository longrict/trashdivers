import React, { useState, useEffect, useCallback } from 'react';
import {APIProvider,Map,useMap, AdvancedMarker,Pin} from "@vis.gl/react-google-maps";
import NewsletterModal from './test_modal/test.js';

const PoiMarkers = props => {
  const map = useMap()
  const [markers, setMarkers] = useState({})

  const [isNewsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [newsletterFormData, setNewsletterFormData] = useState(null);

  const handleOpenNewsletterModal = () => {
      console.log("test");
    setNewsletterModalOpen(true);
  };

  const handleCloseNewsletterModal = () => {
    setNewsletterModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    setNewsletterFormData(data);
    handleCloseNewsletterModal();
  };
    
  const handleClick = useCallback(ev => {
    if (!map) return
    if (!ev.latLng) return

    //console.log('marker clicked: ', ev.latLng.toString());
    handleOpenNewsletterModal()
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
	{newsletterFormData && newsletterFormData.email && (
        <div className="msg-box">
          <b>{newsletterFormData.email}</b> requested a{' '}
          <b>{newsletterFormData.digestType}</b> newsletter.
        </div>
      )}

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleCloseNewsletterModal}
      />
    </>
  )
}


function LoadMap() {
  const [locations, setLocations] = useState([])

  const onMapClick = (ev) => {
    setLocations([...locations, 
      { 
      key: ev.detail.latLng.lat.toString(),
      location: ev.detail.latLng
    }])
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

