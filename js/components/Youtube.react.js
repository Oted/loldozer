var React           = require('react'),
    YoutubeReact    = require('react-youtube'),
    LolActions      = require('../actions/LolActions'),
    options         = {
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            iv_load_policy : 3
        }
    };

var Youtube = React.createClass({
    render: function() {
        var isYoutube = this.props.current.type === 'youtube';
        
        if (!isYoutube) {
            return (<div id='y-player' className={isYoutube ? 'container' : 'hidden'}></div>);
        }
        
        if (isYoutube) {
            return (
                <div 
                    id='y-player'
                    className='container'>
                    <YoutubeReact 
                        url={'https://www.youtube.com/watch?v=' + this.props.current.data}
                        opts={options}
                        onEnd={this._onEnd}
                        onPlay={this._onPlay}
                    />
                </div>
            );
        }
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
