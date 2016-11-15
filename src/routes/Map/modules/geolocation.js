import { Observable } from 'rxjs/Observable';

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

export default {
  currentPosition: options => new CurrentPositionObservable(options)
};