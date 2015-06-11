var React           = require('react'),
    LolActions      = require('../actions/LolActions');
    ReactPropTypes  = React.PropTypes;

var Youtube         = require('../components/Youtube.react'),
    Soundcloud      = require('../components/Soundcloud.react'),
    Image           = require('../components/Image.react'),
    Vimeo           = require('../components/Vimeo.react'),
    Twitch          = require('../components/Twitch.react'),
    Ted             = require('../components/Ted.react'),
    Vine            = require('../components/Vine.rect.js'),
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
                <div id='stage'></div>
            );
        }

  	    return (
            <div id='stage'>
                <a
                    onClick={this._onPrevious}
                    className={this.props.seen.length > 0 && !this.props.isMobile ? 'fa fa-angle-left arrow-button fa-5' : 'hidden'}>
                </a>
                <Soundcloud
                    autoplay = {this.props.autoplay}
                    current = {this.props.current}
                />
                <Vine 
                    current = {this.props.current}
                />
                <Youtube
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
                <Vimeo
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
                <Gif
                    current = {this.props.current}
                />
                <Image
                    current = {this.props.current}
                />
                <Twitch
                    current = {this.props.current}
                />
                <Ted
                    current = {this.props.current}
                />
                <Video
                    current = {this.props.current}
                />
                <a
                    onClick={this._onNext}
                    className={this.props.seen.length > 0 && !this.props.isMobile ? 'fa fa-angle-right arrow-button fa-5' : 'hidden'}>
                </a>
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
