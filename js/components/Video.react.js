var React           = require('react'),
    options         = {
        height: '390',
        width: '640'
    };

/**
 * The navigation
 */
var Video = React.createClass({
    render: function() {
        return (
            <div 
                className={this.props.isMulti ? 'scroll-container' : 'container'}>
                <video 
                    autoPlay="autoplay"
                    preload='auto' 
                    controls
                    loop
                    type='video/mp4' 
                    height={options.height} 
                    width={options.width}
                    src={this.props.current.data}> 
                </video>
            </div>
        );
    }
});

module.exports = Video;
