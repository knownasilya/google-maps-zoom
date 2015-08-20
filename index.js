/* jshint node: true */
'use strict';

var name = 'google-maps-zoom';

module.exports = {
  name: name,

  included: function(app, parentAddon) {
    var target = (parentAddon || app);

    target.import('vendor/' + name + '/styles.css');
  }
};
