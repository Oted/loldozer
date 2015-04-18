/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React       = require('react'),
    Stage       = require('./Stage.react'),
    Nav         = require('./Nav.react'),
    Exp         = require('./Exp.react'),
    Info        = require('./Info.react'),
    LolStore    = require('../stores/LolStore');

/**
 * Retrieve the current performers data from the LolStore
 */
function getLolState() {
    console.log('getting state...');
    return {
        current: LolStore.getCurrentPerformer(),
        areAllSeen: LolStore.areAllSeen(),
        all: LolStore.getAllPerformers()
    };
}

/**
 *
 */
var LolApp = React.createClass({
    getInitialState: function() {
        console.log('Init state');
        return getLolState();
    },

    componentDidMount: function() {
        LolStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LolStore.removeChangeListener(this._onChange);
    },

   /**
    * @return {object}
    */
    render: function() {
        console.log('render LolApp');
  	    return (
            <div>
                <Nav
                />
                <Info
                    current={this.state.current}
                />
                <Exp
                />
                <Stage
                    all={this.state.all}
                    current={this.state.current}
                />
            </div>
  	    );
    },

   /**
    * Event handler for 'change' events coming from the LolStore
    */
    _onChange: function() {
        this.setState(getLolState());
    }
});

module.exports = LolApp;
