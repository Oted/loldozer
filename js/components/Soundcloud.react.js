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
        var isSoundcloud = this.props.current.type === 'soundcloud';

        if (!isSoundcloud) {
            return (<div></div>);
        }

        return (
            <div 
                className={isSoundcloud ? 'container' : 'hidden'}>
                style={{'width' : '7rem'}}
                <SoundcloudReact
                    url={this.props.current.data}
                    opts = {options}               
                    onEnd={this._onEnd}
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
