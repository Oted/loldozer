var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <nav>
                <i
                    id={'list-button'}
                    className={'fa fa-list'}>
                </i>
                <a 
                    id={'downvote-button'}
                    className={'vote-button'}
                    onClick={this._onVoteDown}>
                    -
                </a>
                <a 
                    id={'next-button'}
                    onClick={this._onNext}>
                    NEXT
                </a>
                <a 
                    id={'upvote-button'} 
                    className={'vote-button'}
                    onClick={this._onVoteUp}>
                    +
                </a>
            </nav>
        );
    },

    _onNext: function(text) {
        console.log('next');
        LolActions.next();
    },

    _onVoteUp: function(text) {
        console.log('up');
    },

    _onVoteDown: function(text) {
        console.log('down');
    }
});

module.exports = Nav;
