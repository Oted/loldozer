/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React       = require('react'),
    Nav         = require('./Nav.react'),
    Info        = require('./Info.react'),
    Stage       = require('./Stage.react'),
    Footer      = require('./Footer.react'),
    AddModal    = require('./AddModal.react'),
    BestModal   = require('./BestModal.react'),
    StatsModal  = require('./StatsModal.react'),
    LolStore    = require('../stores/LolStore');

/**
 * Retrieve the current performers data from the LolStore
 */
function getLolState() {
    return {
        current     : LolStore.getCurrentPerformer(),
        experience  : LolStore.getExperience(),
        performers  : LolStore.getPerformers(),
        seen        : LolStore.getSeenPerformers(),
        adjectives  : LolStore.getAdjectives(),
        modals      : LolStore.getModalStates(),
        statuses    : LolStore.getStatuses(),
        best        : LolStore.getBestPerformers(),
        stats_views : LolStore.getStatsViews(),
        level       : LolStore.getLevel()
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
                <BestModal
                    modal={this.state.modals.best}
                    data={this.state.best}
                />
                <StatsModal
                    modal={this.state.modals.stats}
                    data={this.state.stats_views}
                />
                <AddModal
                    status={this.state.statuses.add}
                    modal={this.state.modals.add}
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
                    adjectives={this.state.adjectives}
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
