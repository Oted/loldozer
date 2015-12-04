//3 days
var expiredTime = 1000 * 60 * 60 * 24 * 3;

/**
 *  Finds a performer given a hash,
 *  or the first one in the list of not provided
 */
module.exports.getPerformer = function(performers, _hash) {
    if (!_hash) {
        return performers[0];
    }

    for (var i = 0; i < performers.length; i++) {
        if (performers[i]._hash === _hash) {
            return performers[i];
        }
    }
    
    console.log('could not get performer!');
    return null;
};

/**
 *  Get active types from a given filter
 */
module.exports.getActiveTypes = function(filters) {
    var types = [];
    
    if (filters) {
        for (var key in filters) {
            if (filters[key] === 1) {
                types.push(key);
            }
        }
    }

    return types; 
};

/**
 *  Deletes a performer given a hash
 */
module.exports.destroyPerformer = function(performers, _hash) {
    for (var i = performers.length - 1; i >= 0; i--) {
        if (performers[i]._hash === _hash) {
            performers.splice(i,1);
        }
    }

    return performers;
};

/**
 *  All new current passes through this function
 */
module.exports.middleware = function(performer) {
    if (typeof performer.data === 'string') {  
        performer.data = performer.data
            .replace(/^(http:\/\/)+/, 'http://')
            .replace(/^http:\/\/https:\/\//, 'http://');
    }

    performer.view_time = Math.floor(Math.random() * Math.random() * 20) + 1;

    //add performer view_time object
    performer.viewed = false;
};

/**
 *  Cheat-clone for now
 */
module.exports.clone = function(object) {
    return JSON.parse(JSON.stringify(object));
}

/**
 *  Sort to timestamp
 */
module.exports.time = function(sort) {
    return (new Date(sort).toString()).split(" ").slice(-3,-2).toString();
}

/**
 *  Tells if the _sort has expired or not.
 */
module.exports.hasExpired = function(sort) {
    return (new Date - new Date(sort)) >= expiredTime;
}
