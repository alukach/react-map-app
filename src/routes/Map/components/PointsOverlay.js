import React, { Component } from 'react'
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react'
import config from 'react-map-gl/dist/config'
import { ClickablePointsOverlay } from './ClickablePointsOverlay'

export const PointsOverlay = (props) => {
  const renderPoint = (point) => (
    <circle
      r={5}
      onClick={ renderPopup }
      style={ {cursor: 'pointer'} }
    />
  )

  const renderPopup = console.log

  return (
    <ClickablePointsOverlay
      width={props.width}
      height={props.height}
      isDragging={props.isDragging}
      renderPoint={ renderPoint }
      onClick={ console.info }
      {...props}
    />
  )
}

PointsOverlay.propTypes = {
  points    : React.PropTypes.array.isRequired,
  width     : React.PropTypes.number.isRequired,
  height    : React.PropTypes.number.isRequired,
  longitude : React.PropTypes.number.isRequired,
  latitude  : React.PropTypes.number.isRequired,
  zoom      : React.PropTypes.number.isRequired,
  isDragging: React.PropTypes.bool.isRequired
}