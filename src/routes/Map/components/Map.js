import React from 'react'
import Helmet from "react-helmet"
import MapGL from 'react-map-gl'
import config from 'config'
import './Map.scss'

export const MapView = () => {
  let viewport = {
    height: 900, // TODO: How to do full height?
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
