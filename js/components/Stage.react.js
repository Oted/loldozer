var React           = require('react'),
    LolActions      = require('../actions/LolActions');
    ReactPropTypes  = React.PropTypes;

var Youtube         = require('../components/Youtube.react'),
    Soundcloud      = require('../components/Soundcloud.react'),
    Image           = require('../components/Image.react'),
    Vimeo           = require('../components/Vimeo.react'),
    Twitch          = require('../components/Twitch.react'),
    Vine            = require('../components/Vine.rect'),
    Video           = require('../components/Video.react'),
    Gif             = require('../components/Gif.react');

/**
 *  Create the stage where performers go
 */
var Stage = React.createClass({
    getInitialState : function() {
        return {
            'pushed' : false,
            'time' : this._getRequiredViewTime(this.props.current.type)
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (!nextProps.isFocus && this.counter) {
            clearTimeout(this.counter);
        }

        if (nextProps.isFocus && !this.counter && !this.state.pushed) {
            var that = this;

            this.counter = setTimeout(function(target) { LolActions.viewedItem(nextProps.current) }, this.state.time, nextProps.current);
        }
    },

    componentWillUnmount: function() {
        if (this.counter) {
            clearTimeout(this.counter); 
        }
    },

    /**
    * @return {object}
    */
    render: function() {
        if (!this.props.current || !this.props.current.type) {
            return (<div></div>);
        }

  	    return (
            <div className={this.props.isMulti ?  '' : 'stage'}> 
                {this._getTarget()}
           </div>
  	    );
    },

    _getRequiredViewTime : function(type) {
        if (type === 'gif') {
            return 6500;
        }

        if (type === 'img') {
            return 6000;
        }

        if (type === 'video') {
            return 9000;
        }
   
        return 14000;
    },

    /**
     *  Switch on the type and return the proper target
     */
    _getTarget: function() {
        switch (this.props.current.type) {
            case "soundcloud" :
                return <Soundcloud
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                    isMobile= {this.props.isMobile}
                />
            break;
            case "vine" :
                return <Vine 
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                    isMobile= {this.props.isMobile}
                />
            break;
            case "youtube" :
                return <Youtube
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
            break;
            case "vimeo" :
                return <Vimeo
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
            break;
            case "gif" :
                return <Gif
                    isFocus = {this.props.isFocus}
                    isMobile= {this.props.isMobile}
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "img" : 
                return <Image
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    isMobile= {this.props.isMobile}
                    current = {this.props.current}
                />
            break;
            case "twitch" :
                return <Twitch
                    isFocus = {this.props.isFocus}
                    isMulti = {this.props.isMulti}
                    current = {this.props.current}
                />
            break;
            case "video" : 
                return <Video
                    isFocus = {this.props.isFocus}
                    isMobile= {this.props.isMobile}
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
