var LolActions      = require('../actions/LolActions'),
    Storage         = require('./localstorage'),
    StatsHandler    = require('./statshandler.js'),
    Async           = require('async'),
    $               = require('../../common/jquery.min'),
    Utils           = require('./utils.js'),
    prefix          = '',
    // prefix          = 'http://188.166.45.196',
    amount          = 25;

/**
 *  Fetches new items from the server.
 */
module.exports.getItems = function(filters) {
    var types = [];

    if (filters) {
        for (var key in filters) {
            if (filters[key] === 1) {
                types.push(key);
            }
        }
    }

    types = JSON.stringify(types);

    var type = 'all',
        seenStorage = Storage.getSuggestedQuery(type),
        data = {
            "amount" : amount,
            "types" : types
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
            console.log('got items!', data);
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

    if (path.indexOf('?hash=') < 0) {
        return callback();
    }
    
    hash = path.split('=').pop();
    
    //this 'validation' is kina meh but works for now
    if (!hash && hash.length != 32) {
        alert('Invalid hash provided');
        return callback();
    }

    module.exports.getItem(hash, function(err, item) {
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
module.exports.getBest = function() {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/bestratings',
        data : {
            'amount' : 10
        },
        success: function(data, msg) {
            console.log('got best ratings!', msg, data);

            Async.mapSeries(data, function(item, callback) {
                module.exports.getItem(item._hash, callback);
            }, function(err, res) {
                console.log('here!', msg, data);
                if (err) {
                    return LolActions.api('best', err);
                }

                LolActions.setBest(res);
                LolActions.api('best', msg);
            });

            //send a notification that we have fetched out data
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
module.exports.getInfo = function() {
    $.ajax({
        method: 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        url: prefix + '/api/info',
        success: function(data, msg) {
            //send a notification that we have fetched out data
            LolActions.api('info', msg);
            LolActions.setInfo(data);
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
            console.log('got ratings!', msg, data);
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
            console.log('got adjectives!', data);
            
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
            console.log(msg, data);
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
            LolActions.api('support', res.status);
        },
        success : function(data, msg) {
            console.log(msg, data);
            LolActions.api('support', 200);
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
