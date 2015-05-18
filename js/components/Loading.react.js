var React       = require('react');

/**
 * The navigation
 */
var Loading = React.createClass({
    render: function() {
        var image = 'common/loading' + (Math.floor(Math.random() * 7) + 1) + '.gif'
        return (
            <img
                className={'loading'}
                src={image}>
            </img>
        );
    }
});

module.exports = Loading;
