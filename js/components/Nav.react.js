var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <ul 
                id='nav'>
                <li
                    id='list-button'>
                    <a
                        className={this.props.level > 1 ? 'fa fa-list' : 'disabled'}>
                    </a>
                    <ul>
                        <li>
                            <a
                                className={this.props.level > 2 ? 'text-button' : 'disabled'}>
                                onClick={this._openAddModal}
                                href='#'>
                                GIVE SOME INTERNET
                            </a>
                        </li>
                        <li>
                            <a
                                className={this.props.level > 1 ? 'text-button' : 'disabled'}
                                onClick={this._openBestModal}
                                href='#'>
                                THE BEST INTERNETS
                            </a>
                        </li>
                        <li>
                            <a
                                className={this.props.level > 3 ? 'text-button' : 'disabled'}>
                                onClick={this._openFilterModal}
                                href='#'>
                                FILTER INTERNET
                            </a>
                        </li>

                    </ul>
                </li>
                <li
                    className='level'>
                    <a
                        id='level'
                        href='#'>
                        {this.props.level}
                    </a>
                </li>
           </ul>
        );
    },

    _openAddModal: function() {
        console.log('add');
        LolActions.openModal('add');
    },

    _openBestModal: function() {
        console.log('best');
        LolActions.openModal('best');
    },

    _openFilterModal: function() {
        console.log('filter');
        LolActions.openModal('filter');
    }
});

module.exports = Nav;
