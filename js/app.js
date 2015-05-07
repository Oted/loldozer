/**
 * Init File
 */
var React       = require('react'),
    LolApp      = require('./components/LolApp.react'),
    Api         = require('./utils/Api'),
    Stats       = require('./utils/statshandler'),
    Storage     = require('./utils/localstorage');

//Storage.destroyStorage();
Stats.transformRatingsToChart({});
Storage.loadStorage();

Api.getItems();

React.render(
  <LolApp />,
  document.getElementById('lolapp')
);

