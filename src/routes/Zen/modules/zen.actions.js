/* @flow */
import { RxHttpRequest } from 'rx-http-request';

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
export function recieveZen (value: string): Action {
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

// export const fetchZen = (): Function => {
//   return (dispatch: Function): Promise => {
//     dispatch(requestZen())

//     return fetch('https://api.github.com/zen')
//       .then(data => data.text())
//       .then(text => dispatch(recieveZen(text)))
//   }
// }

export const fetchZenEpic = (action$) =>
  action$.ofType(REQUEST_ZEN)
    .switchMap(action =>
      RxHttpRequest.get('https://api.github.com/zen')
      // ajax.getJSON('https://api.github.com/zen')
        .map(data => data.text())
        .do(data => console.log(data))
        .map(recieveZen)
        .catch(() => console.log("ERROR IN FETCH"))
    )

export default {
  requestZen,
  recieveZen,
  fetchZenEpic,
  saveCurrentZen
}
