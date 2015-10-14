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
            <div className='stage'> 
                {this._getTarget()}
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
    },

    /**
     *  Switch on the type and return the proper target
     */
    _getTarget: function() {
        switch (this.props.current.type) {
            case "soundcloud" :
                return <Soundcloud
                    isMulti = {this.props.isMulti}
                    autoplay = {this.props.autoplay}
                    current = {this.props.current}
                />
            break;
            case "vine" :
                return <Vine 
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "youtube" :
                return <Youtube
                    isMulti = {this.props.isMulti}
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
            break;
            case "vimeo" :
                return <Vimeo
                    isMulti = {this.props.isMulti}
                    autoplay = {this.props.autoplay}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
            break;
            case "gif" :
                return <Gif
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "img" : 
                return <Image
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "twitch" :
                return <Twitch
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "video" : 
                return <Video
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            default : 
                return <div></div>
        }
    }
});

module.exports = Stage;
