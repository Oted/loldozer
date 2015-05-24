var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for showing the information as the user gains experience
 */
var LevelModal = React.createClass({
    //shouldComponentUpdate: function(nextProps, nextState) {
        //if the level has increased, this modal should show
        //return this.props.level < nextProps.level;
    //},
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none',
        };

        if (!this.props.modal) {
            return (
                <div
                    onClick={this._closeModal}
                    style={style}
                    className={'overlay'}>
                </div>
            );
        }

        console.log(this.props);

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
                            OK!
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
            <h1 className='title'> Congrats, you have reached level one!! </h1>
            <p> Welcome to getsomeinternet.com, a declared war against boredom sence 2015. </p>
            <p> GSI gives you more content then you can ever consume, meaning that how ever much you see, there is always more. </p>
            <p> You gain level andexperience by interacting with your content and the site in different ways, as you gain level and experience, features and enhancements will be added to increase your experience! </p>
            <p> This level you gained the vote buttons, use them to rate the content you see. </p>
            <p> By rating items you help people knowing how good their added content are and also provide data for the highscores! </p>
        </div> 
    );
  }
});


/**
 *  For max level
 */
var LevelMax = React.createClass({
  render: function() {
    return (
        <div>
            <h1> WOOOW MAX LEVEL </h1>
        </div> 
    );
  }
});

module.exports = LevelModal;
