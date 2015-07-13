var React           = require('react'),
    LolActions      = require('../actions/LolActions');
    ReactPropTypes  = React.PropTypes;

var Youtube         = require('../components/Youtube.react'),
    Soundcloud      = require('../components/Soundcloud.react'),
    Image           = require('../components/Image.react'),
    Vimeo           = require('../components/Vimeo.react'),
    Twitch          = require('../components/Twitch.react'),
    Vine            = require('../components/Vine.rect.js'),
    Video           = require('../components/Video.react'),
    Gif             = require('../components/Gif.react');

/**
 *  Create the stage where performers go
 */
var Stage = React.createClass({
    propTypes: {
        current: ReactPropTypes.object.isRequired
    },

    /**
    * @return {object}
    */
    render: function() {
        if (!this.props.current || !this.props.current.type) {
            return (<div></div>);
        }

  	    return (
            <div id='stage' key='stage'>
                <Soundcloud
                    key='stage-1'
                    autoplay = {this.props.autoplay}
                    current = {this.props.current}
                />
                <Vine 
                    current = {this.props.current}
                />
                <Youtube
                    key='stage-2'
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
                <Vimeo
                    key='stage-3'
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
                <Gif
                    key='stage-4'
                    current = {this.props.current}
                />
                <Image
                    key='stage-5'
                    current = {this.props.current}
                />
                <Twitch
                    key='stage-6'
                    current = {this.props.current}
                />
                <Video
                    key='stage-7'
                    current = {this.props.current}
                />
            </div>
  	    );
    },

    /**
     *  Next arrow was clicked.
     */
    _onNext: function() {
        LolActions.next();
    },

    _onPrevious: function() {
        LolActions.previous();
    },

    /**
    * Event handler for 'change' events coming from the LolStore
    */
    _onChange: function() {
        this.setState(getLolState());
    }
});

module.exports = Stage;
