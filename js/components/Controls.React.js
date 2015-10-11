var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Controls = React.createClass({
    getInitialState: function() {
        return {
            'count': 1 
        };
    },
    render: function() {
        return (
            <div
                id='stage-controls'>
                <div
                    className='negatives'>
                    <div
                        className={this.props.level > 999999 ? 'vote-button' : 'disabled'}>
                        <a>
                            {this.props.adjectives.negatives[0]}
                        </a>
                    </div>
                    
                    <div
                        onClick={this._onVoteDown}
                        onMouseOver={this._onNegativeOver}
                        onMouseOut={this._onNegativeOut}
                        className={this.props.level > 0 ? this.props.isMobile ? 'mobile-vote-button': 'vote-button' : 'disabled'}>
                        <a 
                            className='fa fa-thumbs-down'>
                        </a>
                    </div>
                </div>
                <div
                    className='neutrals'>
                    <div
                        id={this.props.isMobile ? 'mobile-next-button' : 'next-button'}>
                        <a 
                            onClick={this._onNext}>
                            {this.props.isMobile ? 'N E X T' : 'GET SOME INTERNET'}
                        </a>
                    </div>
                </div>
                <div
                    className='positives'>
                    <div
                        onClick={this._onVoteUp}
                        onMouseOver={this._onPositiveOver}
                        onMouseOut={this._onPositiveOut}
                        className={this.props.level > 0 ? this.props.isMobile ? 'mobile-vote-button': 'vote-button' : 'disabled'}>
                        <a 
                            className='fa fa-thumbs-up'>
                        </a>
                    </div>
                    <div
                        onClick={this._onVoteUp}
                        className={this.props.level > 9999999 ? 'vote-button' : 'disabled'}>
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
        if (this.lastvote === this.props.current._hash) {
            return LolActions.next();
        }
        
        var adjective = e.currentTarget.children[0].innerText;
        
        LolActions.upVote(adjective || null);
        this.lastvote = this.props.current._hash;
    },

    _onNext: function() {
        this.setState({
            count: this.state.count + 1
        });

        if (this.state.count % 50 === 0 && !this.props.feedbackStatus) {
            LolActions.openModal('feedback');
        }

        LolActions.noVote();
    },

    _onVoteDown: function(e) {
        if (this.lastvote === this.props.current._hash) {
            return LolActions.next();
        }

        var adjective = e.currentTarget.children[0].innerText;

        LolActions.downVote(adjective || null);
        this.lastvote = this.props.current._hash;
    },

    _onNegativeOver : function(e) {
        document.querySelector('#left-corner-image').style.opacity = 1;
    },

    _onNegativeOut : function(e) {
        document.querySelector('#left-corner-image').style.opacity = 0.4;
    },

    _onPositiveOver : function(e) {
        document.querySelector('#right-corner-image').style.opacity = 1;
    },

    _onPositiveOut : function(e) {
        document.querySelector('#right-corner-image').style.opacity = 0.4;
    }

});

module.exports = Controls;
