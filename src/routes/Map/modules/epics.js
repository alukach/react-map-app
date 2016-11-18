/* @flow */
import { EPIC_END } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { race } from 'rxjs/add/operator/race';
import { MAP_SEARCH, MAP_GET_CURRENT_POSITION, searchChoices, addPoint } from './reducer'
import geolocation from './geolocation'

export const searchMapEpic = (action$) =>
  action$.ofType(MAP_SEARCH)
    // .takeUntil(action$.ofType(EPIC_END))
    .debounceTime(400)
    .filter(action => Boolean(action.payload.value))
    .switchMap(action =>
      ajax({url: `/api/wof/?q=${action.payload.value}`, responseType: 'json'})
        .map(resp => resp.response.features)
        .map(searchChoices)
        .catch((err) => console.log("ERROR IN FETCH", err))
    )

export const getLocationEpic = (action$) =>
  action$.ofType(MAP_GET_CURRENT_POSITION)
    .switchMap(action =>
      geolocation.currentPosition({enableHighAccuracy:true, maximumAge:30000, timeout:27000})
        .map(pos => pos.coords)
        .map(coords => addPoint(coords, 'my-location'))
        // TODO: Also emit MAP_GET_CURRENT_POSITION_COMPLETE
        .catch((err) => {
          let message
          switch (err.code) {
            case undefined:
              message = err
              console.warn(err)
              break;
            case err.PERMISSION_DENIED:
              message = 'Permission denied';
              console.warn(message)
              break;
            case err.POSITION_UNAVAILABLE:
              message = 'Position unavailable';
              console.warn(message)
              break;
            case err.PERMISSION_DENIED_TIMEOUT:
              message = 'Position timeout';
              console.warn(message)
              break;
          }
        })
    )

export default [
  searchMapEpic,
  getLocationEpic
]