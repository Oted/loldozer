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
                        className={this.props.level > 999999 ? 'vote-button' : 'disabled'}>
                        <a>
                            {this.props.adjectives.negatives[0]}
                        </a>
                    </div>
                    
                    <div
                        onClick={this._onVoteDown}
                        onMouseOver={this._onNegativeOver}
                        onMouseOut={this._onNegativeOut}
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
                            {this.props.isMobile ? 'G S I' : 'GET SOME INTERNET'}
                        </a>
                    </div>
                </div>
                <div
                    className='positives'>
                    <div
                        onClick={this._onVoteUp}
                        onMouseOver={this._onPositiveOver}
                        onMouseOut={this._onPositiveOut}
                        className={this.props.level > 0 ? 'vote-button' : 'disabled'}>
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
           return;
        }
        
        var adjective = e.currentTarget.children[0].innerText;
        
        console.log('up with ', adjective);
        LolActions.upVote(adjective || null);
        this.lastvote = this.props.current._hash;
    },

    _onNext: function() {
        console.log('next');
        LolActions.noVote();
    },

    _onVoteDown: function(e) {
        if (this.lastvote === this.props.current._hash) {
           return;
        }

        var adjective = e.currentTarget.children[0].innerText;

        console.log('down with ', adjective);
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
