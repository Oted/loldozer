var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    LolConstants    = require('../constants/LolConstants');

/*
 * Actions
 */
var LolActions = {
    /**
     * Creates a new obj and add it to the performers
     */
    bottomScroll: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_SCROLL
        });
    },

    /**
     * Creates a new obj and add it to the performers
     */
    itemInFocus: function(hash) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_ITEM_IN_FOCUS,
            hash : hash
        });
    },
        
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
     * Sends an item to view
     */
    viewedItem: function(obj) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_VIEWED_ITEM,
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
    upVote: function(adjective, hash) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_UP_VOTE,
            adjective : adjective,
            hash : hash
        });
    },
    
    /**
     * When user press next
     */
    downVote: function(adjective, hash) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DOWN_VOTE,
            adjective : adjective,
            hash : hash
        });
    },
    
    /**
     * Open modal
     */
    openModal: function(modal, data) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_OPEN_MODAL,
            modal: modal,
            data : data
        });
    },

    /**
     * Open modal
     */
    sendFeedbackMessage: function(item) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_POST_FEEDBACK,
            item: item
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
     * Sets the info object
     */
    setInfo: function(info) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_SET_INFO,
            info: info
        });
    },

   /**
    * Sets the data of highscores best
    */
    setBest: function(items) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_SET_BEST,
            items: items
        });
    },

    /**
     *  Refreshes the page and fetch new stuff
     */
    refresh: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_REFRESH
        });
    },

    /**
     *  Update the filres list
     */
    updateFilters: function(target) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_UPDATE_FILTERS,
            target: target
        });
    },

    /**
     * Adds a new rating to the set, 
     * comes from the api and emits change 
     */
    setRatings: function(ratings, hash) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_SET_RATINGS,
            ratings: ratings
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
