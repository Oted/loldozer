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

    return null;
}

/**
 *  Deletes a performer given a hash
 */
module.exports.destroyPerformer = function(performers, _hash) {
    for (var i = performers.length - 1; i >= 0; i--) {
        if (performers[i]._hash === _hash) {
            performers.splice(i,1);
            break;
        }
    }

    return performers;
}

/**
 *  All new current passes through this function
 */
module.exports.middleware = function(performer) {
    if (typeof performer.data === 'string') {  
        performer.data = performer.data
            .replace(/^(http:\/\/)+/, 'http://')
            .replace(/^http:\/\/https:\/\//, 'http://');
    }
};

/**
 *  Cheat-clone for now
 */
module.exports.clone = function(object) {
    return JSON.parse(JSON.stringify(object));
}
