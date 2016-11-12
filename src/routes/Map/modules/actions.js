/* @flow */

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_SEARCH = 'MAP_SEARCH'
export const MAP_SEARCH_CHOICES = 'MAP_SEARCH_CHOICES'
export const MAP_CHANGE_VIEWPORT = 'MAP_CHANGE_VIEWPORT'

// ------------------------------------
// Actions
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
