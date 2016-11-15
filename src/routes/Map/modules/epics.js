/* @flow */
import { EPIC_END } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { race } from 'rxjs/add/operator/race';
import { MAP_SEARCH, MAP_GET_CURRENT_POSITION, searchChoices, centerOn } from './reducer'

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

class CurrentPositionObservable extends Observable {
  constructor(options) {
    super();

    this.options = options;
  }

  _subscribe(observer) {
    window.navigator.geolocation.getCurrentPosition(
      data => {
        observer.next(data);
        observer.complete();
      },
      e => observer.error(e),
      this.options
    );
  }
}

const geolocation = {
  currentPosition: options => new CurrentPositionObservable(options)
};

export const getLocationEpic = (action$) =>
  action$.ofType(MAP_GET_CURRENT_POSITION)
    .switchMap(action =>
      geolocation.currentPosition({enableHighAccuracy:true, maximumAge:30000, timeout:27000})
        .map(pos => pos.coords)
        .map(centerOn)
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