var React           = require('react'),
    LolActions      = require('../actions/LolActions'),
    SoundcloudReact = require('react-soundcloud-widget').default,
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
        if (this.props.isMulti) {
            options.auto_play = false;
        }

        console.log(SoundcloudReact);

        return (
            <div 
                key={'scloud-' + this.props.current._hash}
                className={this.props.isMulti ? 'scroll-container soundcloud' : 'container soundcloud'}>
                <SoundcloudReact
                    id={'scloud' + this.props.current._hash}
                    url={this.props.current.data}
                    opts={options}
                    onEnd={this._onEnd}
                />
            </div>
        );
    },

    /**
     *  Fired when a song finnishes, if autoplay then play
     */
    _onEnd : function() {
        return;
    }
});

module.exports = Soundcloud;
