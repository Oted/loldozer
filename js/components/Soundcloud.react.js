var React           = require('react'),
    SoundcloudReact = require('react-soundcloud-widget'),
    options         = {
        auto_play : true,
        buying : false,
        liking: true,
        download: false,
        sharing	: false,
        show_artwork: true,
        show_comments: false,
        show_playcount: false,
        show_user: false
    };

var Soundcloud = React.createClass({
    render: function() {
        var isSoundcloud = this.props.current.type === 'soundcloud';

        if (!isSoundcloud) {
            return (<div></div>);
        }

        return (
            <div 
                className={'container'}>
                <SoundcloudReact
                    url={this.props.current.data}
                    opts = {options}               
                    onPlay={this._onPlay}
                />
            </div>
        );
    }
});

module.exports = Soundcloud;
