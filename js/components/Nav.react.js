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
                        className={this.props.level >= 2 ? 'fa fa-list' : 'disabled'}>
                    </a>
                    <ul>
                        {this.props.level >= 1000 ? 
                        <li>
                            <a
                                className='text-button'
                                onClick={this._openAddModal}
                                href='#'>
                                GIVE SOME INTERNET
                            </a>
                        </li>
                        :''}
                        {this.props.level >= 6 ? 
                            <li>
                                <a
                                    className='text-button'
                                    onClick={this._openBestModal}
                                    href='#'>
                                    THE BEST INTERNETS
                                </a>
                            </li>
                        :''}
                        {this.props.level >= 2 ? 
                        <li>
                            <a
                                className='text-button'
                                onClick={this._openFilterModal}
                                href='#'>
                                FILTER THE INTERNET
                            </a>
                        </li>
                        :''}
                        {this.props.level >= 2 ? 
                            <li>
                                <a
                                    className='text-button'
                                    onClick={this._openFeedbackModal}
                                    href='#'>
                                    HELP US IMPROVE
                                </a>
                            </li>
                        :''}
                    </ul>
                </li>
                <li> 
                    <img className='logo-top' src='./common/play_logo.png'></img>
                    <img className='logo-top' src='./common/around_logo.png'></img>
                    <img id="logo-bright-top" className='logo-top' src='./common/around_logo_bright.png'></img>
                    <img id="logo-text-top" className='logo-top' src='./common/logo_text.png'></img>
                </li>
                <li>
                    <a id='level' href='#'>{this.props.level}</a>
                </li>
           </ul>
        );
    },

    _openFeedbackModal: function() {
        console.log('feedback');
        LolActions.openModal('feedback');
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
