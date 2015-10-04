var React           = require('react'),
    YoutubeReact    = require('react-youtube'),
    LolActions      = require('../actions/LolActions'),
    options         = {
        // https://developers.google.com/youtube/player_parameters
        playerVars: { 
            autoplay: 1,
            iv_load_policy : 3
        }
    };

var Youtube = React.createClass({
    render: function() {
        return (
            <div 
                className='container'>
                <YoutubeReact
                    id={this.props.current.data}
                    url={'https://www.youtube.com/watch?v=' + this.props.current.data}
                    opts={options}
                    onEnd={this._onEnd}
                    onPlay={this._onPlay}
                />
            </div>
        );
    },

    /**
     *  Fired when a song finnishes, if autoplay then play
     */
    _onPlay : function(event) {
        if (this.props.current.type !== 'youtube') {
            //console.log('OMGG NO FUCK WAA ', this.props.current);
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
