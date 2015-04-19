/*
 * The store, where it all happens
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    LolConstants    = require('../constants/LolConstants'),
    Utils           = require('./../utils/utils'),
    Storage         = require('./../utils/localstorage'),
    Api             = require('./../utils/API'),
    assign          = require('object-assign');

var CHANGE_EVENT = 'change';

var _performers         = [],
    _seen               = [],
    _currentPerformer   = null;

/**
 *  Creates a performer
 */
function createPerformer(obj) {
    if (!obj._hash) {
        return null;
    }

    _performers.push(obj);
};

/**
 *  Change the current performer to a new one,
 *  moves the current to unseen
 */
function changeCurrentPerformer(_hash) {
    var lastPerformer = _currentPerformer;
  
    //add old to seen and then remove from performers
    if (lastPerformer) { 
        _performers = Utils.destroyPerformer(_performers, lastPerformer._hash);
    }

    //pass it through the middleware 
    _currentPerformer = Utils.getPerformer(_performers, _hash);
    Utils.middleware(_currentPerformer);
    
    //add the last performer if there is any
    if (lastPerformer) {
        _seen.push(lastPerformer);
    }
 
    console.log('last',lastPerformer); 
    console.log('curr',_currentPerformer);
    console.log('performers',_performers);
    console.log('seen',_seen);
}

/**
 * Delete an item.
 * @param  {string} id
 */
function destroyPerformer(_hash) {
    Utils.destroyPerformer(_performers, _hash);
}

/**
 * Delete all the seen performers.
 */
function destroySeenPerformers() {
    for (var i in _performers) {
        if (_performers[i].seen) {
            destroyPerformer(_performers[i]._hash);
        }
    }
}

var LolStore = assign({}, EventEmitter.prototype, {
    /**
    * Tests whether all the remaining performers are marked as seen.
    * @return {boolean}
    */
    areAllSeen: function() {
        for (var _hash in _performers) {
            if (!_performers[_hash].seen) {
                return false;
            }
        }
        
        return true;
    },

   /**
    * Get the entire collection of performers 
    */
    getAllPerformers: function() {
        return _performers;
    },

   /**
    * Get the current performer
    */
    getCurrentPerformer: function() {
        return _currentPerformer;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case LolConstants.LOL_CREATE:
            var obj = action.obj;

            //could check the obj here
            createPerformer(obj);

            //if there is no current, add a new one
            if (!_currentPerformer) {
                changeCurrentPerformer();
            }

            LolStore.emitChange();
        break;

        case LolConstants.LOL_NEXT:
            //check if we need to fetch new stuff
            if (_performers.length < Math.floor(Api.getAmount() / 2) && _currentPerformer) {
                Storage.updateStorage(_seen.concat(_performers));
                Api.getItems();
            }

            changeCurrentPerformer();
            LolStore.emitChange();
        break;

        case LolConstants.LOL_DESTROY:
            destroyPerformer(action._hash);
            LolStore.emitChange();
        break;

        case LolConstants.LOL_DESTROY_SEEN:
            destroySeenPerformers();
            LolStore.emitChange();
        break;

        default:
            console.log('No such action ', action.actionType);
    }
});

module.exports = LolStore;
