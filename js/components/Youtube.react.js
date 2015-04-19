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
        var isYoutube = this.props.current.type === 'youtube';
        
        if (!isYoutube) {
            return (
                <div 
                    className={'hidden'}>
                    <YoutubeReact 
                        url={'https://www.youtube.com/watch?v=' + this.props.current.data}
                        opts = {options}
                        onPlay={this._onPlay}
                    />
                </div>
            );
        }

        return (
            <div 
                className={''}>
                <YoutubeReact 
                    url={'https://www.youtube.com/watch?v=' + this.props.current.data}
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
