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
        if (!this.props.modal) {
            return (<div keys='filter-modal'></div>);
        }

        var style = {
                display : this.props.modal ? 'block' : 'none'
            }, 
            //store the filters
            filters = this.props.filters,
            
            //reduce to the visible filters
            available = this.props.info.counts.filter(function(i) {
                if (filters[i._id] === 0) {
                    return true;
                }
                
                if (!filters[i._id] || filters[i._id] === -1) {
                    return false;
                }
            
                return true; 
            });

        return (
            <div
                onClick={this._closeModal}
                style={style}
                key='filter-modal'
                className={'overlay'}>
                <div
                    onClick={this._modalClick}
                    className={'modal active'}
                    style={style}
                    id={'filter-modal'}>
                    <h1 className='modal-title'> Select the wanted content </h1>
                    <div 
                        className='close'
                        style={{'right' : '10px','top':'5px'}}
                        onClick={this._closeModal}>
                        <i className='fa fa-times-circle fa-2x'></i>
                    </div>
                    <div>
                        <ItemTable selected={filters} available={available} unknowns={this.props.info.counts.length - available.length} />
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
 *  Sub class for creating the list
 */
var ItemTable = React.createClass({
    render: function() {
        var rows = [];
        
        this.props.available.forEach(function(object) {
            rows.push(<ItemRow key={object._id} selected={this.props.selected} object={object} />);
        }.bind(this));

        for (var i = 0; i < this.props.unknowns; i++) {
            rows.push(<ItemRow key={i} />);
        }

        return (
           <ul id='filter-list'>
                {rows}
           </ul>
        );
    }
});

/**
 *  Subclass for creating the item
 */
var ItemRow = React.createClass({
    render: function() {
        //if this is a unknown one
        if (!this.props.object) {
            return (
                <li style={{"background-color" : "#151515"}}
                    className='filter-item'>
                    <div className='title'>
                        unknown
                    </div>
                    <i
                    style={{color : "#7f7f00", float : "right"}}
                    className='fa fa-lock'>
                    </i>
                </li>
            );
        }

        var isSelected = this.props.selected[this.props.object._id] === 1;

        return (
            <li onClick={this._clickTitle} className={isSelected ? 'filter-item active' : 'filter-item'}>
                <div className='title'>
                    {this.props.object._id} ({this.props.object.count})
                </div>
                <a className='count'>
                    
                </a>
                <i
                    style={isSelected ? {color : "green", float : "right"} : {color : "red", float : "right"}}
                    className={isSelected ? 'fa fa-check' : 'fa fa-close'}>
                </i>
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



module.exports = FilterModal;
