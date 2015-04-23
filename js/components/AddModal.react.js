var React       = require('react'),
    LolActions  = require('../actions/LolActions'),
    validator   = require('validator'),
    modalClick  = false;
 
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
                    onClick={this._modalClick}
                    className={'modal'}
                    style={style}
                    id={'add-modal'}>
                    <h1 style={{'color' : 'white'}}>
                        Add your own item and see what people think of it!
                    </h1>
                    <input
                        type={'text'}
                        id={'add-title'}
                        placeholder={'a title'}
                        className={'text-button add-item add-text'}>
                    </input>
                    <input
                        type={'text'}
                        id={'add-url'}
                        placeholder={'the url'}
                        className={'text-button add-item add-text'}>
                    </input>
                    <a
                        className={'text-button add-item'}
                        onClick={this._addItemClick}
                        href={'#'}>
                            ADD ITEM
                    </a>
                </div>
            </div>
        );
    },

    /**
     *  Prevent overlay from being clicked when modal is clicked
     */
    _addItemClick : function() {
        var title   = document.querySelector('#add-title').value,
            url     = document.querySelector('#add-url').value;

        if (!title || title.length < 3) {
            alert('no title provided');
        }
        
        if (!validator.isURL(url)) {
            alert('no (real) url provided');
        }

        LolActions.addItem({title : title, url : url});
        LolActions.closeModal('add');
    },

    /**
     *  Prevent overlay from being clicked when modal is clicked
     */
    _modalClick : function() {
        modalClick = true;
        setTimeout(function(){
            modalClick = false;
        }, 100);
    },

    /**
     * Close modal
     */
    _closeModal: function() {
        if (!modalClick) {
            console.log('close add')
            LolActions.closeModal('add');
        }
    }
});

module.exports = AddModal;
