var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for describing the webpage
 */
var FeedbackModal = React.createClass({
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
                    <div>
                        <div>
                            <h1 className='modal-title'> Welcome to getsomeinternet.com! </h1>
                            <p> GSI has declared war against boredom. We want you to never be bored again and experience things you would never seen if you where somewhere else. </p>
                            <p> Many of us has gotten used to tailored feeds and smart algorithms that pick what we see on the internet and thats very convenient for us. </p>
                            <p> However, there is also a huge drawback to this, and that is that we often miss the beauty of the wide spread content that the internet offers and hence limit our knowledge. </p>
                            <p> This website gives you an endless stream of content from all over the internet, no matter how much you have seen there is always more but you will never know what shows up next. </p>
                            <p> It could be a silly cat in space, a documentary about the cold war, the heaviest dubstep drops or a cleaver ted talk about peace in the 21st century. </p>
                            <p> You gain experience by interacting with the content and the site, as you gain levels, features and enhancements will be added to increase your experience. </p>
                        </div>
                        <a
                            className={'text-button ok-item'}
                            onClick={this._closeModal}
                            href={'#'}>
                                OK!
                        </a> 
                    </div>
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
     * Close modal
     */
    _closeModal: function() {
        console.log('close about');
        LolActions.closeModal('about');
    }
});

module.exports = FeedbackModal;
