import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    zoomOut(value) {
      var map = this.get('map');

      map.setZoom(value);
    },

    zoomIn(value) {
      var map = this.get('map');

      map.setZoom(value);
    }
  }
});
