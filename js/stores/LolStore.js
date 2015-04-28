/*
 * The store, where it all happens
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    LolConstants    = require('../constants/LolConstants'),
    Utils           = require('../utils/utils'),
    Storage         = require('../utils/localstorage'),
    Exp             = require('../utils/Exp')
    Api             = require('../utils/API'),
    $               = require('../../common/jquery.min'),
    assign          = require('object-assign');

var CHANGE_EVENT = 'change';

//describes the status of requests
var _statuses = {};

//states of modals
var _modals = {
    add : false
};

//interactions
var _interactions = {
    'novotes' : 0,
    'upvotes' : 0,
    'downvotes' : 0
};

//state of stage
var _performers         = [],
    _seen               = [],
    _seen_hash          = {},
    _currentPerformer   = null;


//make sure things are saved before close
window.onbeforeunload = function () {
    Storage.updateSession(_seen.concat(_performers));
};

//make sure things are saved before close
$(window).unload(function() {
    Storage.updateSession(_seen.concat(_performers));
});

/**
 *  Creates a performer
 */
function createPerformer(obj) {
    if (!obj._hash) {
        console.log('No hash on obj, returning null');
        return null;
    }
    
    if (_seen_hash[obj._hash]) {
        console.log(obj, 'has already been seen');
        return null;
    }
    
    Utils.middleware(obj);
    _performers.push(obj);
};

/**
 *  Change the current performer to a new one,
 *  moves the current to unseen
 */
function nextPerformer() {
    var lastPerformer = _currentPerformer;
  
    //add old to seen and then remove from performers
    if (lastPerformer) { 
        _performers = Utils.destroyPerformer(_performers, lastPerformer._hash);
    }

    _currentPerformer = Utils.getPerformer(_performers);
    
    //add the last performer if there is any
    if (lastPerformer) {
        _seen.push(lastPerformer);
        _seen_hash[lastPerformer._hash] = true;
    }
 
    console.log('new next ',_currentPerformer);
}

/**
 *  Change the current performer to the previous one,
 *  moves the first in seen to performers and press next
 */
function previousPerformer() {
    var lastPerformer = _seen.pop();
  
    if (!lastPerformer) {
        return;
    }

    //remove from seen
    delete _seen_hash[lastPerformer._hash];
    _performers.unshift(lastPerformer);
    _currentPerformer = Utils.getPerformer(_performers);
    
    console.log('new previous ',_currentPerformer);
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
    * Get the entire collection of performers 
    */
    getPerformers: function() {
        return _performers;
    },

   /**
    * Get the entire collection of seen performers
    */
    getSeenPerformers: function() {
        return _seen;
    },

   /**
    * Get the current performer
    */
    getCurrentPerformer: function() {
        return _currentPerformer;
    },

   /**
    * Get the current performer
    */
    getLevel: function() {
        return Exp.getLevel();
    },
 
   /**
    * Get the current performer
    */
    getExperience: function() {
        return Exp.getExperience();
    },
    
    /**
     * Get modal states
     */
    getModalStates: function () {
        return _modals;
    },

    /**
     * Get api states
     */
    getStatuses: function () {
        return _statuses;
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

    switch (action.actionType) {
        //10 at a time
        case LolConstants.LOL_CREATE:
            createPerformer(action.obj);
        break;

        //reports from items
        case LolConstants.LOL_API:
            
            if (action.type === 'items') {
                //if api is done fetching items, check if there is no current
                if (!_currentPerformer) {
                    _currentPerformer = Utils.getPerformer(_performers);
                }
            }
            console.log(action);
            //add the status
            _statuses[action.type] = action.status;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_NEXT:
            //check if we need to fetch new stuff, hereeee???
            if (_performers.length < Math.floor(Api.getAmount() / 2) && _currentPerformer) {
                Storage.updateSession(_seen.concat(_performers));
                Api.getItems();
            }

            nextPerformer();
            LolStore.emitChange();
        break;

        case LolConstants.LOL_PREVIOUS:
            previousPerformer();
            LolStore.emitChange();
        break;

        case LolConstants.LOL_NO_VOTE:
            console.log('no vote');
            _interactions.novotes++; 
            Exp.calculateExperience(_interactions, '0');
            Api.noVote(_currentPerformer._hash);
        break;

        case LolConstants.LOL_UP_VOTE:
            console.log('+1 vote'); 
            _interactions.upvotes++; 
            Exp.calculateExperience(_interactions, '+1');
            Api.upVote(_currentPerformer._hash);
        break;
        
        case LolConstants.LOL_DOWN_VOTE:
            console.log('-1 vote'); 
            _interactions.downvotes++; 
            Exp.calculateExperience(_interactions, '-1');
            Api.downVote(_currentPerformer._hash);
        break;
        
        case LolConstants.LOL_OPEN_MODAL:
            _modals[action.modal] = true;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_CLOSE_MODAL:
            _modals[action.modal] = false;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_LEVEL_UP:
            console.log('Wow! level ' + action.level + ' now. Nice! (something cool should happen)');
            alert('Wow! level ' + action.level + ' now. Nice! (something cool should happen)');
        break;

        case LolConstants.LOL_ADD_ITEM:
            Api.addItem(action.item);
            destroyPerformer(action._hash);
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
