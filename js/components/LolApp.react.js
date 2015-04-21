/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React       = require('react'),
    Stage       = require('./Stage.react'),
    Nav         = require('./Nav.react'),
    Info        = require('./Info.react'),
    Footer      = require('./Footer.react'),
    LolStore    = require('../stores/LolStore');

/**
 * Retrieve the current performers data from the LolStore
 */
function getLolState() {
    return {
        current: LolStore.getCurrentPerformer(),
        interactions: LolStore.getInteractions(),
        all: LolStore.getAllPerformers()
    };
}

/**
 *
 */
var LolApp = React.createClass({
    getInitialState: function() {
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
  	    return (
            <div>
                <Nav
                />
                <Info
                    current={this.state.current}
                    interactions={this.state.interactions}
                />
                <Stage
                    all={this.state.all}
                    current={this.state.current}
                />
                <Footer
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
