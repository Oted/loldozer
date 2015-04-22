var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <footer>
                <p> 
                    Loldozer, a declaration of war against boredom since 2015.
                </p>
            </footer>
        );
    }
});

module.exports = Nav;
