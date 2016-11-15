/* @flow */

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_SEARCH = 'MAP_SEARCH'
export const MAP_SEARCH_CHOICES = 'MAP_SEARCH_CHOICES'
export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'
export const MAP_GET_CURRENT_POSITION = 'MAP_GET_CURRENT_POSITION'
export const MAP_SET_CENTER = 'MAP_SET_CENTER'

// ------------------------------------
// Actions Helpers
// ------------------------------------
export function searchMap (value: string): Action {
  return {
    type: MAP_SEARCH,
    payload: {
      value,
    }
  }
}
export function searchChoices (value: Array<any>): Action {
  return {
    type: MAP_SEARCH_CHOICES,
    payload: value
  }
}
export function changeViewport (viewport): Action {
  return {
    type: MAP_CHANGE_VIEWPORT,
    payload: viewport
  }
}
export function getLocation (event): Action {
  return {
    type: MAP_GET_CURRENT_POSITION,
  }
}
export function centerOn (coordinates): Action {
  return {
    type: MAP_SET_CENTER,
    payload: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const MAP_ACTION_HANDLERS = {
  [MAP_CHANGE_VIEWPORT]: (state, {type, payload}) => ({
    ...state,
    viewport: payload
  }),
  [MAP_SEARCH_CHOICES]: (state, {type, payload}) => ({
    ...state,
    searchChoices: payload
  }),
  [MAP_GET_CURRENT_POSITION]: (state, payload) => ({
    ...state,
    fetchingPosition: true
  }),
  [MAP_SET_CENTER]: (state, {type, payload}) => ({
    ...state,
    viewport: Object.assign({}, state.viewport, payload),
    fetchingPosition: false
  }),
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  searchChoices: [],
  viewportMeta: {
    attributionControl: true
  },
  viewport: {
    latitude: 45.55,
    longitude: -122.68,
    zoom: 11,
  },
  fetchingPosition: false,
}

export default function mapReducer (state = initialState, action: Action) {
  const handler = MAP_ACTION_HANDLERS[action.type]

  // TODO: Should we just pass 'action.payload' instead of 'action'
  return handler ? handler(state, action) : state
}