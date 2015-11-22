var React       = require('react'),
    Stage       = require('./Stage.react.js'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for describing the webpage
 */
var InspectModal = React.createClass({
    render: function() {
        if (!this.props.modal) {
            return (<div></div>);
        }

        return (
            <div
                onClick={this._closeModal}
                className={'overlay'}>
                <div onClick={this._modalClick} className='modal active' id='inspect-modal'>                    
                    <div 
                        className='close'
                        style={{'right' : '10px','top':'5px'}}
                        onClick={this._closeModal}>
                        <i className='fa fa-times-circle fa-2x'></i>
                    </div>
                    <Stage
                        isMulti={false}
                        isMobile={this.props.isMobile}
                        performers={[]}
                        seen={[]}
                        current={this.props.target}
                    />
                    <i
                        className={'text-button ok-item'}
                        onClick={this._closeModal}>
                            CLOSE!
                    </i> 
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
        console.log('close inspect');
        LolActions.closeModal('inspect');
    }
});

module.exports = InspectModal;
