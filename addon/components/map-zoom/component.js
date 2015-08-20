import Ember from 'ember';
import layout from './template';

const {
  on,
  run,
  computed,
  observer: observes
} = Ember;
const defaultMax = 25;
const defaultMin = 0;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['knownasilya--google-maps-zoom'],
  minZoom: defaultMin,
  maxZoom: defaultMax,
  zoom: 0,

  setup: on('init', observes('map', function () {
    var map = this.get('map');

    if (map) {
      var listener = map.addListener('zoom_changed', run.bind(() => {
        this.set('zoom', map.getZoom());
      }));

      this.setProperties({
        zoom: map.getZoom(),
        maxZoom: map.maxZoom || defaultMax,
        minZoom: map.minZoom || defaultMin,
        zoomListener: listener,
      });
    }
  })),

  teardown: on('willDestroyElement', function () {
    var listener = this.get('zoomListener');

    if (listener) {
      google.maps.event.removeListener(listener);
    }
  }),

  actions: {
    zoomIn() {
      var disabled = this.get('inDisabled');

      if (!disabled) {
        var value = this.incrementProperty('zoom');

        if (this.get('zoomin')) {
          this.sendAction('zoomin', value);
        }
      }
    },

    zoomOut() {
      var disabled = this.get('outDisabled');

      if (!disabled) {
        var value = this.decrementProperty('zoom');

        if (this.get('zoomout')) {
          this.sendAction('zoomout', value);
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
