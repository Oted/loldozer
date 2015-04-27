/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React       = require('react'),
    Stage       = require('./Stage.react'),
    Nav         = require('./Nav.react'),
    Info        = require('./Info.react'),
    Footer      = require('./Footer.react'),
    AddModal    = require('./AddModal.react'),
    LolStore    = require('../stores/LolStore');

/**
 * Retrieve the current performers data from the LolStore
 */
function getLolState() {
    return {
        current: LolStore.getCurrentPerformer(),
        experience: LolStore.getExperience(),
        performers: LolStore.getPerformers(),
        seen: LolStore.getSeenPerformers(),
        modals: LolStore.getModalStates(),
        level: LolStore.getLevel()
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
                <AddModal
                    modals={this.state.modals}
                />
                <Nav
                    level={this.state.level}
                />
                <Info
                    current={this.state.current}
                    experience={this.state.experience}
                />
                <Stage
                    performers={this.state.perfomers}
                    seen={this.state.seen}
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
