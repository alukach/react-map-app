/* @flow */
import { EPIC_END } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import geolocation from './geolocation'
import {
  MAP_SEARCH, MAP_GET_CURRENT_POSITION, searchChoices, addPoint,
  rmPoint, getLocationComplete
} from './reducer'

const myLocationID = "my-location"

export const searchMapEpic = (action$) =>
  action$.ofType(MAP_SEARCH)
    .debounceTime(400)
    .filter(action => Boolean(action.payload.value))
    .switchMap(action =>
      ajax({url: `/api/wof/?q=${action.payload.value}`, responseType: 'json'})
        .map(resp => resp.response.features)
        .map(searchChoices)
    )
    .catch(err => {
      console.warn("Failure in API request", err)
      return Observable.of()
    })

export const getLocationEpic = (action$) =>
  action$.ofType(MAP_GET_CURRENT_POSITION)
    .flatMap(action =>
      geolocation.currentPosition({enableHighAccuracy:true, maximumAge:30000, timeout:27000})
        .map(pos => pos.coords)
        .flatMap(coords =>
          Observable.of(
            addPoint(coords, myLocationID),
            getLocationComplete()
          )
        )
        .catch(err => {
          let message
          switch (err.code) {
            case undefined:
              message = err
              break;
            case err.PERMISSION_DENIED:
              message = 'Permission denied';
              break;
            case err.POSITION_UNAVAILABLE:
              message = 'Position unavailable';
              break;
            case err.PERMISSION_DENIED_TIMEOUT:
              message = 'Position timeout';
              break;
          }
          console.warn(message, err)
          return Observable.of(
            getLocationComplete(),
            rmPoint(myLocationID)
          )
        })
    )

export default [
  searchMapEpic,
  getLocationEpic
]