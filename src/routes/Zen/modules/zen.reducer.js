/* @flow */

import { REQUEST_ZEN, RECIEVE_ZEN, SAVE_CURRENT_ZEN } from './zen.actions'
import type { ZenObject, ZenStateObject } from '../interfaces/zen.js'

const ZEN_ACTION_HANDLERS = {
  [REQUEST_ZEN]: (state: ZenStateObject): ZenStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_ZEN]: (state: ZenStateObject, action: {payload: ZenObject}): ZenStateObject => {
    return ({
       ...state,
       zens: state.zens.concat(action.payload),
       current: action.payload.id,
       fetching: false
    })
  },
  [SAVE_CURRENT_ZEN]: (state: ZenStateObject): ZenStateObject => {
    return state.current != null ? ({
      ...state,
      saved: state.saved.concat(state.current)
    }) : state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ZenStateObject = {
  fetching: false,
  current: null,
  zens: [],
  saved: []
}

export default function zenReducer (state: ZenStateObject = initialState, action: Action): ZenStateObject {
  const handler = ZEN_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}