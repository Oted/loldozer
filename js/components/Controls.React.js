var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Controls = React.createClass({
    render: function() {
        return (
            <div
                id='stage-controls'>
                <div
                    className='negatives'>
                    <div
                        className={this.props.level > 4 ? 'vote-button' : 'disabled'}>
                        <a>
                            {this.props.adjectives.negatives[0]}
                        </a>
                    </div>
                    
                    <div
                        onClick={this._onVoteDown}
                        className={this.props.level > 0 ? 'vote-button' : 'disabled'}>
                        <a 
                            className='fa fa-thumbs-down'>
                        </a>
                    </div>
                </div>
                <div
                    className='neutrals'>
                    <div
                        id='next-button'>
                        <a 
                            onClick={this._onNext}>
                            GET SOME INTERNET
                        </a>
                    </div>
                </div>
                <div
                    className='positives'>
                    <div
                        onClick={this._onVoteUp}
                        className={this.props.level > 0 ? 'vote-button' : 'disabled'}>
                        <a 
                            className='fa fa-thumbs-up'>
                        </a>
                    </div>
                    <div
                        onClick={this._onVoteUp}
                        className={this.props.level > 4 ? 'vote-button' : 'disabled'}>
                        <a> 
                            {this.props.adjectives.positives[0]}
                        </a>
                    </div>
                </div>
            </div>
        );
    },

    _onViewStats: function(e) {
        console.log('view'); 
        LolActions.openModal('stats', {type : "current"});
    },

    _onVoteUp: function(e) {
        var adjective = e.currentTarget.children[0].innerText;
        
        console.log('up with ', adjective);
        LolActions.upVote(adjective || null);
        LolActions.next();
    },

    _onNext: function() {
        console.log('next');
        LolActions.noVote();
        LolActions.next();
    },

    _onVoteDown: function(e) {
        var adjective = e.currentTarget.children[0].innerText;

        console.log('down with ', adjective);
        LolActions.downVote(adjective || null);
        LolActions.next();
    }
});

module.exports = Controls;
