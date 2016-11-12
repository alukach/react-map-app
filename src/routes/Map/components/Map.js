import React from 'react'
import Helmet from 'react-helmet'
import MapGL from 'react-map-gl'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import './Map.scss'

export const MapView = ({viewport, mapboxApiToken, searchChoices, onChangeSearch, onChangeViewport}) => {
  return (
    <div>
      <Helmet
        title="Map"
      />
      <Card>
        <CardHeader
          title="Search"
          subtitle="Find a place"
        />
        <CardActions>
          <AutoComplete
            hintText="eg Shorty's Seattle"
            floatingLabelText="Search"
            onUpdateInput={onChangeSearch}
            dataSource={searchChoices}
            filter={(searchText: string, key: string) => true}
          />
        </CardActions>
      </Card>
      <MapGL
        mapboxApiAccessToken={mapboxApiToken}
        height={900} // TODO How to do full height?
        width='100%'
        onChangeViewport={onChangeViewport}
        {...viewport}
      />
    </div>
  )
}

export default MapView
