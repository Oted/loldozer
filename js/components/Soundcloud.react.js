var React           = require('react'),
    SoundcloudReact = require('react-soundcloud-widget'),
    options         = {
        auto_play : true,
        buying : false,
        liking: false,
        download: false,
        sharing	: false,
        show_artwork: false,
        show_comments: false,
        show_playcount: false,
        show_user: false
    };

var Soundcloud = React.createClass({
    render: function() {
        var isSoundcloud = this.props.current.type === 'soundcloud';

        if (!isSoundcloud) {
            console.log('here');
            return (
                <div 
                    className={'hidden'}>
                    <SoundcloudReact
                        url={'http://soundcloud.com/'}
                        opts = {options} 
                        onPlay={this._onPlay}
                    />
                </div>
            );
        }

        return (
            <div 
                className={'soundcloud'}>
                <SoundcloudReact
                    url={'http://soundcloud.com/getdownedits/get-down-edits-classic-mix-pt-1'}
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

module.exports = Soundcloud;
