/**
 * Init File
 */
var React       = require('react'),
    LolApp      = require('./components/LolApp.react'),
    Api         = require('./utils/Api'),
    Storage     = require('./utils/localstorage');

//Storage.destroyStorage();
Storage.loadStorage();

Api.getItems();
Api.getInfo();

React.render(
  <LolApp />,
  document.getElementById('lolapp')
);

