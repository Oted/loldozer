var React           = require('react'),
    LolActions      = require('../actions/LolActions'),
    Froogaloop      = require('../../common/froogaloop'),
    options         = {
        height: '390',
        width: '640'
    };

var Vimeo = React.createClass({
    render: function() {
        var that    = this,
            data    = this.props.current.data.indexOf('/') > -1 ? this.props.current.data.split('/').pop() : this.props.current.data;

        // if (!data) {
            // return (<div></div>);
        // }

        // var player  = Froogaloop(document.getElementById('vimeo' + data));
       
        // Froogaloop(player).addEvent('ready', function() {
            // console.log('SOOO READY');

            // Froogaloop(player).addEvent('finish', that._onEnd);
            // Froogaloop(player).addEvent('play', function(){console.log('playinggg')});
            // player.addEvent('pause', onPause);
            // player.addEvent('finish', onFinish);
            // player.addEvent('playProgress', onPlayProgress);
        // });
            
        // if (player) {
            // if (this.props.isFocus === true) {
                // player.api('play', function(){console.log(arguments)});
            // } else {
                // player.api('pause');
            // }
        // }

        return (
            <div
                className={this.props.isMulti ? 'scroll-container' : 'container'}>
                <iframe 
                    src={'http://player.vimeo.com/video/' + data + '?autoplay=' + (this.props.isMulti === true ? '0' : '1') + '&api=1&player_id=' + 'vimeo' + data}
                    width={options.width} 
                    id={'vimeo' + data}
                    height={options.height}
                    frameborder="0" 
                ></iframe> 
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

module.exports = Vimeo;
