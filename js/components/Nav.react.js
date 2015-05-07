var React       = require('react'),
    LolActions  = require('../actions/LolActions');

/**
 * The navigation
 */
var Nav = React.createClass({
    render: function() {
        return (
            <ul 
                id={'nav'}>
                <li
                    id={'list-button'}>
                    <a
                        className={'fa fa-list'}>
                    </a>
                    <ul>
                        <li>
                            <a
                                className={'text-button'}
                                onClick={this._openAddModal}
                                href={'#'}>
                                GIVE SOME INTERNET
                            </a>
                        </li>
                        <li>
                            <a
                                className={'text-button'}
                                onClick={this._openStatsModal}
                                href={'#'}>
                                THE BEST INTERNETS
                            </a>
                        </li>
                        <li>
                            <a
                                className={'text-button'}
                                href={'#'}>
                                FILTER INTERNET
                            </a>
                        </li>

                    </ul>
                </li>
               <li
                    id={'next-button'}>
                    <a 
                        onClick={this._onNext}>
                        GET SOME INTERNET
                    </a>
                </li>
               <li
                    className={'level'}>
                    <a
                        id={'level'}
                        href={'#'}>
                        {this.props.level}
                    </a>
                </li>
           </ul>
        );
    },

    _onNext: function() {
        console.log('next');
        LolActions.noVote();
        LolActions.next();
    },

    _openAddModal: function() {
        console.log('add');
        LolActions.openModal('add');
    },

    _openStatsModal: function() {
        console.log('stats');
        LolActions.openModal('stats');
    }
});

module.exports = Nav;
