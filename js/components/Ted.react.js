var React           = require('react'),
    options         = {
        height: '390',
        width: '640'
    };

var Ted = React.createClass({
    render: function() {
        var isTed = this.props.current.type === 'ted';
          
        return (
            <div 
                className={isTed ? 'container' : 'hidden'}>
                
                <iframe 
                    height={options.height} 
                    width={options.width} 
                    frameborder="0" 
                    scrolling="no" 
                    autoPlay
                    src={isTed ? this.props.current.data : ''}>
                </iframe>
            </div>
        );
    }
});

module.exports = Ted;
