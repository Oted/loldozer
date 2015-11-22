var ReactDOM    = require('react-dom'),
    React       = require('react'),
    LolApp      = require('./components/LolApp.react');

/**
 *
 */
var Wrapper = React.createClass({
    render() {
        return <LolApp />;
    }
})
 
ReactDOM.render(<Wrapper />, document.getElementById('lolapp'));
