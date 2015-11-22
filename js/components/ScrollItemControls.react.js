var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var ScrollItemHeader = React.createClass({
    getInitialState: function() {
        return {
            likes: this.props.current.likes,
            dislikes: this.props.current.dislikes,
            voted : false
        };
    },
    render: function() {
        return (
            <div
                className={'info'}>
                <span 
                    data-tooltip='Get to the source'
                    className='control-icon'>
                    <a className={this._getSourceIcon()} target='_blank' href={this.props.current.source}></a>
                </span>
                <span 
                    data-tooltip='Share the current item'
                    className='control-icon'>
                    <i className='fa fa-share-alt' onClick={this._copyToClip}></i>
                </span> 
                <span
                    onClick={this._onVoteDown}
                    onMouseOver={this._onNegativeOver}
                    onMouseOut={this._onNegativeOut}
                    className='control-icon'>
                    <i className='fa fa-thumbs-down left-margin'></i>
                </span> 
                <div
                    className='vote-number'>
                    {this.state.dislikes}
                </div>
                <span
                    onClick={this._onVoteUp}
                    onMouseOver={this._onPositiveOver}
                    onMouseOut={this._onPositiveOut}
                    className='control-icon'>
                    <i className='fa fa-thumbs-up'></i>
                </span>
                <div 
                    className='vote-number'>
                    {this.state.likes}
                </div>
            </div>
        );
    },

    /**
     * Copy to the clipboard
     */
    _copyToClip : function() {
        window.prompt("Copy the unique link to this item and share it!", 'http://getsomeinternet.com/?hash=' + this.props.current._hash);
    },
    
    _onVoteUp: function(e) {
        if (this.state.voted) {
            return;
        }

        this.setState({likes: this.state.likes + 1, voted : true});

        var adjective = e.currentTarget.children[0].innerText;
        e.currentTarget.children[0].className += ' green';
        
        LolActions.upVote(adjective || null, this.props.current._hash);
    },

    _onVoteDown: function(e) {
        if (this.state.voted) {
            return;
        }

        this.setState({dislikes: this.state.dislikes + 1, voted : true});
        var adjective = e.currentTarget.children[0].innerText;
        e.currentTarget.children[0].className += ' red';

        LolActions.downVote(adjective || null, this.props.current._hash);
    },

    _inspectItem: function(e) {
        console.log('inspect item');

        LolActions.openModal('inspect', this.props.current);
    },

    _onNegativeOver : function(e) {
        // document.querySelector('#left-corner-image').style.opacity = 1;
    },

    _onNegativeOut : function(e) {
        // document.querySelector('#left-corner-image').style.opacity = 0.4;
    },

    _onPositiveOver : function(e) {
        // document.querySelector('#right-corner-image').style.opacity = 1;
    },

    _onPositiveOut : function(e) {
        // document.querySelector('#right-corner-image').style.opacity = 0.4;
    },

    _getSourceIcon: function () {
        var s = this.props.current.source_type;

        if (!this.props.current.source) {
            return 'disabled';
        }
    
        switch (s) {
            case "reddit" :
                return "fa fa-reddit";
            case "soundcloud" :
                return "fa fa-soundcloud";
            case "reddit" :
                return "fa fa-reddit";
            case "twitch" :
                return "fa fa-twitch";
            case "vine" :
                return "fa fa-vine";
            case "vimeo" :
                return "fa fa-vimeo-square";
            case "youtube" :
                return "fa fa-youtube";
            default :
                return "fa fa-external-link";
        }
    }
});

module.exports = ScrollItemHeader;
