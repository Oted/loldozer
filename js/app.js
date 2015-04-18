/**
 * Init File
 */

var React   = require('react'),
    LolApp  = require('./components/LolApp.react'),
    Api     = require('./utils/API.js');

Api.getItems();

React.render(
  <LolApp />,
  document.getElementById('lolapp')
);
