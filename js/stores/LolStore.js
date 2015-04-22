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

var _modals = {
    add : false
};

var _interactions = {
    'novotes' : 0,
    'upvotes' : 0,
    'downvotes' : 0
};

var _performers         = [],
    _seen               = [],
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
 
    // console.log('last',lastPerformer); 
    console.log('new current ',_currentPerformer);
    // console.log('performers',_performers);
    // console.log('seen',_seen);
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
    getAllPerformers: function() {
        return _performers;
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
    getExperience: function() {
        return Exp.getExperience();
    },
    
    /**
     * Get modal states
     */
    getModalStates: function () {
        return _modals;
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
            createPerformer(action.obj);
            
            if (!_currentPerformer) {
                changeCurrentPerformer();
            }

            LolStore.emitChange();
        break;

        case LolConstants.LOL_NEXT:
            //check if we need to fetch new stuff
            if (_performers.length < Math.floor(Api.getAmount() / 2) && _currentPerformer) {
                Storage.updateSession(_seen.concat(_performers));
                Api.getItems();
            }

            changeCurrentPerformer();
            LolStore.emitChange();
        break;

        case LolConstants.LOL_NO_VOTE:
            console.log('no vote');
            _interactions.novotes++; 
            Exp.calculateExperience(_interactions);
            Api.noVote(_currentPerformer._hash);
            break;

        case LolConstants.LOL_UP_VOTE:
            console.log('+1 vote'); 
            _interactions.upvotes++; 
            Exp.calculateExperience(_interactions);
            Api.upVote(_currentPerformer._hash);
            break;
        
        case LolConstants.LOL_DOWN_VOTE:
            console.log('-1 vote'); 
            _interactions.downvotes++; 
            Exp.calculateExperience(_interactions);
            Api.downVote(_currentPerformer._hash);
            break;
        
        case LolConstants.LOL_OPEN_MODAL:
            _modals[action.modal] = true;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_CLOSE_MODAL:
            console.log('here');
            _modals[action.modal] = false;
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
