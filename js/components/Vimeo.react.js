var React           = require('react'),
    VimeoReact      = require('react-video'),
    options         = {
        height: '390',
        width: '640'
    };

var Vimeo = React.createClass({
    render: function() {
        var isVimeo = this.props.current.type === 'vimeo',
            data    = '';
        
        if (isVimeo) {
            data = this.props.current.data.indexOf('/') > -1 ? this.props.current.data.split('/').pop() : this.props.current.data;
        }

        return (
            <div 
                className={isVimeo ? 'container' : 'hidden'}>
                <iframe 
                    src={isVimeo ? 'http://player.vimeo.com/video/' + data + '?autoplay=1' : ''}
                    width={options.width} 
                    height={options.height}
                    frameborder="0" 
                    webkitallowfullscreen 
                    mozallowfullscreen 
                    allowfullscreen
                ></iframe> 
            </div>
        );

        return (
            <VimeoReact 
                from={'vimeo'}
                videoId={"6540668"}
                onError={this._onError}
                //videoId={isVimeo ? 'https://www.youtube.com/watch?v=' + this.props.current.data : ''}
            />
        );
    },
    _onError : function(err) {
        console.log('error loading vimeo', err);
    }
});

module.exports = Vimeo;
