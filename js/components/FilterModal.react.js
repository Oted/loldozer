var React       = require('react'),
    LolActions  = require('../actions/LolActions'),
    edited      = false;

/**
 * Modal for showing the highscores
 */
var FilterModal = React.createClass({
    getInitialState : function(){
        return {'filters' : this.props.filters}
    },
    render: function() {
        var style = {
            display : this.props.modal ? 'block' : 'none'
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

        return (
            <div
                onClick={this._closeModal}
                style={style}
                className={'overlay'}>
                <div
                    onClick={this._modalClick}
                    className={'modal active'}
                    style={style}
                    id={'filter-modal'}>
                    <div>
                        <ItemTable selected={this.props.filters} all={this.props.info.counts} />
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
        console.log('close filter');

        if (edited) {
            console.log('need to refresh');
            edited = false;
            LolActions.refresh();
        }

        LolActions.closeModal('filter');
    }
});

/**
 *  Subclass for creating the item
 */
var ItemRow = React.createClass({
    render: function() {
        return (
            <li onClick={this._clickTitle} className={this.props.selected.indexOf(this.props.object._id) > -1 ? 'filter-item active' : 'filter-item'}>
                <div className='title'>
                    {this.props.object._id}
                </div>
                <a className='count'>
                    {this.props.object.count}
                </a>
            </li>
        );
    },

    /**
     *  On title click
     */
    _clickTitle : function(e) {
        var target = this.props.object._id;
        edited = true;
        LolActions.updateFilters(target);
    }
});

/**
 *  Sub class for creating the list
 */
var ItemTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.all.forEach(function(object) {
            rows.push(<ItemRow key={object._id} selected={this.props.selected} object={object} />);
        }.bind(this));
        return (
           <ul id='filter-list'>
                {rows}
           </ul>
        );
    }
});


module.exports = FilterModal;
