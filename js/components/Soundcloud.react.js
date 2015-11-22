var React           = require('react'),
    LolActions      = require('../actions/LolActions'),
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
        if (this.props.isMulti) {
            options.auto_play = false;
        }

        return (
            <div 
                key={this.props.data} 
                className={this.props.isMulti ? 'scroll-container soundcloud' : 'container soundcloud'}>
                <SoundcloudReact
                    id = {'scloud' + this.props.current.data}
                    key = {'scloud' + this.props.current.data}
                    url = {this.props.current.data}
                    opts = {options}
                    onEnd = {this._onEnd}
                />
            </div>
        );
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

module.exports = Soundcloud;
