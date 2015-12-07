/*
 * The store, where it all happens
 */
var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    LolConstants    = require('../constants/LolConstants'),
    Utils           = require('../utils/utils'),
    Storage         = require('../utils/localstorage'),
    Exp             = require('../utils/Exp'),
    Effects         = require('../utils/effects'),
    Abuse           = require('../utils/abuse'),
    assign          = require('object-assign'),
    Api             = require('../utils/API'),
    Async           = require('async');

var CHANGE_EVENT = 'change';

// Storage.destroyStorage("state");
// Storage.destroyStorage("seen");

Storage.loadSeenStorage();

//the states that needs to be saved goes in here
var _savedState = Storage.loadStateStorage();

//if it does not exists, this is a first timer, define the root state
if (!_savedState) {
    Effects.setFlashNext(true);
    _savedState = {
        _statuses : {},
        _filters : typeof window.ontouchstart !== 'undefined' ? {
            'img' : 1, 
            'gif' : 1,
            'video' : 0,
            'youtube' : 0,
            'soundcloud' : -1, 
            'twitch' : -1,
            'vine' : -1,
            'vimeo' : -1
        } : {
            'img' : 1, 
            'gif' : 1, 
            'youtube' : 1, 
            'video' : 1,
            'soundcloud' : -1, 
            'twitch' : -1,
            'vine' : -1,
            'vimeo' : -1
        },
        interactions : {
            'novotes' : 0,
            'upvotes' : 0,
            'downvotes' : 0
        },
        visits : 0,
        fetches : 1,
        experience : 0,
        level : 0
    }
} else {
    if (!_savedState._statuses) {
        _savedState._statuses = {};
    }

    if (!_savedState.fetches) {
        _savedState.fetches = 1;
    }

    if (!_savedState.visits) {
        _savedState.visits = 0;
    }
}

/**
 *  Fetch the info object, 
 *  eventually an item given a hash,
 *  then first batch of items
 */
Async.series([
    //set the Exp class
    function(next) {
        Exp = new Exp(_savedState.interactions, _savedState.level, _savedState.experience);
    
        //if were max, then make sure all filters ar enabled 
        if (Exp.isMax()) {
            Object.keys(_savedState._filters).forEach(function(key) {
                _savedState._filters[key] = _savedState._filters[key] === -1 ? 0 : _savedState._filters[key];
            }); 
        }

        return next();
    },
    //get the info object
    function(next) {
        return Api.getInfo(_savedState, next);
    },
    //if this call has a specific hash then add that to the top of the list
    function(next) {
        return Api.maybeGetGivenHash(next);
    },
    //get first batch of items
    function(next) {
        // if (!isNew()) {
            // _savedState['fetches']++;
            Api.getItems(Storage, _savedState._filters);
        // } else {
            // Api.getBest(_savedState._filters);
        // }

        return next();
    }],
function(err) {
    _savedState.visits++;
    console.log('Current state', _savedState);
});

//the current adjectives
var _adjectives = {
    "positives": [
        "good"
    ],
    "negatives": [
        "bad"
    ]
};

//current best performers
var _best = [];

//info object of the state of backend
var _info = {};

//states of modals
var _modals = {
    add : false,
    best : false,
    filter : false,
    about : false,
    level : false,
    inspect : false 
};

//state of stage
var _performers         = [],
    _performersHash     = {},
    _currentPerformer   = null;

/**
 *  Updates the storage, called when level is increased etc
 */
function updateStorage() {
    console.log('Updating storage');
    Storage.updateSeenSession(_performers);
    
    _savedState.interactions   = Exp.getInteractions();
    _savedState.experience     = Exp.getExperience();
    _savedState.level          = Exp.getLevel();
    
    Storage.updateStateStorage(_savedState);
};

/**
 *  Creates a performer 
 *  All new items needs to pass through this function
 */
function createPerformer(obj) {
    if (!obj._hash) {
        console.log('No hash on obj, returning null');
        return;
    }
    
    if (_performersHash[obj._hash]) {
        console.log(obj, 'has already been seen');
        return;
    }

    Utils.middleware(obj);

    _performersHash[obj._hash] = obj;
    obj.shared ? _performers.unshift(obj) : _performers.push(obj);
};

/**
 *  Check if the user is new
 */
function isNew() {
    return _savedState.visits <= 1 && _savedState.level === 0;
};

var LolStore = assign({}, EventEmitter.prototype, {
   /**
    * Get the entire collection of performers 
    */
    getPerformers: function() {
        return _performers;
    },

   /**
    * Get the current performer
    */
    getCurrentPerformer: function() {
        return _currentPerformer;
    },

    /**
     *  Return if mobile or not.
     */
    isMobile: function() {
        return typeof window.ontouchstart !== 'undefined';
    },

   /**
    * Get the level
    */
    getLevel: function() {
        return Exp.getLevel();
    },
 
   /**
    * Get the expp
    */
    getExperience: function() {
        return Exp.getExperience();
    },
    
    /**
     * Get adjectives
     */
    getAdjectives: function() {
        return _adjectives;
    },

    /**
     * Get data for current best internetz
     */
    getBestPerformers: function() {
        return _best;
    },

    /**
     * Get the info object
     */
    getInfo: function() {
        return _info;
    },

    /**
     * Get the filters
     */
    getFilters: function() {
        return _savedState._filters;
    },

    /**
     * Get modal states
     */
    getModalStates: function() {
        return _modals;
    },

    /**
     * Get api states
     */
    getStatuses: function() {
        return _savedState._statuses;
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
        case LolConstants.LOL_SET_INFO:
            Effects.init();
            Effects.flashNextButton();
            _info = action.info;

            if (isNew()) {
                //loop backwards to add onboarding in right order to the top of the list
                for (var i = 0; i < action.info.onboarding.length; i++) {
                    var item = action.info.onboarding[i];
                    
                    item.onboarding = true;
                    createPerformer(item);
                }
            }
        break;

        case LolConstants.LOL_UPDATE_FILTERS:
            var target = action.target,
                filter = _savedState._filters[target];

            //toggles the filter or add it and default to disabled
            if (filter === 1) {
                _savedState._filters[target] = 0;
            } else if (filter === 0) {
                _savedState._filters[target] = 1;
            } else {
                _savedState._filters[target] = 0;
            }

            LolStore.emitChange();
        break;

        case LolConstants.LOL_REFRESH:
            Effects.init();
            updateStorage();
            _performers = [];

            _savedState['fetches']++;
            Api.getItems(Storage,_savedState._filters);
            
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_VIEWED_ITEM:
            var target = action.obj;

            _performersHash[target._hash].view_time++
            _performersHash[target._hash].viewed = true;
            Api.viewedItem(target._hash);

            Exp.calculateExperience('0');
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_CREATE:
            if (action.type === 'performer') {
                console.log('creating performer!');
                createPerformer(action.obj);
            }

            if (action.type === 'adjectives') {
                _adjectives = action.obj;
            }
        break;

        case LolConstants.LOL_SCROLL:
            updateStorage();
            _savedState['fetches']++;
            Api.getItems(Storage,_savedState._filters);
            Abuse();

            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_API:
            console.log('API said', action);
            if (action.type === 'items') {
                Effects.shineLogo();
                updateStorage();
            }

            _savedState._statuses[action.type] = action.status;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_ITEM_IN_FOCUS:
            _currentPerformer = _performersHash[action.hash];

            LolStore.emitChange();
        break;

        case LolConstants.LOL_NO_VOTE:
            Exp.calculateExperience('0');
            Api.noVote(_currentPerformer._hash);
            
            LolStore.emitChange();
        break;

        case LolConstants.LOL_UP_VOTE:
            var targetHash = action.hash || _currentPerformer._hash;

            Api.upVote(targetHash, action.adjective);
            
            if (!action.hash) {
                _currentPerformer.likes++;
            }

            Exp.calculateExperience('+1');
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_DOWN_VOTE:
            var targetHash = action.hash || _currentPerformer._hash;

            Api.downVote(targetHash, action.adjective);
            
            if (!action.hash) {
                _currentPerformer.dislikes++;
            }

            Exp.calculateExperience('-1');
            LolStore.emitChange();
        break;
        
        case LolConstants.LOL_OPEN_MODAL:
            _modals[action.modal] = action.data || true;
            
            if (action.modal === "best") {
                _best = [];
                Api.getBest(_savedState._filters);
            }

            LolStore.emitChange();
        break;

        case LolConstants.LOL_CLOSE_MODAL:
            _modals[action.modal] = false;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_LEVEL_UP:
            var l = Exp.getLevel();

            if (l === 1) {
                Effects.setFlashNext(false);
            }

            if (l === 2) {
                _savedState._filters['vine'] = 0;
            }

            if (l === 3) {
                _savedState._filters['soundcloud'] = 0;
            }

            if (l === 4) {
                _savedState._filters['twitch'] = 0;
            }
            
            if (l === 5) {
                _savedState._filters['vimeo'] = 0;
            }

            updateStorage();
            _modals["level"] = true;
            LolStore.emitChange();
        break;

        case LolConstants.LOL_SET_BEST:
            if (!isNew()) {
                //if user is over lvl 0, this is a normal call from highscores
                _best = action.items.sort(function(a,b){return b.score - a.score}); 
            } else {
                //otherwise its a part of the onboarding
                while (action.items.length) {
                    var i       = Math.floor(Math.random() * action.items.length),
                        item    = action.items.splice(i,1)[0];

                    item.highscore = true;
                    createPerformer(item);
                }
            }

            LolStore.emitChange();
        break;

        case LolConstants.LOL_POST_FEEDBACK:
            Api.postFeedbackMessage(action.item);
        break;

        default:
            console.log('No such action ', action.actionType);
    }
});

module.exports = LolStore;
