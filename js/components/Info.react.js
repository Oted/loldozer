var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Info = React.createClass({
    render: function() {
        
        var style = {
            width : calculateExp(this.props.interactions),
            background : calculateColour(this.props.interactions)
        };
        
        return (
            <div
                className={'info'}>
                <div
                    style={style}
                    id={'exp-bar'}> 
                </div>
                <h1>
                    {this.props.current ? this.props.current.title : ''}
                </h1>
                <small>
                    {this.props.current ? this.props.current.score ? 'score : ' + this.props.current.score : '' : ''}
                </small>
            </div>
        );
    }
});

/**
 *  Calculates the exp given interactions
 */
var calculateExp = function(interactions) {
    return (((interactions.upvotes + interactions.downvotes) * 10) % 100) + '%'
};

/**
 *  Calculates the colour given percentage
 */
var calculateColour = function(exp) {
    return "#E7BE1B";
};


module.exports = Info;
