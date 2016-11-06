import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'; // just mergeMap

// Allows for Adding New Epics Asynchronously/Lazily
// https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html

export const epic$ = new BehaviorSubject(combineEpics());

export const rootEpic = (action$, store) =>
  epic$.mergeMap(epic =>
    epic(action$, store)
  );

export default epic$
