var React           = require('react'),
    YoutubeReact    = require('react-youtube'),
    options         = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

var Youtube = React.createClass({
    render: function() {
        var isYoutube = this.props.current.type === 'youtube';
        
        if (!isYoutube) { 
            return (
                <div
                    className={isYoutube ? 'container' : 'hidden'}>
                </div>);
        }
        
        if (isYoutube) {
            return (
                <div 
                    className='container'>
                    <YoutubeReact 
                        url={'https://www.youtube.com/watch?v=' + this.props.current.data}
                        opts = {options}
                        onPlay={this._onPlay}
                    />
                </div>
            );
        }

    }
});

module.exports = Youtube;
