import React from 'react'
import Helmet from 'react-helmet'
import MapGL from 'react-map-gl'
import Dimensions from 'react-dimensions'
import MapCard from './MapCard'
import './Map.scss'

export const MapView = (props) => (
  <div>
    <Helmet
      title="Map"
    />
    <MapCard
      searchChoices={props.searchChoices}
      viewport={props.viewport}
      getLocation={props.getLocation}
      fetchingPosition={props.fetchingPosition}
    />
    <MapGL
      mapboxApiAccessToken={props.mapboxApiToken}
      attributionControl={true}
      onChangeViewport={props.onChangeViewport}
      width={props.containerWidth}
      height={props.containerHeight}
      {...props.viewport}
      {...props.viewportMeta}
    />
  </div>
)

export default Dimensions()(MapView)
