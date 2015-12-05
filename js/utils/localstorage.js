/*
 *  Deals with the localstorage and make sure to not show the 
 *  same stuff next time someone returns. The algorithm presented here
 *  is very related to the Interval Scheduel Problem.
 *
 *  Module should only be required once from the store and injected where it needs to be used, 
 *  until i have time to rwreite this
 */

var clone   = require('./utils').clone,
    time    = require('./utils').time,
    expired = require('./utils').hasExpired;

var stateStorage = null,
    seenStorage = null,
    seenSession = {};

/**
 *  Gets the current seen storage
 */
module.exports.loadSeenStorage = function() {
    var currStorage = localStorage.getItem("seen");

    try {
        currStorage = JSON.parse(currStorage)
    } catch(err) {
        currStorage = null;
        console.log('WARNING, could not load storage', err);
    }

    if (!currStorage) {
        console.log('WARNING, no current storage!');
        return null;
    }

    seenStorage = currStorage;
    return seenStorage;
};

/*
 * Updates the current localsession with new _sort times,
 * first and last refers to the first one you saw, resp the last one.
 *
 * Performers here represents seen and fetched together.
 */
module.exports.updateSeenSession = function(performers) {
    var p, key, value;

    if (!performers) {
        return;
    }

    //loop over all performers, 
    for (var i = 0; i < performers.length; i++) {
        //skip irrelevent items
        if (performers[i].highscore == true || performers[i].onboarding == true || performers[i].shared == true) {
            continue;
        }

        var key     = performers[i].type,
            value   = parseInt(performers[i]._sort);
        
        if (!seenSession["all"]) {
            seenSession["all"] = {
                "first" : value,
                "last" : value
            };
        } else {
            seenSession["all"].first   = parseInt(seenSession["all"].first) < value ? value : seenSession["all"].first;  
            seenSession["all"].last    = parseInt(seenSession["all"].last) > value ? value : seenSession["all"].last;  
        }

        if (seenSession[key]) {
            seenSession[key].first   = parseInt(seenSession[key].first) < value ? value : seenSession[key].first;  
            seenSession[key].last    = parseInt(seenSession[key].last) > value ? value : seenSession[key].last;  
        } else {
            seenSession[key] = {
                "first" : value,
                "last" : value
            }
        }
    }

    //update and merge for now
    return module.exports.mergeAndUpdateStorage(); 
};

/**
 *  Gets the current 
 */
module.exports.loadStateStorage = function() {
    var sStorage = localStorage.getItem("state");

    try {
        sStorage = JSON.parse(sStorage);
    } catch(err) {
        console.log(err);
    }

    if (!sStorage) {
        return null;
    }

    return sStorage;
};

/**
 *  Saves the current state
 */
module.exports.updateStateStorage = function(state) {
   try {
        localStorage.setItem("state", JSON.stringify(state));
    } catch(err) {
        return console.log('err when update storage', err); 
    }
}

/**
 * Merge session with storage and update the storage.
 */
module.exports.mergeAndUpdateStorage = function() {
    if (!seenSession) {
        console.log('no current session, this is crazy');
        return;
    }

    //assign current storage if its undefined
    seenStorage = seenStorage || {};

    //iterate over all the keys in the session
    for (var key in seenSession) {
        //if its undefined
        if (!seenSession[key]) {
            delete seenSession[key];
            continue;
        }

        //if they cant be found in the add it t o a new array
        if (!seenStorage[key]) {
            seenStorage[key] = clone([seenSession[key]]);
        } else {
            //else push it to the front
            seenStorage[key].push(clone(seenSession[key]));
        }
    }

    checkForOverlaps();
    
    try {
        localStorage.setItem("seen", JSON.stringify(seenStorage));
    } catch(err) {
        console.log('err when update storage', err); 
    }
};

/**
 *  Helper function to check for overlaps.
 */
var checkForOverlaps = function() {
    if (!seenStorage) {
        console.log('no current storage, crazy times awaits...');
        return;
    }
   
    //compare lasts with firsts etc
    for (var key in seenStorage) {
        //if there is just one span check and compare
        if (seenStorage[key].length === 1 && expired(seenStorage[key][0].last)) {
            delete seenStorage[key];
            continue;
        }
        
        //sort on first
        seenStorage[key].sort(function(a,b) { 
            return b.first - a.first
        });

        for (var i = seenStorage[key].length - 2; i >= 0; i--) {
            var prev = seenStorage[key][i + 1],
                curr = seenStorage[key][i],
                obj  = {};
        
            // console.log('curr', time(curr.first), time(curr.last));
            // console.log('prev', time(prev.first), time(prev.last));
            if (prev.first === curr.first && prev.last === curr.last) {
                console.log('case0');
                seenStorage[key].splice(i, 1);
                continue;
            }

            if (expired(curr.last)) {
                console.log('case1');
                seenStorage[key].splice(i, 1);
                continue;
            }

            if (expired(prev.last)) {
                console.log('case2');
                seenStorage[key].splice(i + 1, 1);
                continue;
            }

            //if the previous first date is larger or eq to the
            //currents first then these should be merge
            if (prev.first >= curr.last) {
                console.log('case3');
                obj.first = curr.first;
                obj.last = prev.last;
            } 
            
            if (prev.first >= curr.first) {
                console.log('case4');
                obj.first = prev.first;
                obj.last = Math.min(prev.last, curr.last);
            } 
            
            if (curr.last <= prev.last) {
                console.log('case5');
                obj.first = Math.max(prev.first, curr.first);
                obj.last = curr.last;
           } 

            if (obj["first"] && obj["last"]) { 
                //we now have a new object that contains a merge of previously
                //two intervals, delete the prev and replace the curr
                //console.log('overlap', time(obj.first), time(obj.last));
                seenStorage[key].splice(i, 2, obj);
            }
        }

        //if there are more intervals than 2, 
        //this means that the api could not find anything inbetween or over
        //so the first two must be merged
        // if (seenStorage[key].length > 2) {
            // var obj = {};
            // obj.first =  seenStorage[key][0].first;
            // obj.last =  seenStorage[key][1].last;
            // seenStorage[key].splice(0, 2, obj);
        // }
       
        seenSession[key] = seenStorage[key][0];
    }
};

/**
 *  Returns the session
 */
module.exports.getSession = function() {
    return seenSession;
}

/**
 *  Returns the storage
 */
module.exports.getStorage = function() {
    return seenStorage;
}

/*
 *  Delete from local storage
 */
module.exports.destroyStorage = function(key) {
    localStorage.removeItem(key);
    
    if (key === "seen") {
        seenStorage = null;
    }
}

/*
 *  Delete from local session
 */
module.exports.destroySession = function() {
    seenSession = {};
}

/**
 *  Gets the suggested queries for first and last
 *  returns an object for each type with suggested queries for last and 
 *  first.
 */
module.exports.getSuggestedQuery = function(type) {
    if (seenStorage && Array.isArray(seenStorage[type]) && seenStorage[type].length < 1) {
        console.log('WARING, no returned query!');
        return null;
    }

    //if this is true, then nothing have been seen 
    if (Object.keys(seenSession).length < 1) {
        if (seenStorage) {
            return seenStorage;
        }
     
        console.log('WARING, no returned query!');
        return null;
    }
    
    return seenSession;
};
