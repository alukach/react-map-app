import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import MdLocationSearching from 'react-icons/lib/md/location-searching';

export const MapCard = ({onChangeSearch, searchChoices, getLocation, gettingLocation, watchLocation, watchingLocation}) => (
  <Card id="search-card">
    <CardHeader
      title="MapCard"
      subtitle="Things that control the map"
      actAsExpander={false}
      showExpandableButton={false}
    />
    <CardText
      expandable={false}>
      <AutoComplete
        hintText="eg Shorty's Seattle"
        floatingLabelText="Search"
        onUpdateInput={onChangeSearch}
        dataSource={searchChoices}
        filter={(searchText: string, key: string) => true}
      />
      <br />
      <br />
      <RaisedButton
        label={<span><MdLocationSearching /> {gettingLocation ? "Getting Location" : "Get Location"}</span>}
        onClick={getLocation}
        disabled={gettingLocation}
      />
      <br />
      <Checkbox
        label="Watch location"
        checked={watchingLocation}
        onCheck={e => watchLocation(e.target.checked)}
      />
    </CardText>
  </Card>
)

export default MapCard