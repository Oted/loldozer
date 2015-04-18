/*
 * The store, where it all happens
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    LolConstants   = require('../constants/LolConstants'),
    Utils           = require('./../utils/utils'),
    assign          = require('object-assign');

var CHANGE_EVENT = 'change';

var _performers = require('../../common/dummy_data.json'),
    _currentPerformer = null;

/**
 *  Creates a performer
 */
function createPerformer(obj) {
    if (!obj.hash) {
        return null;
    }

    obj.seen = false;
    _performers.push(obj);
};

/**
 *  Change the current performer to a new one,
 *  moves the current to unseen
 */
function changeCurrentPerformer(hash) {
    if (!hash) {
        _currentPerformer = Utils.getNextPerformer(_performers);
    } else {
        _currentPerformer = Utils.getPerformer(_performers, hash);
    }
    
    Utils.middleware(_currentPerformer);
    console.log('new current', _currentPerformer);
}

/**
 * Delete an item.
 * @param  {string} id
 */
function destroyPerformer(hash) {
    Utils.destroyPerformer(_performers, hash);
}

/**
 * Delete all the seen performers.
 */
function destroySeenPerformers() {
    for (var i in _performers) {
        if (_performers[i].seen) {
            destroyPerformer(_performers[i].hash);
        }
    }
}

var LolStore = assign({}, EventEmitter.prototype, {
    /**
    * Tests whether all the remaining performers are marked as seen.
    * @return {boolean}
    */
    areAllSeen: function() {
        for (var hash in _performers) {
            if (!_performers[hash].seen) {
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
        console.log('Emitting change!');
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        console.log('adding listener ', callback.toString());
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
            obj = action.obj;
            createPerformer(obj);
            LolStore.emitChange();
        break;

        case LolConstants.LOL_NEXT:
            changeCurrentPerformer();
            LolStore.emitChange();
        break;

        case LolConstants.LOL_SEEN:
            updatePerformer(action.hash, {seen: true});
            LolStore.emitChange();
        break;

        case LolConstants.LOL_DESTROY:
            destroyPerformer(action.hash);
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
