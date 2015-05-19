/**
 * Init File
 */
var React       = require('react'),
    LolApp      = require('./components/LolApp.react'),
    Api         = require('./utils/Api'),
    Storage     = require('./utils/localstorage');

Storage.destroyStorage("seen");

React.render(
  <LolApp />,
  document.getElementById('lolapp')
);

