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
        var isVideo = this.props.current.type === 'video';
        
        if (!isVideo) {
            return (<div></div>); 
        }   

        return (
            <div 
                className={isVideo ? 'container' : 'hidden'}>
                <video 
                    controls
                    loop 
                    autoPlay
                    preload='auto' 
                    type='video/mp4' 
                    height={options.height} 
                    width={options.width}
                    src={isVideo ? this.props.current.data : ''}> 
                </video>
            </div>
        );
    }
});

module.exports = Video;
