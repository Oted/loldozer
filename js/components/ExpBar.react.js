var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var ExpBar = React.createClass({
    render: function() {
        var style = {
            width : this.props.experience + '%',
            background : calculateColour(this.props.experience)
        };
       
        var niceExp = parseFloat(this.props.experience).toFixed(1);
        
        return (
            <div style={style} id={'exp-bar'}>
                {this.props.experience ? <p id='exp-bar-text'> {niceExp}% </p> : ''}
            </div>
        );
    }
});

/**
 *  Calculates the colour given percentage
 */
var calculateColour = function(exp) {
    var red     = 0,
        green   = 0;
    
    red     = exp <= 50 ? 1 : 1 - (((exp - 50) * 2) / 100);
    green   = exp >= 50 ? 1 : ((exp * 2) / 100);

    var rgb = 'rgb(' + (Math.floor(255 * red)) + ',' + (Math.floor(255*green)) + ',0)'
    return rgb;
};

module.exports = ExpBar;
