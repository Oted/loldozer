var React           = require('react'),
    YoutubeReact    = require('react-youtube'),
    LolActions      = require('../actions/LolActions'),
    options         = {
        height: '390',
        width: '640',
        // https://developers.google.com/youtube/player_parameters
        playerVars: { 
            autoplay: 1,
            iv_load_policy : 3
        }
    };

var Youtube = React.createClass({
    getInitialState : function() {
        return {
            'loaded' : false
        }
    },

    render: function() {
        if (this.props.isMulti === true) {
            options.playerVars.autoplay = 0;
        }

        if (this.state.player && !this.props.isMobile) {
            if (this.props.isFocus === true) {
                this.state.player.playVideo();
            } else if (this.state.player) {
                this.state.player.pauseVideo();
            }
        }

        return (
            <div 
                key={'ytube-' + this.props.current.data}
                className={this.props.isMulti ? 'scroll-container' : 'container'}>
                <YoutubeReact
                    id={'ytube' + this.props.current.data}
                    url={'https://www.youtube.com/watch?v=' + this.props.current.data}
                    opts={options}
                    onReady={this._onReady}
                    onEnd={this._onEnd}
                    onPlay={this._onPlay}
                    onError={function(err){console.log('ERR', err)}}
                />
            </div>
        );
    },

    _onReady : function(event) {
        this.setState({
            "player" : event.target,
            "loaded" : true
        });
    },

    /**
     *  Fired when a song finnishes, if autoplay then play
     */
    _onPlay : function(event) {
        if (this.props.current.type !== 'youtube') {
            event.target.pauseVideo();
        }
    },

    /**
     *  Fired when a song finnishes, if autoplay then play
     */
    _onEnd : function() {
        if (this.props.autoplay) {
            LolActions.next();
        }
    }
});

module.exports = Youtube;
