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
                                className={this.props.level >= 4 ? 'text-button' : 'disabled'}
                                onClick={this._openAddModal}
                                href='#'>
                                GIVE SOME INTERNET
                            </a>
                        </li>
                        <li>
                            <a
                                className={this.props.level >= 3 ? 'text-button' : 'disabled'}
                                onClick={this._openBestModal}
                                href='#'>
                                THE BEST INTERNETS
                            </a>
                        </li>
                        <li>
                            <a
                                className={this.props.level >= 2 ? 'text-button' : 'disabled'}
                                onClick={this._openFilterModal}
                                href='#'>
                                FILTER THE INTERNET
                            </a>
                        </li>
                    </ul>
                </li>
                <li> 
                    <img className='logo-top' src='./common/play_logo.png'></img>
                    <img className='logo-top' src='./common/around_logo.png'></img>
                    <img id="logo-text-top" src='./common/logo_text.png'></img>
                </li>
                <li
                    className='contact'>
                    <a
                        className={this.props.level > 1 ? 'fa fa-list' : 'disabled'}>
                    </a>
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
