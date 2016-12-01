import React, { Component, PropTypes } from 'react'
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react'
import MapGL from 'react-map-gl'
import config from 'react-map-gl/dist/config'
import { ClickablePointsOverlay } from './ClickablePointsOverlay'

export const Map = (props) => {
  const {
    viewport, viewportMeta, mapboxApiToken, onChangeViewport,
    containerHeight, containerWidth, points } = props

  const renderPopup = console.log
  const renderPoint = (point) => (
    <circle
      r={5}
      onClick={renderPopup}
      style={ {cursor: 'pointer'} }
    />
  )

  return (
    <MapGL
      {...viewport}
      {...viewportMeta}
      mapboxApiAccessToken={mapboxApiToken}
      onChangeViewport={onChangeViewport}
      height={containerHeight}
      width={containerWidth}
    >
      <ClickablePointsOverlay  // TODO: Show grabbed hand when dragging
        {...viewport}
        points={points}
        width={containerWidth}
        height={containerHeight}
        renderPoint={renderPoint}
      />
    </MapGL>
  )
}

Map.propTypes = {
  points          : PropTypes.array.isRequired,
  mapboxApiToken  : PropTypes.string.isRequired,
  onChangeViewport: PropTypes.func.isRequired,
  containerWidth  : PropTypes.number.isRequired,
  containerHeight : PropTypes.number.isRequired,
  viewport        : PropTypes.object.isRequired, // TODO: Describe shape
  viewportMeta    : PropTypes.object.isRequired, // TODO: Describe shape
}