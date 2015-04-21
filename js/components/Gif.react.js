var React       = require('react');

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        var isGif = this.props.current.type === 'gif' || this.props.current.type === 'gifv';

        if (this.props.current.type === 'gifv') {
            this.props.current.data = this.props.current.data.replace('.gifv', '.gif');
        }
        
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
