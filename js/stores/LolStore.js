/*
 * The store, where it all happens
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    LolConstants    = require('../constants/LolConstants'),
    StatsHandler    = require('../utils/statshandler.js'),
    Utils           = require('../utils/utils'),
    Storage         = require('../utils/localstorage'),
    Exp             = require('../utils/Exp')
    Api             = require('../utils/API'),
    $               = require('../../common/jquery.min'),
    assign          = require('object-assign');

var CHANGE_EVENT = 'change';

//the current adjectives
var _adjectives ={
    "positives": [
        "good"
    ],
    "negatives": [
        "bad"
    ]
};

//current best performers
var _best = [];

//describes the status of requests
var _statuses = {};

//states of modals
var _modals = {
    add : false,
    stats : false,
    best : false
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
 
    console.log('new next ', _currentPerformer);
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
 *  Update adjectives, fetch new if nessecary.
 */
function updateAdjectives(adjective) {
    if (!adjective) {
        console.log('No adjective provided');
        return;
    }

    console.log('here!')

    //check if this adjective is in the positives
    for (var p = _adjectives.positives.length - 1; p >=0; p--) {
        if (_adjectives.positives[p] === adjective) {
            _adjectives.positives.splice(p,1);
            break;
        }
    }

    //check if this adjective is in the negatives
    for (var n = _adjectives.negatives.length - 1; n >=0; n--) {
        if (_adjectives.negatives[n] === adjective) {
            _adjectives.negatives.splice(n,1);
            break;
        }
    }


    //if were out of adjectives on either side, fetch new
    if (_adjectives.positives.length < 1 || _adjectives.negatives.length < 1) {
        console.log('out of adjectives', _adjectives);
        Api.getAdjectives();
    }

    return;
};

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
     * Get adjectives
     */
    getAdjectives: function () {
        return _adjectives;
    },

    /**
     * Get the data from the statshandler
     */
    getStatsViews: function () {
        return StatsHandler.getData();
    },

    /**
     * Get data for current best internetz
     */
    getBestPerformers: function () {
        return _best;
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
        case LolConstants.LOL_CREATE:
            if (action.type === 'performer') { 
                createPerformer(action.obj);
            }

            if (action.type === 'adjectives') {
                _adjectives = action.obj;
            }
        break;

        case LolConstants.LOL_API:
            if (action.type === 'items') {
                if (!_currentPerformer) {
                    _currentPerformer = Utils.getPerformer(_performers);
                }
            }

            console.log(action);
            _statuses[action.type] = action.status;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_NEXT:
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
            _interactions.novotes++; 
            Exp.calculateExperience(_interactions, '0');
            Api.noVote(_currentPerformer._hash);
            LolStore.emitChange();
        break;

        case LolConstants.LOL_UP_VOTE:
            _interactions.upvotes++;
            Exp.calculateExperience(_interactions, '+1');
            Api.upVote(_currentPerformer._hash, action.adjective);
            updateAdjectives(action.adjective);
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_DOWN_VOTE:
            _interactions.downvotes++; 
            Exp.calculateExperience(_interactions, '-1');
            Api.downVote(_currentPerformer._hash, action.adjective);
            updateAdjectives(action.adjective);
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_OPEN_MODAL:
            _modals[action.modal] = true;
            
            if (action.modal === "best") {
                _best = [];
                Api.getBest();
            }

            if (action.modal === "stats") {
                StatsHandler.clearData();
                
                if (action.data.type === 'current') {
                    Api.getRatings(_currentPerformer._hash);
                } else if (action.data._hash) {
                    Api.getRatings(action.data._hash);
                } else {
                    console.log('Cannot view an unknown item');
                }
            }

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

        case LolConstants.LOL_SET_BEST:
            _best.push(action.item); 
            LolStore.emitChange();
        break;

        case LolConstants.LOL_SET_RATINGS:
            StatsHandler.transformRatingsToChart(action.ratings);
            LolStore.emitChange();
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
