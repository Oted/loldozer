var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <div>
                <ul className='sub-nav dropdown'>
                    <li id='list-button'>
                        <a className={this.props.isMobile ? 'fa fa-list mobile' : 'fa fa-list'}> </a>
                        <ul>
                            {this.props.level >= 0 ? 
                            <li>
                                <i
                                    className='text-button'
                                    onClick={this._openAboutModal}>
                                    WHAT IS THIS PLACE?
                                </i>
                            </li>
                            :''}
                            {this.props.level >= 1000 ? 
                            <li>
                                <i
                                    className='text-button'
                                    onClick={this._openAddModal}>
                                    GIVE SOME INTERNET
                                </i>
                            </li>
                            :''}
                            {this.props.level >= 1 ? 
                                <li>
                                    <i
                                        className='text-button'
                                        onClick={this._openBestModal}>
                                        THE BEST INTERNETS
                                    </i>
                                </li>
                            :''}
                            {this.props.level >= 0 ? 
                            <li>
                                <i
                                    className='text-button'
                                    onClick={this._openFilterModal}>
                                    FILTER THE INTERNET
                                </i>
                            </li>
                            :''}
                            {this.props.level >= 0 ? 
                                <li>
                                    <i
                                        className='text-button'
                                        onClick={this._openFeedbackModal}>
                                        HELP US IMPROVE
                                    </i>
                                </li>
                            :''}
                        </ul>
                    </li>
                    <li> 
                    </li>
                </ul>
                <ul className='sub-nav'>
                    <li> 
                        <img id='logo-play' className='logo-top' src='./common/play_logo.png'></img>
                        <img className='logo-top' src='./common/around_logo.png'></img>
                        <img id="logo-bright-top" className='logo-top' src='./common/around_logo_bright.png'></img>
                        <img id="logo-text-top" className='logo-top' src='./common/logo_text.png'></img>
                    </li>
                    <li id='right-bar'>
                        <a id='fb-like' target="_blank" href='https://www.facebook.com/getsomeinternet/' className={this.props.isMobile ? 'fa fa-facebook-square mobile' : 'fa fa-facebook-square'}></a>
                        <a id='twitter-like' target="_blank" href='https://twitter.com/GetSomeInternet' className={this.props.isMobile ? 'fa fa-twitter-square mobile' : 'fa fa-twitter-square'}></a>
                    </li>
               </ul>
           </div>
        );
    },

    _openFeedbackModal: function() {
        console.log('feedback');
        LolActions.openModal('feedback');
    },

    _openAboutModal: function() {
        console.log('about');
        LolActions.openModal('about');
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
