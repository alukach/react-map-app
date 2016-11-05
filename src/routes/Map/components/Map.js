import React from 'react'
import Helmet from "react-helmet"
import MapGL from 'react-map-gl'
import config from 'config'


export const MapView = () => {
  let viewport = {
    width: 700,
    height: 450,
    latitude: 37.78,
    longitude: -122.45,
    zoom: 11,
    startDragLngLat: null,
    isDragging: false
  };

  return (
  <div>
    <Helmet
      title="Map"
    />
    <h4>Map!</h4>
    <MapGL
      {...viewport}
      mapboxApiAccessToken={config.mapboxApiToken}
      onChangeViewport={(viewport) => {
        const {latitude, longitude, zoom} = viewport;
        // Optionally call `setState` and use the state to update the map.
      }}
    />
  </div>
)}

export default MapView
