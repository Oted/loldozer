var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    LolConstants    = require('../constants/LolConstants');

/*
 * Actions
 */
var LolActions = {
    /**
     * Creates a new obj and add it to the performers
     */
    createPerformer: function(obj) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_CREATE,
            type : 'performer',
            obj: obj
        });
    },

    /**
     * Creates new adjectives
     */
    createAdjectives: function(obj) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_CREATE,
            type : 'adjectives',
            obj: obj
        });
    },

    /**
     * The api has finnished!
     */
    api: function(type, status) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_API,
            type: type,
            status : status
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
    upVote: function(adjective) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_UP_VOTE,
            adjective: adjective
        });
    },
    
    /**
     * When user press next
     */
    downVote: function(adjective) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DOWN_VOTE,
            adjective : adjective
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
     * When user press previous
     */
    previous: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_PREVIOUS
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
     * Requests a new view
     */
    viewRatings: function(type) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_VIEW_RATINGS,
            type : type
        });
    },

    /**
     * Adds a new rating to the set
     */
    setRatings: function(ratings, hash) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_SET_RATINGS,
            ratings: ratings,
            hash : hash
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
