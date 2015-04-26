var React           = require('react'),
    LolActions      = require('../actions/LolActions');
    ReactPropTypes  = React.PropTypes;

var Youtube         = require('../components/Youtube.react'),
    Soundcloud      = require('../components/Soundcloud.react'),
    Image           = require('../components/Image.react'),
    Vimeo           = require('../components/Vimeo.react'),
    Video           = require('../components/Video.react'),
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
        if (!this.props.current || !this.props.current.type) {
            console.log('No current...');
            return (
                <div id={'stage'}></div>
            );
        }
            
        var type = this.props.current.type;

  	    return (
            <div id={'stage'}>
                <a
                    className={'fa fa-angle-left arrow-button fa-5'}>
                </a>
                <Soundcloud
                    current = {this.props.current}
                />
                <Youtube
                    current = {this.props.current}
                />
                <Vimeo
                    current = {this.props.current}
                />
                <Gif
                    current = {this.props.current}
                />
                <Image
                    current = {this.props.current}
                />
                <Video
                    current = {this.props.current}
                />
                <a
                    className={'fa fa-angle-right arrow-button fa-5'}>
                </a>
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
