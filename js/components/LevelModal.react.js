var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for showing the information as the user gains experience
 */
var LevelModal = React.createClass({
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none',
        };

        if (!this.props.modal) {
            return (<div></div>);
        }

        return (
            <div
                onClick={this._closeModal}
                style={style}
                className={'overlay'}>
                <div
                    onClick={this._modalClick}
                    className={'modal active'}
                    style={style}
                    id={'level-modal'}>                    
                    <div 
                        className='close'
                        style={{'right' : '10px','top':'5px'}}
                        onClick={this._closeModal}>
                        <i className='fa fa-times-circle fa-2'></i>
                    </div>
                    <LevelSwitch level={this.props.level} />
                    <a
                        className={'text-button ok-item'}
                        onClick={this._closeModal}
                        href={'#'}>
                            OKAY
                    </a>
                </div>
            </div>
        );
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        console.log('close level');
        LolActions.closeModal('level');
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
            case 4 :
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
        return (
            <div>
                <h1 className='title'> Welcome to getsomeinternet.com  </h1>
                <p> Enjoy an endless stream of content from all over the internet, no matter how much you have seen there is always more. </p>
                <p> You gain experience by interacting with the content and the site in different ways, as you gain levels, features and enhancements will be added to increase your experience! </p>
                <p> In other words, the more you stay here, the more fun you will have! </p>
                <p> Level one gave you the vote buttons, use them to rate the content you see. </p>
                <p> By rating items you help people knowing how good their added content are and also provide data for the highscores! </p>
            </div>
        );
    }
});

/**
 *  For level two
 */
var LevelTwo = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='title'> You are level two, NICE! </h1>
                <p> Well done! You can now view the highscores section up in the left corner </p>
                <p> The highscores show you the currently highest rated items, this list changes constantly because new items are added and old is removed at a fast rate. </p>
                <p> You can view the items in the highscore list by clicking on them. </p>
            </div>
        );
    }
});

/**
 *  For level three
 */
var LevelThree = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='title'> Woooop wooop, level three! </h1>
                <p> Well played sir, you  are a true hero and can now filter items depending on what you prefer.</p>
                <p> Check filters up to the left and try it out, the numbers beside the types are the number of current available items of that type. </p>
                <p> Note that more types of content might appear here as you gain experience! </p>
            </div>
        );
    }
});

/**
 *  For level four
 */
var LevelFour = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='title'> Waaaa, level four! </h1>
                <p> Contribute to the app and see your item being rated in real time! </p>
                <p> Maybe you have your own twitch channel and need a boost? Or do you have a song on soundcloud that you want to share? </p>
                <p> Or you just want to add something that makes people laugh. </p>
                <p> In any case, just click give some internet up to your left and add the url you want to share, this needs to be one of the types currently available </p>
                <p> Once added, click the eye available up to your left to see people interact! </p>
            </div>
        );
    }
});

/**
 *  For level five
 */
var LevelFive = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='title'> 5 levels now! </h1>
                <p> Use the arrow buttons to vote up/down or see next/previous! </p>
            </div>
        );
    }
});


/**
 *  For level max
 */
var LevelMax = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='title'> This is the current max level. </h1>
                <p> But don't be sad, suddenly there are new features available </p>
            </div>
        );
    }
});


module.exports = LevelModal;
