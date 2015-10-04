/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React           = require('react'),
    Nav             = require('./Nav.react'),
    Info            = require('./Info.react'),
    Stage           = require('./Stage.react'),
    Controls        = require('./Controls.react'),
    AddModal        = require('./AddModal.react'),
    BestModal       = require('./BestModal.react'),
    LolActions      = require('../actions/LolActions'),
    FilterModal     = require('./FilterModal.react'),
    AboutModal      = require('./AboutModal.react'),
    FeedbackModal   = require('./FeedbackModal.react'),
    LevelModal      = require('./LevelModal.react'),
    StatsModal      = require('./StatsModal.react'),
    LolStore        = require('../stores/LolStore');

document.onkeydown = checkKey;

/**
 *  Voting with the arrows if level is high enough.
 */
function checkKey(e) {
    e = e || window.event;
    
    switch (e.keyCode) {
        case (37) :
            LolActions.previous();
        break;
        case (38) :
            LolActions.upVote();
        break;
        case (39) :
            LolActions.noVote();
        break;
        case (40) :
            LolActions.downVote();
        break;
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
        single_view : LolStore.getSingleView(),
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
                    key='best-modal'
                    modal={this.state.modals.best}
                    data={this.state.best}
                />
                <FeedbackModal
                    modal={this.state.modals.feedback}
                />
                <AboutModal
                    modal={this.state.modals.about}
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
                    isMobile={this.state.isMobile}
                    level={this.state.level}
                />
                {this.state.singleView ? <Info
                    isMobile={this.state.isMobile}
                    level={this.state.level}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                    experience={this.state.experience}
                /> : ''}>
                {this.state.singleView ? <Stage
                    isMobile={this.state.isMobile}
                    performers={this.state.perfomers}
                    seen={this.state.seen}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                /> : ''}
                {this.state.singleView ? <Controls
                    isMobile={this.state.isMobile}
                    current={this.state.current}
                    feedbackStatus={this.state.statuses['feedback'] ? true : false}
                    adjectives={this.state.adjectives}
                    level={this.state.level}
                /> : ''}
                {!this.state.singleView ? <Stage
                    isMobile={this.state.isMobile}
                    performers={this.state.perfomers}
                    seen={this.state.seen}
                    autoplay={this.state.autoplay}
                    current={this.state.current}
                /> : ''}
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
