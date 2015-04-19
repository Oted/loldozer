/*
 *  Deals with the localstorage and make sure to not show the 
 *  same stuff next time someone returns. The algorithm presented here
 *  is very related to the Interval Scheduel Problem, what to query 
 *  and how is not obvious. Below is an explenation of how its meant to work
 */

/**
storage['seen'] = {
    all : [
        {
            'first' : 4, 
            'last' : 3
        },
        {
            'first' : 2,
            'last' : 1
        }
        .
        .
        .
        //the first object represents the current session, 
        //the second object is the fetched from the storage and represents the session before this 
        //once last(of 1st) < first(of 2nd) then merge 1st and last
        //to 
        {
            'first' : 4,
            'last' : 1
        }
    ],
    youtube : {
        -----||-----
    }
    .
    .
    .
}
*/

//get clone function
var clone = require('./utils').clone;

var currentStorage = null,
    currentSession = {};

/*
 *  Delete from local storage
 */
module.exports.destroyStorage = function() {
    localStorage.removeItem("seen");
}


/**
 *  Gets the current localstorage
 */
module.exports.loadStorage = function() {
    var currStorage = localStorage.getItem("seen");

    try {
        currStorage = JSON.parse(currStorage)
    } catch (err) {
        currStorage = null;
        console.log(err);
    }

    if (!currStorage) {
        return null;
    }

    currentStorage = currStorage;
    console.log('got storage', currStorage);
    return currentStorage;
};

/*
 * Updates the current localsession with new _sort times,
 * first and last refers to the first one you saw, resp the last one.
 *
 * Performers here represents seen and fetched together.
 */
module.exports.updateSession = function(performers) {
    var p, key, value;

    if (!performers) {
        return;
    }

    //loop over all performers, 
    for (var i = 0; i < performers.length; i++) {
        key     = performers[i].type,
        value   = parseInt(performers[i]._sort);
        
        if (!currentSession["all"]) {
            currentSession["all"] = {
                "first" : value,
                "last" : value
            };
        } else {
            currentSession["all"].first   = parseInt(currentSession["all"].first) < value ? value : currentSession["all"].first;  
            currentSession["all"].last    = parseInt(currentSession["all"].last) > value ? value : currentSession["all"].last;  
        }

        if (currentSession[key]) {
            currentSession[key].first   = parseInt(currentSession[key].first) < value ? value : currentSession[key].first;  
            currentSession[key].last    = parseInt(currentSession[key].last) > value ? value : currentSession[key].last;  
        } else {
            currentSession[key] = {
                "first" : value,
                "last" : value
            }
        }
    }

    console.log('update session', JSON.stringify(currentSession));
    
    //update and merge for now
    module.exports.mergeAndUpdateStorage(); 
};

/**
 * Merge session with storage and update the storage.
 */
module.exports.mergeAndUpdateStorage = function() {
    if (!currentSession) {
        console.log('no current session, this is crazy');
        return;
    }

    //assign current storage if its undefined
    currentStorage = currentStorage || {};

    //iterate over all the keys in the session
    for (var key in currentSession) {

        //if they cant be found in the add it t o a new array
        if (!currentStorage[key]) {
            currentStorage[key] = clone([currentSession[key]]);
        } else {
            //else push it to the front
            currentStorage[key].unshift(clone(currentSession[key]));
        }
    }

    checkForOverlaps();
    console.log('update storage', JSON.stringify(currentStorage));
    localStorage.setItem("seen", JSON.stringify(currentStorage));
};



/**
 *  Helper function to check for overlaps.
 */
var checkForOverlaps = function() {
    if (!currentStorage) {
        console.log('no current storage, crazy times awaits...');
        return;
    }
    
    //iterate the keys
    //this is the heart of the ISP,
    //compare lasts with firsts etc
    for (var key in currentStorage) {
        for (var i = currentStorage[key].length - 2; i >= 0; i--) {
            var prev = currentStorage[key][i + 1],
                curr = currentStorage[key][i],
                obj  = {};
        
            //if the previous first date is larger or eq to the
            //currents first then these should be merged
            if (prev.first >= curr.last) {
                obj.first = curr.first;
                obj.last = prev.last;

                //we now have a new object that contains a merge of previously
                //two intervals, delete the prev and replace the curr
                currentStorage[key].splice(i, 2, obj);
            }
        }
    }
};

/**
 *  Returns the session
 */
module.exports.getSession = function() {
    return currentSession;
}

/**
 *  Returns the storage
 */
module.exports.getStorage = function() {
    return currentStorage;
}


/**
 *  Gets the suggested queries for first and last
 *  returns an object for each type with suggested queries for last and 
 *  first.
 */
module.exports.getSuggestedQuery = function() {
    //if this is true, then nothing have been seen 
    if (Object.keys(currentSession).length < 1) {
        if (currentStorage) {
            return currentStorage;
        }
     
        return null;
    }
    
    return currentSession;
};
