var React           = require('react'),
    options         = {
        height: '390',
        width: '640'
    };

var Twitch = React.createClass({
    render: function() {
        var isTwitch = this.props.current.type === 'twitch';
          
        return (
            <div 
                className={isTwitch ? 'container' : 'hidden'}>
                
                <iframe 
                    height={options.height} 
                    width={options.width} 
                    frameborder="0" 
                    scrolling="no" 
                    autoplay
                    src={isTwitch ? this.props.current.data : ''}>
                </iframe>          
            </div>
        );
    }
});

module.exports = Twitch
