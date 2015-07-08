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
                        <i className='fa fa-times-circle fa-2x'></i>
                    </div>
                    <LevelSwitch level={this.props.level} />
                    <a
                        className={'text-button ok-item'}
                        onClick={this._closeModal}
                        href={'#'}>
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
            case 5 :
                return (<LevelFive />);
            break;
            case 6 :
                return (<LevelSix />);
            break;
            case 7 :
                return (<LevelSeven />);
            break;
            case 8 :
                return (<LevelEight />);
            break;
            case 9 :
                return (<LevelNine />);
            break;
            case 10 :
                return (<LevelTen />);
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
            <h1 className='modal-title'> Welcome to GetSomeInternet, you are level 1! </h1>
            <p> GSI has declared war against boredom, and you just joined the army. We want you to experience things you would never seen if you where somewhere else. </p>
            <p> Many of us has gotten used to tailored feeds and smart algorithms that pick what we experience, thats very convenient for us. </p>
            <p> However, there is also a huge drawback to this, and that is that we often miss the beauty of the wide spread content that the internet offers and hence limit our knowledge. </p>
            <p> This website gives you an endless stream of content from all over the internet, no matter how much you have seen there is always more but you will never know what shows up next. </p>
            <p> It could be a silly cat in space, a documentary about the cold war, the heaviest dubstep drops or a cleaver ted talk about peace in the 21st century. </p>
            <p> You gain experience by interacting with the content and the site, as you gain levels, features and enhancements will be added to increase your experience. </p>
            <p> This level gave you the vote buttons, use them to rate the content you see. </p>
            <p> Why vote at all? Another level will tell... </p>
        </div>);
    }
});

/**
 *  For level two
 */
var LevelTwo = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className='modal-title'> LVL 2! </h1>
                <p> Sometimes we just want to hear a nice tune, sometimes we want to see some imagery and sometimes we want it all! </p>
                <p> It is okay to feel like this, in fact we encourage you to filter out what types of content you do not wish to have in the frame for the moment. </p>
                <p> You will still never know what shows up after next click, but you will be able to control what kind of content that shows up </p>
                <p> Use the filters in the menu up to the left to exclude or include different types of content, the numbers beside the types are the number of current available items of that type. </p>
                <p> As you gain levels, new types will appear in the filters. </p>
            </div>
        );
    }
});

/**
 *  For level three
 */
var LevelThree = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> You are level 3, good job! </h1>
            <p> In the heart of the american internet culture lies Vine. </p>
            <p> A site where people uploads short videos about anything from live concerts to silly pranks. You just got Vine added to your filters, make sure to check it out! </p>
            <p> 
                Also, we would love to hear from you, please could you tell us what you think about this place and give us some 
                <a className='click-link' href='#' onClick={this._openFeedbackModal}> feedback! </a> 
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

/**
 *  For level four.
 */
var LevelFour = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> 4! </h1>
            <p> Would you like to know more about a stupendous image of that 
            <a className='click-link' target='_blank' href='https://s-media-cache-ak0.pinimg.com/736x/a8/77/d8/a877d8881cbfee402c202c104022ab32.jpg'> cat in space</a>? Maybe you actually miss the infinite walls of text with all the opinions in the comment sections? And maybe you will be able to comment here as well, one day. </p>
            <p> The automated scrapers behind this website work day and night to provide you with the latest content from the internet, and there is always a source from where it came. </p>
            <p> Press the link button above the content to get to the source. </p>
        </div>);
    }
});


/**
 *  For level five
 */
var LevelFive = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> You are level 5, NICE! </h1>
            <p> Whatever music genre you prefer, there is one site which has it all! </p>
            <p> Soundcloud.com is one of the largest provider of music content on the web, this is a place where both small and big artist upload their latest creations. </p>
            <p> Soundcloud just got added to you filters, happy levling! </p>
        </div>);
    }
});


/**
 *  For level six
 */
var LevelSix = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> 6 </h1>
            <p> What is the fuzz about the voting, and why should one vote at all? </p>
            <p> The races to the frontpages or the highscores in this case is a big deal, at least when it is your own content. </p> 
            <p> Maybe one day, you will be able to see your own content get rated. Until then stay tuned and see whats currently the best stuff. </p>
            <p> Click the highscores section up in the left corner. </p>
            <p> The highscores show you the currently highest rated items, this list changes rapidly when new items are added and old removed. </p>
        </div>);
    }
});

/**
 *  For level seven
 */
var LevelSeven = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> Only true heroes become level 7! </h1>
            <p> twitch.com is a site where people play videogames and stream it live for you to watch and it just got added to yout filters! </p>
            <p> Even if you are not a gamer, maybe you find it entertaining to experience new things? If not then just skip this one in the filters, but we always encourage you to expand your boundaries and discover new things here! </p>
            <p> Make sure to give it shot! </p>
        </div>);
    }
});

/**
 *  For level eight
 */
var LevelEight = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> 8 levels now! </h1>
            <p> You know the feeling when you clicked away something but then want to see it again? </p>
            <p> Well now you can! </p>
            <p> Use the arrow buttons on a keyboard to vote up/down or see next/previous! </p>
        </div>);
    }
});

/**
 *  For level nine
 */
var LevelNine = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> 9 levels now! </h1>
            <p> Ever heard of vimeo? It is not in your filters! </p>
            <p> This website has loads of videos uploaded by users and the content varies a lot. </p>
            <p> It could be anything between documentaries and someone backpacking in Asia, in any case we love the randomness it has around it. </p>
            <p> Check it your in the filters </p>
        </div>);
    }
});

/**
 *  For level ten
 */
var LevelTen = React.createClass({
    render: function() {
        return (<div>
            <h1 className='modal-title'> Level 10! </h1>
            <p> Some days, you are too tired to even click, or maybe you just do not really care what is on, as long as something is on! </p>
            <p> For these days, you can now toggle the autoplay button for playable items (youtube, vimeo, soundcloud), try to use it like a radio feature for any combinations of these content types. </p>
            <p> Content seen this way will not be voted. </p>
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
            <p> But do not be sad, suddenly there are new features available and you will see your experience bar move again! </p>
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
