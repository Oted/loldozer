var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <div
                id='stage-controls'>
                <div
                    id={'downvote-button'}
                    onClick={this._onVoteDown}
                    className={'vote-button'}>
                    <a 
                        className={'fa fa-thumbs-down'}>
                    </a>
                </div>
                <div
                    id={'upvote-button'} 
                    onClick={this._onVoteUp}
                    className={'vote-button'}>
                    <a 
                        className={'fa fa-thumbs-up'}>
                    </a>
                </div>
            </div>
        );
    },

    _onVoteUp: function(text) {
        console.log('up');
        LolActions.upVote();
        LolActions.next();
    },

    _onVoteDown: function(text) {
        console.log('down');
        LolActions.downVote();
        LolActions.next();
    },


});

module.exports = Nav;
