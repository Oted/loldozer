var React       = require('react'),
    LolActions  = require('../actions/LolActions');
 
/**
 * Modal for showing the add item
 */
var AddModal = React.createClass({
    getInitialState: function() {
        return {};
    }, 
    render: function() {
        var style = {
            display : this.props.modals.add ? '' : 'none'
        };
        
        return (
            <div
                onClick={this._closeModal}
                style={style}
                className={'overlay'}>
                <div
                    className={'modal'}
                    style={style}
                    id={'add-modal'}> 
                </div>
            </div>
        );
    },

    _closeModal: function() {
        console.log('close add')
        LolActions.closeModal('add');
    }
});

module.exports = AddModal;
