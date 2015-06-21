/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React       = require('react'),
    Nav         = require('./Nav.react'),
    Info        = require('./Info.react'),
    Stage       = require('./Stage.react'),
    Controls    = require('./Controls.react'),
    AddModal    = require('./AddModal.react'),
    BestModal   = require('./BestModal.react'),
    LolActions  = require('../actions/LolActions'),
    FilterModal = require('./FilterModal.react'),
    LevelModal  = require('./LevelModal.react'),
    StatsModal  = require('./StatsModal.react'),
    LolStore    = require('../stores/LolStore');

document.onkeydown = checkKey;

/**
 *  Voting with the arrows if level is high enough.
 */
function checkKey(e) {
    if (LolStore.getLevel() >= 5) {
        e = e || window.event;
        
        switch (e.keyCode) {
            case (37) :
                LolActions.previous();
            break;
            case (38) :
                LolActions.upVote(null);
                LolActions.next();
            break;
            case (39) :
                LolActions.noVote();
                LolActions.next();
            break;
            case (40) :
                LolActions.downVote();
                LolActions.next();
            break;
        }
    }
}


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
        level       : LolStore.getLevel(),
        info        : LolStore.getInfo(),
        filters     : LolStore.getFilters(),
        isMobile    : LolStore.isMobile(),
        autoplay    : LolStore.getAutoplay()
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
                <LevelModal
                    level={this.state.level}
                    modal={this.state.modals.level}
                />
                <FilterModal
                    status={this.state.statuses.filter}
                    info={this.state.info}
                    filters={this.state.filters}
                    modal={this.state.modals.filter}
                />
                <Nav
                    level={this.state.level}
                />
                <Info
                    level={this.state.level}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                    experience={this.state.experience}
                />
                <Stage
                    isMobile={this.state.isMobile}
                    performers={this.state.perfomers}
                    seen={this.state.seen}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                />
                <Controls
                    isMobile={this.state.isMobile}
                    current={this.state.current}
                    adjectives={this.state.adjectives}
                    level={this.state.level}
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
