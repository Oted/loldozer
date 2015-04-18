/**
 *  Finds a performer given a hash
 */
module.exports.getPerformer = function(performers, _hash) {
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
module.exports.getNextPerformer = function(performers) {
    return performers.shift();
}

/**
 *  Deletes a performer given a hash
 */
module.exports.destroyPerformer = function(performers, _hash) {
    for (var i = performers.length - 1; i > 0; i--) {
        if (performers[i]._hash === _hash) {
            performers.splice(i,1);
            break;
        }
    }
}

/**
 *  All new current passes through this function
 */
module.exports.middleware = function(performer) {
     performer.data = performer.data
        .replace(/^(http:\/\/)+/, 'http://')
        .replace(/^http:\/\/https:\/\//, 'http://');
};
