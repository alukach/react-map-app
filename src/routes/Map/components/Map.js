import React from 'react'
import Helmet from 'react-helmet'
import MapGL from 'react-map-gl'
import Dimensions from 'react-dimensions'
import MapCard from './MapCard'
import { PointsOverlay } from './PointsOverlay'
import './Map.scss'

export const MapView = (props) => (
  <div>
    <Helmet
      title="Map"
    />
    <MapCard
      {...props}
    />
    <MapGL
      mapboxApiAccessToken={props.mapboxApiToken}
      attributionControl={true}
      onChangeViewport={props.onChangeViewport}
      width={props.containerWidth}
      height={props.containerHeight}
      {...props.viewport}
      {...props.viewportMeta}
    >
      <PointsOverlay
        points={props.points}
        width={props.containerWidth}
        height={props.containerHeight}
        {...props.viewport}
      />
    </MapGL>
  </div>
)

export default Dimensions()(MapView)
