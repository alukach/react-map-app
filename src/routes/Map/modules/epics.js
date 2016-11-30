/* @flow */

import { EPIC_END } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import geolocation from './geolocation'
import {
  MAP_SEARCH, MAP_GET_CURRENT_POSITION, MAP_START_WATCH_POSITION, MAP_END_WATCH_POSITION,
  searchChoices, addPoint, rmPoint, getLocationComplete, MY_LOCATION_ID
} from './reducer'

export const searchMapEpic = (action$) =>
  action$.ofType(MAP_SEARCH)
    .debounceTime(400)
    .filter(action => Boolean(action.payload.value))
    .switchMap(action =>
      ajax({url: `http://livingcitymap.dev/api/wof/?q=${action.payload.value}`, responseType: 'json'})
        .pluck('response', 'features')
        .map(searchChoices)
    )
    .takeUntil(action$.ofType(EPIC_END))
    .catch(err => {
      console.warn("Failure in API request", err)
      return Observable.of()
    })

export const getLocationEpic = (action$) =>
  action$.ofType(MAP_GET_CURRENT_POSITION)
    .flatMap(action =>
      geolocation.currentPosition({enableHighAccuracy:true, maximumAge:30000, timeout:27000})
        .pluck('coords')
        .flatMap(coords =>
          Observable.merge(
            Observable.of(
              getLocationComplete(),
              addPoint(coords, MY_LOCATION_ID),
            ),
            ajax({
              url: `http://livingcitymap.dev/api/pip/?latitude=${coords.latitude}&longitude=${coords.longitude}`,
              responseType: 'json'
            })
              .pluck('response')
              .map(getLocationComplete)
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
            rmPoint(MY_LOCATION_ID)
          )
        })
    )
    .takeUntil(action$.ofType(EPIC_END))

export const watchPosition = (action$) =>
  action$.ofType(MAP_START_WATCH_POSITION)
    .switchMap(action =>
      geolocation.watchPosition({enableHighAccuracy:true, maximumAge:5000, timeout:27000})
        .do(console.log)
        .pluck('coords')
        .map(coords => addPoint(coords, MY_LOCATION_ID))
        .takeUntil(action$.ofType(MAP_END_WATCH_POSITION))
    )
    .takeUntil(action$.ofType(EPIC_END))
    .catch(err => {
      console.error("Failure in watchPosition pipe", err)
      return Observable.of()
    })

export default [
  searchMapEpic,
  getLocationEpic,
  watchPosition,
]