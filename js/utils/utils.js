/**
 *  Finds a performer given a hash
 */
module.exports.getPerformer = function(performers, hash) {
    for (var i = 0; i < performers.length; i++) {
        if (performers[i].hash === hash) {
            return performers[i].hash;
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
module.exports.destroyPerformer = function(performers, hash) {
    for (var i = performers.length - 1; i > 0; i--) {
        if (performers[i].hash === hash) {
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
