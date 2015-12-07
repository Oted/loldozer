var LolActions      = require('../actions/LolActions'),
    Async           = require('async'),
    $               = require('../../common/jquery.min'),
    Utils           = require('./utils.js'),
    prefix          = '',
    // prefix          = 'http://37.139.19.174',
    amount          = 20;

/**
 *  Fetches new items from the server.
 */
module.exports.getItems = function(Storage, filters) {
    var types = Utils.getActiveTypes(filters);

    var type = 'all',
        seenStorage = Storage.getSuggestedQuery(type),
        data = {
            "amount" : amount,
            "types" : JSON.stringify(types)
        };

    if (seenStorage && seenStorage[type]) {
        var first = Array.isArray(seenStorage[type]) ?
            seenStorage[type][0].first :
            seenStorage[type].first;

        var last = Array.isArray(seenStorage[type]) ?
            seenStorage[type][0].last : 
            seenStorage[type].last; 

        data.first = first;
        data.last = last;
    }

    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/items',
        data: data,
        success: function(data, msg) {
            for (var i = 0; i < data.length; i++) {
                LolActions.createPerformer(data[i]);
            }

            //send a notification that we have fetched out data
            LolActions.api('items', msg);
        }
    });
};

/**
 * If window.location contains a valid hash, 
 * fetch that item and put it in the front
 */
module.exports.maybeGetGivenHash = function(callback) {
    var path = window.location.search,
        hash;

    //path = "http://getsomeinternet.com/?hash=96c2d192ffd9cdab48a3a8026ed1d5c0&utm_content=buffer90254&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer";
    
    if (path.indexOf('?hash=') < 0) {
        return callback();
    }

    hash = path.match(/hash=([a-zA-Z0-9]{32})/);
    
    if (!hash || !hash.length || !hash[1]) {
        alert('Invalid hash provided');
        return callback();
    }

    module.exports.getItem(hash[1], function(err, item) {
        if (err || !item || !item.item) {
            alert('Invalid hash provided');
            return callback();
        }
        
        console.log('Setting demanded performer ', item.item);
        item.item.shared = true;
        LolActions.createPerformer(item.item);
        return callback();
    });
};

/**
 *  Fetches new items from the server.
 */
module.exports.getBest = function(filters) {
    var types = Utils.getActiveTypes(filters),
        data = {
            "amount" : amount,
            "types" : JSON.stringify(types)
        };   

    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/bestratings',
        data : data,
        success: function(res, msg) {
            LolActions.setBest(res);
            
            setTimeout(function() {
                LolActions.api('best', msg);
            }, 100);
        }
    });
};

/**
 *  Fetches all the ratings for one given hash.
 */
module.exports.getItem = function(hash, callback) {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/item',
        data : {
            'hash' : hash
        },
        success: function(data, msg) {
            //send a notification that we have fetched out data
            LolActions.api('item', msg);
            return callback(null, data);
        }
    });
};

/**
 * Get the info object
 */
module.exports.getInfo = function(state, next) {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/info',
        data : { 
            state : JSON.stringify(state)
        },
        success: function(data, msg) {
            //send a notification that we have fetched out data
            LolActions.api('info', msg);
            LolActions.setInfo(data);

            return next();
        }
    });
};

/**
 *  Fetches all the ratings for one given hash.
 */
module.exports.getRatings = function(hash) {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/ratings',
        data : {
            'hash' : hash
        },
        success: function(data, msg) {
            LolActions.setRatings(data, hash);

            //send a notification that we have fetched out data
            LolActions.api('ratings', msg);
        }
    });
};

/**
 *  Fetches new adjectives from the server.
 */
module.exports.getAdjectives = function() {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/adjectives',
        data: {
            "amount" : 3
        },
        success: function(data, msg) {
            LolActions.createAdjectives(data);

            //send a notification that we have fetched our data
            LolActions.api('adjectives', msg);
        }
    });
};

/**
 * Add a new item!
 */
module.exports.addItem = function(item) {
    if (!item.title || !item.url) {
        console.log('no data provided');
        return null;
    }
       
    $.ajax({
        method : "POST",
        url: prefix + '/api/items',
        data: {
            "title" : item.title,
            "data" : item.url,
            "scraped" : false
        },
        error: function(res, msg, err) {
            LolActions.api('add', res.status);
        },
        success : function(data, msg) {
            LolActions.api('add', 200);
        }
    });
};

/**
 * Add a new item!
 */
module.exports.postFeedbackMessage = function(item) {
    if (!item.message) {
        console.log('no message provided');
        return null;
    }

    $.ajax({
        method : "POST",
        url: prefix + '/api/feedback',
        data: {
            "message" : item.message,
            "email" : item.email
        },
        error: function(res, msg, err) {
            LolActions.api('feedback', msg);
        },
        success : function(data, msg) {
            LolActions.api('feedback', msg);
        }
    });
};

/**
 *  Votes 0 for an item
 */
module.exports.viewedItem = function(hash) {
    $.ajax({
        method: 'POST',
        url: prefix + '/api/view/' + hash,
        data : {
            'view_time' : 1
        },
        success: function(data, msg) {
            LolActions.api('view', msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            LolActions.api('view', textStatus);
        }
    });
};

/**
 *  Votes 0 for an item
 */
module.exports.noVote = function(hash) {
    $.ajax({
        method: 'POST',
        url: prefix + '/api/novote/' + hash,
        success: function(data, msg) {
            LolActions.api('vote', msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            LolActions.api('vote', textStatus);
        }
    });
};

/**
 *  Votes 1 for an item
 */
module.exports.upVote = function(hash, adjective) {
    var data = adjective ? {adjective : adjective} : {};
    
    $.ajax({
        method: 'POST',
        url: prefix + '/api/upvote/' + hash,
        data : data,
        success: function(data, msg) {
            LolActions.api('vote', msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            LolActions.api('vote', textStatus);
        }
    });
};

/**
 *  Votes -1 for an item
 */
module.exports.downVote = function(hash, adjective) {
    var data = adjective ? {adjective : adjective} : {};
    $.ajax({
        method: 'POST',
        url: prefix + '/api/downvote/' + hash,
        data : data,
        success: function(data, msg) {
            LolActions.api('vote', msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            LolActions.api('vote', textStatus);
        }
    });
};

/**
 *  Get the query amount
 */
module.exports.getAmount = function() {
    return amount;
}
