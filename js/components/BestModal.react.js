var React       = require('react'),
    LolActions  = require('../actions/LolActions');


/**
 * Modal for showing the highscores
 */
var BestModal = React.createClass({
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none'
        };

        // console.log('YAAAAAY :D',this.props.data);

        if (!this.props.modal) {
            return (
                <div
                    onClick={this._closeModal}
                    style={style}
                    className={'overlay'}>
                </div>
            );
        }

        console.log('YAAAY with best ', this.props);

        return (
            <div
                onClick={this._closeModal}
                style={style}
                className={'overlay'}>
                <div
                    onClick={this._modalClick}
                    className={'modal active'}
                    style={style}
                    id={'best-modal'}>
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
        console.log('close best');
        LolActions.closeModal('best');
    }
});

module.exports = BestModal;
