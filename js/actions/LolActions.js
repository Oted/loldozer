var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    LolConstants    = require('../constants/LolConstants');

/*
 * Actions
 */
var LolActions = {
    /**
     * Creates a new obj and add it to the performers
     */
    create: function(obj) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_CREATE,
            obj: obj
        });
    },

    /**
     * The api has finnished!
     */
    api: function(type) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_API,
            type: type
        });
    },

    /**
     * When user press next
     */
    noVote: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_NO_VOTE
        });
    },
    
    /**
     * When user press next
     */
    upVote: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_UP_VOTE
        });
    },
    
    /**
     * When user press next
     */
    downVote: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DOWN_VOTE
        });
    },
    
    /**
     * When user press next
     */
    next: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_NEXT
        });
    },
    
    /**
     * Open modal
     */
    openModal: function(modal) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_OPEN_MODAL,
            modal: modal
        });
    },

    /**
     * Open modal
     */
    closeModal: function(modal) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_CLOSE_MODAL,
            modal: modal
        });
    },

    /**
     *  Adds a new item to the database
     */
    addItem: function(item) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_ADD_ITEM,
            item: item
        });
    },

    /**
     *  Adds a new item to the database
     */
    levelUp: function(level) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_LEVEL_UP,
            level: level
        });
    }
};

module.exports = LolActions;
