import Ember from 'ember';
import layout from './template';

const {
  on,
  computed,
  observer: observes
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['knownasilya--google-maps-zoom'],
  minZoom: 0,
  maxZoom: 25,
  zoom: 0,

  setup: on('init', observes('map', function () {
    var map = this.get('map');

    if (map) {
      this.setProperties({
        zoom: map.getZoom(),
        maxZoom: map.maxZoom,
        minZoom: map.minZoom
      });
    }
  })),

  actions: {
    zoomIn() {
      var disabled = this.get('inDisabled');

      if (!disabled) {
        this.incrementProperty('zoom');

        if (this.get('zoomin')) {
          this.sendAction('zoomin');
        }
      }
    },

    zoomOut() {
      var disabled = this.get('outDisabled');

      if (!disabled) {
        this.decrementProperty('zoom');

        if (this.get('zoomout')) {
          this.sendAction('zoomout');
        }
      }
    }
  },

  inDisabled: computed('zoom', 'maxZoom', {
    get() {
      var zoom = this.get('zoom');
      var max = this.get('maxZoom');

      return zoom === max;
    }
  }),

  outDisabled: computed('zoom', 'minZoom', {
    get() {
      var zoom = this.get('zoom');
      var min = this.get('minZoom');

      return zoom === min;
    }
  })
});
