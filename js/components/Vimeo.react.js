var React           = require('react'),
    LolActions      = require('../actions/LolActions'),
    Froogaloop      = require('../../common/froogaloop')(),
    options         = {
        height: '390',
        width: '640'
    };

var Vimeo = React.createClass({
    render: function() {
        var isVimeo = this.props.current.type === 'vimeo',
            that    = this,
            data    = '';
       
        if (!isVimeo) {
            return (<div id='vimeo-wrapper' className={isVimeo ? 'container' : 'hidden'}></div>);
        }
         
        if (isVimeo) {
            data = this.props.current.data.indexOf('/') > -1 ? this.props.current.data.split('/').pop() : this.props.current.data;
        }

        Froogaloop(document.getElementById('vimeo-iframe')).addEvent('ready', function() {
            Froogaloop(document.getElementById('vimeo-iframe')).addEvent('finish', that._onEnd);
        });
            
        return (
            <div
                id='vimeo-wrapper' 
                className={isVimeo ? 'container' : 'hidden'}>
                <iframe 
                    src={isVimeo ? 'http://player.vimeo.com/video/' + data + '?autoplay=1&api=1&player_id=vimeo-iframe' : ''}
                    width={options.width} 
                    id='vimeo-iframe'
                    height={options.height}
                    frameborder="0" 
                    webkitallowfullscreen 
                    mozallowfullscreen 
                    allowfullscreen
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
