var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for showing the information as the user gains experience
 */
var FeedbackModal = React.createClass({
    getInitialState : function() {
        return {
            sent : false
        };
    },
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
                <div onClick={this._modalClick} className={'modal active'} style={style} id={'feedback-modal'}>                    
                    <div 
                        className='close'
                        style={{'right' : '10px','top':'5px'}}
                        onClick={this._closeModal}>
                        <i className='fa fa-times-circle fa-2x'></i>
                    </div>
                    {!this.state.sent ?
                        <div>
                            <div>
                                <h1 className='title'> We value your opinion! </h1>
                                <p> As one of our first users we want to make sure that you enjoy this place. your opinion is gold to us and any feedback given will be carefully considered and eventually implemented. </p>
                                <p> Tell us about what changes and improvements you would like to see, or any bugs you have experienced while being here.</p>
                                <textarea id='feedback-text' rows="8"></textarea>
                                <p> If you would like us to come back to you, give us your email! </p>
                                <input id='feedback-email' placeholder='your@email.com'></input>
                            </div>
                            <a
                                className={'text-button ok-item'}
                                onClick={this._sendFeedback}
                                href={'#'}>
                                    SEND!
                            </a> 
                        </div> : 
                        <a
                            className={'add-status'}
                            style={{'color': 'green'}}>
                            <i className={'fa fa-check fa-3x'}></i>
                            <p>
                                Thank you for your feedback!
                            </p>
                        </a>
                    } 
                </div>
            </div>
        );
    },

    /**
     *  Prevent overlay from being clicked when modal is clicked
     */
    _modalClick : function(e) {
        e.stopPropagation();
    },

    /**
     *  Send feedback
     */
    _sendFeedback : function() {
        var message = document.getElementById('feedback-text').value;
        var email   = document.getElementById('feedback-email').value;
       
        if (!message || message.length < 4) {
            return alert('not much of a message m8.');
        }

        LolActions.sendFeedbackMessage({'message' : message, 'email' : email});
        this.setState({sent : true});
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        console.log('close feedback');
        LolActions.closeModal('feedback');
    }
});

module.exports = FeedbackModal;
