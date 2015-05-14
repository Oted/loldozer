var React       = require('react'),
    Stage       = require('./Stage.react.js'),
    LolActions  = require('../actions/LolActions');

/**
 * Modal for showing the highscores
 */
var BestModal = React.createClass({
    getInitialState : function() {
        return { best : {}};
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
                    id={'best-modal'}>
                    <div>
                        <ul id='best-nav'>
                            <li className='title'> 
                                <a>
                                    lol
                                </a>
                            </li> 
                            <li className='title'> 
                                <a>
                                    lol
                                </a>
                            </li> 
                            <li className='title'> 
                                <a>
                                    lol
                                </a>
                            </li> 
                        </ul>
                        <Stage seen={[]} current={this.state.best} />
                    </div>
                    <ItemTable setPerformer={this._setPerformer} data={this.props.data} />
                </div>
            </div>
        );
    },

    /**
     *  Set the best performer
     */
    _setPerformer : function(performer) {
        if (performer) {
            document.getElementById('best-list').scrollTop;
        }

        console.log('setting best perfofmer', performer);
        this.setState({best : performer});
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

/**
 *  Subclass for creating the item
 */
var ItemRow = React.createClass({
    render: function() {
        return (
            <li className='best-item'>
                <a className='rank'>
                    {this.props.object.rank}.
                </a>
                <div className='title' onClick={this._clickTitle}>
                    {this.props.object.item.title}
                </div>
                <a className='score'>
                    {this.props.object.item.score}
                </a>
            </li>
        );
    },

    /**
     *  On title click
     */
    _clickTitle : function() {
        this.props.setPerformer(this.props.object.item);
    }
});

/**
 *  Sub class for creating the list
 */
var ItemTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.data.forEach(function(object, index) {
            object.rank = index + 1;
            rows.push(<ItemRow setPerformer={this.props.setPerformer} object={object} />);
        }.bind(this));
        return (
           <ul id='best-list'>
                {rows}
           </ul>
        );
    }
});

module.exports = BestModal;
