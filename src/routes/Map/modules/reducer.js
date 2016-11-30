/* @flow */
import { REHYDRATE } from 'redux-persist/constants'

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_SEARCH = 'MAP_SEARCH'
export const MAP_SEARCH_CHOICES = 'MAP_SEARCH_CHOICES'
export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'
export const MAP_GET_CURRENT_POSITION = 'MAP_GET_CURRENT_POSITION'
export const MAP_GET_CURRENT_POSITION_COMPLETE = 'MAP_GET_CURRENT_POSITION_COMPLETE'
export const MAP_GET_LOCALITY = 'MAP_GET_LOCALITY'
export const MAP_START_WATCH_POSITION = 'MAP_START_WATCH_POSITION'
export const MAP_END_WATCH_POSITION = 'MAP_END_WATCH_POSITION'
export const MAP_ADD_POINT = 'MAP_ADD_POINT'
export const MAP_RM_POINT = 'MAP_RM_POINT'
export const MY_LOCATION_ID = "my-location"

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
export function getLocationComplete (): Action {
  return {
    type: MAP_GET_CURRENT_POSITION_COMPLETE,
  }
}
export function getLocality (latitude:Number, longitude:Number): Action {
  return {
    type: MAP_GET_CURRENT_POSITION_COMPLETE,
    payload: { latitude, longitude }
  }
}
export function watchLocation (payload:Boolean): Action {
  return {
    type: payload ? MAP_START_WATCH_POSITION : MAP_END_WATCH_POSITION,
  }
}
export function addPoint (coordinates, id): Action {
  return {
    type: MAP_ADD_POINT,
    payload: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      id
    }
  }
}
export function rmPoint (id): Action {
  return {
    type: MAP_RM_POINT,
    payload: id
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const MAP_ACTION_HANDLERS = {
  [REHYDRATE]: (defaultState, {type, payload}) => {
    var storedState = payload.map
    if (!storedState) return defaultState
    return {
      ...defaultState,
      ...storedState,
      // Override persisted state with defaults
      points: storedState.points.filter(p => p.id != MY_LOCATION_ID),
      gettingLocation: defaultState.gettingLocation,
      watchingLocation: defaultState.watchingLocation,
    }
  },
  [MAP_CHANGE_VIEWPORT]: (state, {type, payload}) => ({
    ...state,
    viewport: payload
  }),
  [MAP_SEARCH_CHOICES]: (state, {type, payload}) => ({
    ...state,
    searchChoices: payload
  }),
  [MAP_GET_CURRENT_POSITION]: (state, {type, payload}) => ({
    ...state,
    gettingLocation: true
  }),
  [MAP_GET_CURRENT_POSITION_COMPLETE]: (state, payload) => ({
    ...state,
    gettingLocation: false
  }),
  [MAP_ADD_POINT]: (state, {type, payload}) => ({
    ...state,
    points: [
      ...state.points.filter(p => p.id != payload.id),
      payload
    ]
  }),
  [MAP_RM_POINT]: (state, {type, payload}) => ({
    ...state,
    points: state.points.filter(p => p.id != payload),
  }),
  [MAP_START_WATCH_POSITION]: (state, {type, payload}) => ({
    ...state,
    watchingLocation: true
  }),
  [MAP_END_WATCH_POSITION]: (state, {type, payload}) => ({
    ...state,
    watchingLocation: false,
    points: state.points.filter(p => p.id != MY_LOCATION_ID),
  }),
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  searchChoices: [],
  viewportMeta: {
    attributionControl: true,
    perspectiveEnabled: true
  },
  viewport: {
    latitude: 45.55,
    longitude: -122.68,
    zoom: 11,
    pitch: 0,
    bearing: 0,
    isDragging: false,
    startDragLngLat: null,
    startBearing: null,
    startPitch: null,
  },
  gettingLocation: false,
  points: [],
  watchingLocation: false
}

export function mapReducer (state = initialState, action: Action) {
  const handler = MAP_ACTION_HANDLERS[action.type]

  // TODO: Should we just pass 'action.payload' instead of 'action'
  return handler ? handler(state, action) : state
}