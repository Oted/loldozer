var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Info = React.createClass({
    render: function() {
        return (
            <div
                className={'info'}>
                <h1>
                    {this.props.current ? this.props.current.title : ''}
                </h1>
                <small>
                    {this.props.current ? 'score : ' + this.props.current.score : ''}
                </small>
            </div>
        );
    }
});

module.exports = Info;
