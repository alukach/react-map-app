/* @flow */
import { ajax } from 'rxjs/observable/dom/ajax';
import { LOCATION_CHANGE } from 'store/location';

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ZEN = 'REQUEST_ZEN'
export const RECIEVE_ZEN = 'RECIEVE_ZEN'
export const SAVE_CURRENT_ZEN = 'SAVE_CURRENT_ZEN'

// ------------------------------------
// Actions
// ------------------------------------

export function requestZen (): Action {
  return {
    type: REQUEST_ZEN
  }
}

let availableId = 0
export function receiveZen (value: string): Action {
  return {
    type: RECIEVE_ZEN,
    payload: {
      value,
      id: availableId++
    }
  }
}

export function saveCurrentZen (): Action {
  return {
    type: SAVE_CURRENT_ZEN
  }
}

export const fetchZenEpic = (action$) =>
  action$.ofType(REQUEST_ZEN)
    .switchMap(action =>
      ajax({url: 'https://api.github.com/zen', withCredentials: false, responseType: 'text'})
        .map(resp => resp.response)
        .map(receiveZen)
        .catch(() => console.log("ERROR IN FETCH"))
    )

export default {
  requestZen,
  receiveZen,
  saveCurrentZen,
  fetchZenEpic,
}
