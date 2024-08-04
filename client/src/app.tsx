/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState, useRef, useCallback } from "react"
import { createRoot } from "react-dom/client"

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps"

import { MarkerClusterer } from "@googlemaps/markerclusterer"

const App = () => {
  const [locations, setLocations] = useState([])

  const onMapClick = (ev) => {
    setLocations([...locations, 
      { 
      key: ev.detail.latLng.lat.toString(),
      location: ev.detail.latLng
    }])
  }
  
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_REACT_APP_SECRET_NAME}
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
  )
}

const PoiMarkers = props => {
  const map = useMap()
  const [markers, setMarkers] = useState({})

  const handleClick = useCallback(ev => {
    if (!map) return
    if (!ev.latLng) return

    //console.log('marker clicked: ', ev.latLng.toString());
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
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  )
}

export default App

const root = createRoot(document.getElementById("app"))
root.render(<App />)
