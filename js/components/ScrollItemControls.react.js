var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var ScrollItemHeader = React.createClass({
    getInitialState: function() {
        return {
            'likes'     : this.props.current.likes,
            'dislikes'  : this.props.current.dislikes,
            'voted'     : false
        };
    },
    componentWillReceiveProps: function(nextProps) {
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
                    className='control-icon'>
                    <i className='fa fa-thumbs-down left-margin'></i>
                </span> 
                <div
                    className='vote-number'>
                    {this.state.dislikes}
                </div>
                <span
                    onClick={this._onVoteUp}
                    className='control-icon'>
                    <i className='fa fa-thumbs-up'></i>
                </span>
                <div 
                    className='vote-number'>
                    {this.state.likes}
                </div>
                <span
                    className={this.props.current.viewed ? 'blue control-icon' : 'control-icon'}>
                    <i className='fa fa-eye'></i>
                </span>
                <div 
                    className='vote-number'>
                    {this.props.current.view_time}
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

    _getSourceIcon: function() {
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
