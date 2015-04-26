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
                                ADD ITEM
                            </a>
                        </li>
                        <li>
                            <a
                                className={'text-button'}
                                href={'#'}>
                                HIGHSCORES
                            </a>
                        </li>
                        <li>
                            <a
                                className={'text-button'}
                                href={'#'}>
                                FILTER
                            </a>
                        </li>

                    </ul>
                </li>
                <li
                    id={'downvote-button'}
                    onClick={this._onVoteDown}
                    className={'vote-button'}>
                    <a 
                        className={'fa fa-minus'}>
                    </a>
                </li>
                <li
                    id={'next-button'}>
                    <a 
                        onClick={this._onNext}>
                        NEXT
                    </a>
                </li>
                <li
                    id={'upvote-button'} 
                    onClick={this._onVoteUp}
                    className={'vote-button'}>
                    <a 
                        className={'fa fa-plus'}>
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

    _onNext: function(text) {
        console.log('next');
        LolActions.noVote();
        LolActions.next();
    },

    _onVoteUp: function(text) {
        console.log('up');
        LolActions.upVote();
        LolActions.next();
    },

    _onVoteDown: function(text) {
        console.log('down');
        LolActions.downVote();
        LolActions.next();
    },

    _openAddModal: function(text) {
        console.log('add');
        LolActions.openModal('add');
    }
});

module.exports = Nav;
