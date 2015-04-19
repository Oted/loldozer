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
     * Toggle the seen state of an object
     */
    toggleSeen: function(obj) {
        var hash = todo.hash;
        var actionType = todo.seen ?
            LolConstants.LOL_UNDO_SEEN :
            LolConstants.LOL_SEEN;

        AppDispatcher.dispatch({
            actionType: actionType,
            obj: obj
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
     * Remove an object
     */
    destroy: function(obj) {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DESTROY,
            obj: obj
        });
    },

   /**
    * Delete all the completed ToDos
    */
    destroySeen: function() {
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DESTROY_SEEN
        });
    }
};

module.exports = LolActions;
