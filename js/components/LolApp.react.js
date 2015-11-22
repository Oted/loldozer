/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React           = require('react'),
    Nav             = require('./Nav.react'),
    Info            = require('./Info.react'),
    Stage           = require('./Stage.react'),
    ExpBar          = require('./ExpBar.react'),
    ScrollStage     = require('./ScrollStage.react'),
    Controls        = require('./Controls.react'),
    AddModal        = require('./AddModal.react'),
    InspectModal    = require('./InspectModal.react'),
    BestModal       = require('./BestModal.react'),
    LolActions      = require('../actions/LolActions'),
    FilterModal     = require('./FilterModal.react'),
    AboutModal      = require('./AboutModal.react'),
    FeedbackModal   = require('./FeedbackModal.react'),
    LevelModal      = require('./LevelModal.react'),
    LolStore        = require('../stores/LolStore');

// document.onkeydown = checkKey;

/**
 *  Voting with the arrows if level is high enough.
 */
// function checkKey(e) {
    // e = e || window.event;
    
    // switch (e.keyCode) {
        // case (37) :
            // LolActions.previous();
        // break;
        // case (38) :
            // LolActions.upVote();
        // break;
        // case (39) :
            // LolActions.noVote();
        // break;
        // case (40) :
            // LolActions.downVote();
        // break;
    // }
// }

/**
 * Retrieve the current performers data from the LolStore
 */
function getLolState() {
    return {
        current     : LolStore.getCurrentPerformer(),
        experience  : LolStore.getExperience(),
        performers  : LolStore.getPerformers(),
        adjectives  : LolStore.getAdjectives(),
        modals      : LolStore.getModalStates(),
        statuses    : LolStore.getStatuses(),
        best        : LolStore.getBestPerformers(),
        level       : LolStore.getLevel(),
        info        : LolStore.getInfo(),
        filters     : LolStore.getFilters(),
        isMobile    : LolStore.isMobile()
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
                <AddModal
                    status={this.state.statuses.add}
                    modal={this.state.modals.add}
                />
                <InspectModal
                    modal={this.state.modals.inspect ? true : false}
                    target={this.state.modals.inspect}
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
                <ExpBar
                    experience={this.state.experience}
                />
                <ScrollStage
                    itemInFocus={this.state.current}
                    autoplay={this.state.autoplay}
                    seen={this.state.seen}
                    isMobile={this.state.isMobile}
                    feedbackStatus={this.state.statuses['feedback'] ? true : false}
                    performers={this.state.performers}
                    seen={this.state.seen}
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
