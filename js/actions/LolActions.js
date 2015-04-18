/*
 * Actions
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    LolConstants    = require('../constants/LolConstants');

var LolActions = {
    /**
     * Creates a new obj and add it to the performers
     */
    create: function(obj) {
        console.log('action create', obj);
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_CREATE,
            obj: obj
        });
    },

    /**
     * Toggle the seen state of an object
     */
    toggleSeen: function(obj) {
        console.log('action toggle seen');
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
        console.log('action next');
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_NEXT
        });
    },
    
    /**
     * Remove an object
     */
    destroy: function(obj) {
        console.log('action destroy');
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DESTROY,
            obj: obj
        });
    },

   /**
    * Delete all the completed ToDos
    */
    destroySeen: function() {
        console.log('action destroy seen');
        AppDispatcher.dispatch({
            actionType: LolConstants.LOL_DESTROY_SEEN
        });
    }
};

module.exports = LolActions;
