import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';

export const MapCard = ({onChangeSearch, searchChoices, viewport, getLocation, fetchingPosition}) => (
  <Card id="search-card">
    <CardHeader
      title="Search"
      subtitle="Find a place"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText
      expandable={true}>
      <button onClick={getLocation}>
        Get Location
      </button>
      {fetchingPosition ? <b>FETCHING</b> : null}
      <br />
      <AutoComplete
        hintText="eg Shorty's Seattle"
        floatingLabelText="Search"
        onUpdateInput={onChangeSearch}
        dataSource={searchChoices}
        filter={(searchText: string, key: string) => true}
      />
      <br />
      <code>
        {viewport.latitude}, {viewport.longitude}
      </code>
    </CardText>
  </Card>
)

export default MapCard