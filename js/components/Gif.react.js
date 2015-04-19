var React       = require('react');

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        var isGif = this.props.current.type === 'gif';
        
        return (
            <div 
                className={isGif ? 'container' : 'hidden'}>
                <img 
                    src={isGif ? this.props.current.data : ''}>
                </img>
            </div>
        );
    }
});

module.exports = Gif;
