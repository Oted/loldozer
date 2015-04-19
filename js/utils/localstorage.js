/*
 *  Deals with the localstorage and make sure to not show the 
 *  same stuff next time someone returns.
 */

//create dummy object 
var currentStorage = {};

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
 * Updates the current localstorage with new _sort times,
 * first and last refers to the first one you saw, resp the last one.
 */
module.exports.updateStorage = function(performers) {
    var p, key, value;

    for (var i = 0; i < performers.length; i++) {
        p       = performers[i],
        key     = p.type,
        value   = parseInt(p._sort);
        
        if (!currentStorage["all"]) {
            currentStorage["all"] = {
                "first" : value,
                "last" : value
            };
        } else {
            currentStorage["all"].first   = parseInt(currentStorage["all"].first) < value ? value : currentStorage["all"].first;  
            currentStorage["all"].last    = parseInt(currentStorage["all"].last) > value ? value : currentStorage["all"].last;  
        }

        if (currentStorage[key]) {
            currentStorage[key].first   = parseInt(currentStorage[key].first) < value ? value : currentStorage[key].first;  
            currentStorage[key].last    = parseInt(currentStorage[key].last) > value ? value : currentStorage[key].last;  
        } else {
            currentStorage[key] = {
                "first" : value,
                "last" : value
            }
        }
    }

    console.log('update storage', JSON.stringify(currentStorage));
    localStorage.setItem("seen", JSON.stringify(currentStorage));
};

/**
 *  Get the current storage object
 */
module.exports.getStorage = function() {
    return currentStorage;
};
