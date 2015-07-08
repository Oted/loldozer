var React       = require('react'),
    LolActions  = require('../actions/LolActions'),
    validator   = require('validator'),
    addClick    = false;
 
/**
 * Modal for showing the add item
 */
var AddModal = React.createClass({
    render: function() {
        var style = {
            display : this.props.modal ? '' : 'none'
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
                    className={'modal'}
                    style={style}
                    id={'add-modal'}>
                    <div
                        style={addClick ? {display : 'none'} : {}}>
                        <div 
                            className='close'
                            style={{'right' : '10px','top':'5px'}}
                            onClick={this._closeModal}>
                            <i className='fa fa-times-circle fa-2x'></i>
                        </div>
                        <h1 style={{'color' : 'white'}}>
                            Share your favorite links, win the internet.
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
                                GIVE
                        </a>
                    </div>
                    <div
                        style={!addClick ? {display : 'none'} : {}}>
                        <a
                            className={'add-status'}
                            onClick={this._reset}
                            style={this.props.status === 422 ? {color: 'red'} : {display : 'none'}}>
                            <i
                                className={'fa fa-close fa-3x'}>
                            </i>
                            <p>
                                The item already exists!
                            </p>
                        </a>
                        <a
                            className={'add-status'}
                            style={this.props.status === 200 ? {color: 'green'} : {display : 'none'}}>
                            <i
                                className={'fa fa-check fa-3x'}>
                            </i>
                            <p>
                                Item added!
                            </p>
                        </a>
                    </div>
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
            return;
        }
        
        if (!validator.isURL(url)) {
            alert('no (real) url provided');
            return;
        }
        
        addClick = true;
        LolActions.addItem({title : title, url : url});
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
        document.querySelector('#add-title').value = '';
        document.querySelector('#add-url').value = '';
        addClick = false; 
        this.props.status = null;
        console.log('close add')
        LolActions.closeModal('add');
    }
});

module.exports = AddModal;
