var React           = require('react'),
    YoutubeReact    = require('../../node_modules/react-youtube/dist/YouTube'),
    options         = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

var Youtube = React.createClass({
    render: function() {
        return (
            <div 
                className={this.props.current.type === 'youtube' ? '' : 'hidden'}>
                <YoutubeReact 
                    url={'http://www.youtube.com/watch?v=' + this.props.current.data}
                    opts = {options}               
                    onPlay={this._onPlay}
                />
            </div>
        );
    },

    _onPlay() {
        console.log('PLAYING');
    }
});

module.exports = Youtube;
