import { Observable } from 'rxjs/Observable';

const GEOLOCATION_API = window.navigator.geolocation

class CurrentPositionObservable extends Observable {
  constructor(options) {
    super()
    this.options = options
  }

  _subscribe(observer) {
    GEOLOCATION_API.getCurrentPosition(
      data => {
        observer.next(data)
        observer.complete()
      },
      e => observer.error(e),
      this.options
    );
  }
}


class WatchPositionObservable extends Observable {
  constructor(options) {
    super()
    this.options = options
  }

  _subscribe(observer) {
    this.watchId = GEOLOCATION_API.watchPosition(
      data => observer.next(data),
      e => observer.error(e),
      this.options
    );
  }

  unsubscribe() {
    console.log("UNSUBSCRIBED")
    GEOLOCATION_API.clearWatch(this.watchId)
    super.unsubscribe()
  }
}


export default {
  currentPosition: options => new CurrentPositionObservable(options),
  watchPosition: options => new WatchPositionObservable(options), // Should this be a singleton?
};