var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Footer = React.createClass({
    render: function() {
        return (
            <div
                id='stage-controls'>
                <div
                    className='negatives'>
                    <div
                        onClick={this._onVoteDown}
                        className='vote-button'>
                        <a>
                            {this.props.adjectives.negatives[0]}
                        </a>
                    </div>
                    
                    <div
                        onClick={this._onVoteDown}
                        className='vote-button'>
                        <a 
                            className='fa fa-thumbs-down'>
                        </a>
                    </div>
                </div>

                <div
                    className='neutrals'>
                    <div
                        id='eye'
                        onClick={this._onViewStats}
                        className='vote-button'>
                        <a 
                            className='fa fa-eye'>
                        </a>
                    </div>
                </div>

                <div
                    className='positives'>
                    <div
                        onClick={this._onVoteUp}
                        className='vote-button'>
                        <a 
                            className='fa fa-thumbs-up'>
                        </a>
                    </div>
                    
                    <div
                        onClick={this._onVoteUp}
                        className='vote-button positives'>
                        <a 
                            className=''>
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

    _onVoteDown: function(e) {
        var adjective = e.currentTarget.children[0].innerText;

        console.log('down with ', adjective);
        LolActions.downVote(adjective || null);
        LolActions.next();
    }
});

module.exports = Footer;
