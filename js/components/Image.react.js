var React       = require('react');

/**
 * The navigation
 */
var Image = React.createClass({
    render: function() {
        return (
            <div 
                className={this.props.current.type === 'img' ? '' : 'hidden'}>
                <img 
                    id={'image-container'}
                    src={this.props.current.data}>
                </img>
            </div>
        );
    }
});

module.exports = Image;
