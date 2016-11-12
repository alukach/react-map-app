/* @flow */

import { EPIC_END } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { race } from 'rxjs/add/operator/race';
import { MAP_SEARCH, MAP_CHANGE_VIEWPORT, MAP_SEARCH_CHOICES, searchChoices } from './actions'

const MAP_ACTION_HANDLERS = {
  [MAP_CHANGE_VIEWPORT]: (state, {type, payload}) => {
    return ({
      ...state,
      viewport: payload
    })
  },
  [MAP_SEARCH_CHOICES]: (state, {type, payload}) => {
    return ({
      ...state,
      searchChoices: payload
    })
  }
}

export const searchMapEpic = (action$) =>
  action$.ofType(MAP_SEARCH)
    // .takeUntil(action$.ofType(EPIC_END))
    .debounceTime(400)
    .do(console.log)
    .filter(action => Boolean(action.payload.value))
    .switchMap(action =>
      ajax({url: `/api/wof/?q=${action.payload.value}`, responseType: 'json'})
        .map(resp => resp.response.features)
        .do(console.log)
        .map(searchChoices)
        .catch((err) => console.log("ERROR IN FETCH", err))
    )

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  searchChoices: [],
  viewport: {
    latitude: 37.78,
    longitude: -122.45,
    zoom: 11,
    width: 800,
    height: 800,
    startDragLngLat: null,
    isDragging: null
  }
}

export default function mapReducer (state = initialState, action: Action) {
  const handler = MAP_ACTION_HANDLERS[action.type]

  // TODO: Should we just pass 'action.payload' instead of 'action'
  return handler ? handler(state, action) : state
}