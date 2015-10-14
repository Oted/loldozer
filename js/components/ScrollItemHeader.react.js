var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var ScrollItemHeader = React.createClass({
    render: function() {
        return (
            <div
                className={'info'}>
                <h1> {this.props.current ? this.props.current.title : ''} </h1>
                <h1 id='shared-title'> {this.props.current && this.props.current.shared === true ? '(this item was shared with you)' : ''} </h1>
                <span style={{'color': '#e9a39b'}}>
                    {this.props.current.dislikes > 0 || this.props.current.likes > 0 ? this.props.current.dislikes : ''}
                </span>
                <span 
                    data-tooltip='Get to the source'
                    id='source'>
                    <a className={this._getSourceIcon()} target='_blank' href={this.props.current.source}></a>
                </span>
                <span 
                    data-tooltip='Share the current item'
                    id='share'>
                    <i className='fa fa-share-alt fa-2x' onClick={this._copyToClip}></i>
                </span>
                <span data-tooltip='Toggle autoplay' onClick={this._toggleAutoplay}>
                    {this.props.autoplay ? 
                        <i className="fa fa-toggle-on fa-2x"></i> : 
                        <i className="fa fa-toggle-off fa-2x"></i>
                    }
                </span>
                <span style={{'color': '#89e5b0'}}>
                    {this.props.current.likes > 0 || this.props.current.dislikes > 0 ? this.props.current.likes : ''}
                </span>
            </div>
        );
    },

    /**
     * Copy to the clipboard
     */
    _copyToClip : function() {
        window.prompt("Copy the unique link to this item and share it!", 'http://getsomeinternet.com/?hash=' + this.props.current._hash);
    },

    /**
     *  Toggles the autplay
     */
    _toggleAutoplay : function() {
        LolActions.toggleAutoplay();
    },
    
    _getSourceIcon: function () {
        var s = this.props.current.source_type;

        if (!this.props.current.source) {
            return 'disabled';
        }
    
        switch (s) {
            case "reddit" :
                return "fa fa-reddit fa-2x";
            case "soundcloud" :
                return "fa fa-soundcloud fa-2x";
            case "reddit" :
                return "fa fa-reddit fa-2x";
            case "twitch" :
                return "fa fa-twitch fa-2x";
            case "vine" :
                return "fa fa-vine fa-2x";
            case "vimeo" :
                return "fa fa-vimeo-square fa-2x";
            case "youtube" :
                return "fa fa-youtube fa-2x";
            default :
                return "fa fa-external-link fa-2x";
        }
    }
});

module.exports = ScrollItemHeader;
