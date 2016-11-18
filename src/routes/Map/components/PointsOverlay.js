import React, { Component } from 'react';
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react';

class PointsOverlay extends Component {
  // https://github.com/vicapow/react-map-gl-example-overlay/blob/master/src/overlay.react.js
  // https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/

  static propTypes = {
    locations : React.PropTypes.array.isRequired,
    width     : React.PropTypes.number.isRequired,
    height    : React.PropTypes.number.isRequired,
    longitude : React.PropTypes.number.isRequired,
    latitude  : React.PropTypes.number.isRequired,
    zoom      : React.PropTypes.number.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  }

  drawPoints = ({ project }) => (
    this.props.locations.map(location => {
      const pixel = project([location.longitude, location.latitude]);
      return (
        <g style={ {cursor: 'pointer'} }>
          <circle
            cx={pixel[0]}
            cy={pixel[1]}
            r={5}
          />
        </g>
      )
    })
  )

  render = () => (
    <SVGOverlay
      width={this.props.width}
      height={this.props.height}
      isDragging={this.props.isDragging}
      redraw={this.drawPoints.bind(this)}
      {...this.props}
    />
  )
}

export default PointsOverlay