import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import config from 'react-map-gl/dist/config'
import transform from 'svg-transform';
import ViewportMercator from 'viewport-mercator-project';

export const ClickablePointsOverlay = (props) => {
  const {points, width, height, style, lngLatAccessor, isDragging} = props;
  const mercator = ViewportMercator(props);

  return (
    <svg
      width={ width }
      height={ height }
      style={ {
        pointerEvents: 'all',
        position: 'absolute',
        left: 0,
        top: 0,
        cursor: isDragging ? config.CURSOR.GRABBING : config.CURSOR.GRAB,
        ...style
      } }
    >
      {
        points.map((point, index) => {
          const pixel = mercator.project(lngLatAccessor(point));
          return (
            <g
              key={ index }
              style={ {pointerEvents: 'all'} }
              transform={ transform([{translate: pixel}]) } // This positions point
            >
              { props.renderPoint(point, pixel) }
            </g>
          );
        })
      }
    </svg>
  );
}

ClickablePointsOverlay.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  style: PropTypes.object,
  points: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  lngLatAccessor: PropTypes.func.isRequired,
};
ClickablePointsOverlay.defaultProps = {
  lngLatAccessor(point) {
    return [
      point.longitude,
      point.latitude,
    ];
  },
};;