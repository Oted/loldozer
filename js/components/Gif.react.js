var React = require('react');

/**
 * The navigation
 */
var Gif = React.createClass({
    render: function() {
        return (
            <div 
                className={this.props.current.type === 'gif' ? '' : 'hidden'}>
                <img 
                    id={'image-container'}
                    src={this.props.current.data}>
                </img>
            </div>
        );
    }
});

module.exports = Gif;
