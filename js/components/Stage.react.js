var React           = require('react'),
    LolActions      = require('../actions/LolActions');
    ReactPropTypes  = React.PropTypes;

var Youtube         = require('../components/Youtube.react'),
    Soundcloud      = require('../components/Soundcloud.react'),
    Image           = require('../components/Image.react'),
    Gif             = require('../components/Gif.react');

/**
 *  Create the stage where performers go
 */
var Stage = React.createClass({
    propTypes: {
        all: ReactPropTypes.object.isRequired,
        current: ReactPropTypes.object.isRequired
    },

    /**
    * @return {object}
    */
    render: function() {
        if (!this.props.current) {
            console.log('No current, simulating next...');
            return (
                <div id={'stage'}></div>
            );
        }
            
        var type = this.props.current.type;

  	    return (
            <div id={'stage'}>
                <Soundcloud
                    current = {this.props.current}
                />
                <Youtube
                    current = {this.props.current}
                />
                <Gif
                    current = {this.props.current}
                />
                <Image
                    current = {this.props.current}
                />
            </div>
  	    );
    },

    /**
    * Event handler for 'change' events coming from the LolStore
    */
    _onChange: function() {
        this.setState(getLolState());
    }
});

module.exports = Stage;
