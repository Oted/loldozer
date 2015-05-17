var React           = require('react'),
    options         = {
        height: '480',
        width: '480'
    };

var Vine = React.createClass({
    render: function() {
        var isVine = this.props.current.type === 'vine';
          
        return (
            <div 
                className={isVine ? 'container' : 'hidden'}>
                <iframe 
                    height={options.height} 
                    width={options.width} 
                    preload='auto' 
                    autoPlay
                    frameBorder="0" 
                    src={isVine ? this.props.current.data + '/embed/simple?audio=1&auto=1&autoplay=1' : ''}>
                </iframe>
                <script src="https://platform.vine.co/static/scripts/embed.js"></script>
            </div>
        );
    }
});

module.exports = Vine;
