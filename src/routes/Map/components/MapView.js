import React from 'react'
import Helmet from 'react-helmet'
import Dimensions from 'react-dimensions'
import MapCard from './MapCard'
import { Map } from './Map'
import './MapView.scss'

export const MapView = (props) => (
  <div>
    <Helmet
      title="Map"
    />
    <MapCard
      {...props}
    />
    <Map
      {...props}
    />

  </div>
)

export default Dimensions()(MapView)
