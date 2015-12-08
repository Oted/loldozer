var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for showing the information as the user gains experience
 */
var LevelModal = React.createClass({
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none'
        };

        if (!this.props.modal) {
            return (<div></div>);
        }

        return (
            <div
                onClick={this._closeModal}
                style={style}
                className='overlay'>
                <div
                    onClick={this._modalClick}
                    className='modal active'
                    style={style}
                    id='level-modal'>
                    <div
                        className='close'
                        style={{'right' : '10px','top':'5px'}}
                        onClick={this._closeModal}>
                        <i className='fa fa-times-circle fa-2x'></i>
                    </div>
                    <LevelSwitch level={this.props.level}/>
                    <a
                        className='text-button ok-item'
                        onClick={this._closeModal}>
                            CLOSE!
                    </a>
                </div>
            </div>
        );
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        var l = this.props.level;
        console.log('close level');
        LolActions.closeModal('level');
        LolActions.openModal('filter');
    },

    /**
     *  Prevent overlay from being clicked when modal is clicked
     */
    _modalClick : function(e) {
        e.stopPropagation();
    }
});

/**
 *  Switching on level
 */
var LevelSwitch = React.createClass({
    render : function() {
        switch (this.props.level) {
            case 1 :
                return (<LevelOne />);
            break;
            case 2 :
                return (<LevelTwo />);
            break;
            case 3 :
                return (<LevelThree />);
            break;
            case 4 :
                return (<LevelFour />);
            break;
            case 5 :
                return (<LevelFive />);
            break;
            default : 
                return (<LevelMax />);
        }
    }
});

/**
 *  For level one
 */
var LevelOne = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> You are level 1. </h1>
            <p> Higher levels will give you new content. </p>
            <p> By using the filters you can select what content you want to see. </p>
            <p> We will open the filters for you when you close this, you can always access them in the menu to the left. </p>
        </div>);
    }
});

/**
 *  For level two
 */
var LevelTwo = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> You are level 2, good job! </h1>
            <p> In the heart of the american internet culture lies Vine. </p>
            <p> A site where people uploads short videos about anything from live concerts to silly pranks. You just got Vine added to your filters! </p>
        </div>);
    }
});

/**
 *  For level three
 */
var LevelThree = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> You are level 3, NICE! </h1>
            <p> Whatever music genre you prefer, there is one site which has it all! </p>
            <p> Soundcloud.com is one of the largest provider of music content on the web, this is a place where both small and big artist upload their latest creations. </p>
            <p> Soundcloud just got added to you filters, happy levling! </p>
        </div>);
    }
});

/**
 *  For level four
 */
var LevelFour = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> Only true heroes become level 4! </h1>
            <p> Twitch is a site where people play videogames and stream it live for you to watch and it just got added to yout filters! </p>
            <p> Even if you are not a gamer, maybe you find it entertaining to experience new things? If not then just skip this one in the filters, but we always encourage you to expand your boundaries and discover new things here! </p>
            <p> Make sure to give it a shot! </p>
        </div>);
    }
});

/**
 *  For level four
 */
var LevelFive = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> 5 levels now! </h1>
            <p> Ever heard of Vimeo? It is now in your filters! </p>
            <p> This website has loads of videos uploaded by users and the content varies a lot. </p>
            <p> It could be anything between documentaries and someone backpacking in Asia, in any case we love the randomness it has around it. </p>
            <p> Check it your in the filters </p>
        </div>);
    }
});

/**
 *  For level later 
 */
var noop = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> Waaaa, level seven! </h1>
            <p> Contribute to the app and see your item being rated in real time! </p>
            <p> Maybe you have your own twitch channel and need a boost? Or do you have a song on soundcloud that you want to share? </p>
            <p> Or you just want to add something that makes people laugh. </p>
            <p> In any case, just click give some internet up to your left and add the url you want to share, this needs to be one of the types currently available </p>
            <p> Once added, click the eye available up to your left to see people interact! </p>
        </div>);
    }
});

/**
 *  For level max
 */
var LevelMax = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> This is the current max level. </h1>
            <p> But do not be sad, suddenly there are new items available and you will see your experience bar move again! </p>
            <p> Also, we would love to hear what you think so far about this website, please give us some 
                <a className='click-link' href='#' onClick={this._openFeedbackModal}> feedback and tell us what you would like to see on lvl 12 </a>
            </p>
        </div>);
    },

    /**
     * Closes this modal and opens 
     */
    _openFeedbackModal: function() {
        LolActions.closeModal('level');
        LolActions.openModal('feedback');
    }
});


module.exports = LevelModal;
