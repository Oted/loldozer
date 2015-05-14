var LolActions      = require('../actions/LolActions'),
    Storage         = require('./localstorage'),
    StatsHandler    = require('./statshandler.js'),
    Async           = require('async'),
    $               = require('../../common/jquery.min'),
    Utils           = require('./utils.js'),
    amount          = 10;

/**
 *  Fetches new items from the server.
 */
module.exports.getItems = function() {
    var type = 'all',
        seenStorage = Storage.getSuggestedQuery(type),
        data = {
            "amount" : amount
        };

    if (seenStorage && seenStorage[type]) {
        var first = Array.isArray(seenStorage[type]) ?
            seenStorage[type][0].first :
            seenStorage[type].first;

        var last = Array.isArray(seenStorage[type]) ?
            seenStorage[type][0].last : 
            seenStorage[type].last; 

        console.log('fetching first ', first, Utils.time(first));
        console.log('fetching last ', last, Utils.time(last));
        data.first = first;
        data.last = last;
    }

    $.ajax({
        method: 'GET',
        url:'http://188.166.45.196:3000/api/items',
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
 *  Fetches new items from the server.
 */
module.exports.getBest = function() {
    $.ajax({
        method: 'GET',
        url:'http://188.166.45.196:3000/api/bestratings',
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
        url:'http://188.166.45.196:3000/api/item',
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
 *  Fetches all the ratings for one given hash.
 */
module.exports.getRatings = function(hash) {
    //hash = 'bff5943986488341a555a8a82e855ae8';
    
    $.ajax({
        method: 'GET',
        url:'http://188.166.45.196:3000/api/ratings',
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
        url:'http://188.166.45.196:3000/api/adjectives',
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
       
    console.log('itemeee', item); 
    $.ajax({
        method : "POST",
        url:'http://188.166.45.196:3000/api/items',
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
 *  Votes 0 for an item
 */
module.exports.noVote = function(hash) {
    $.ajax({
        method: 'POST',
        url:'http://188.166.45.196:3000/api/novote/' + hash,
        success: function(data, msg) {
            LolActions.api('vote', msg);
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
        url:'http://188.166.45.196:3000/api/upvote/' + hash,
        data : data,
        success: function(data, msg) {
            LolActions.api('vote', msg);
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
        url:'http://188.166.45.196:3000/api/downvote/' + hash,
        data : data,
        success: function(data, msg) {
            LolActions.api('vote', msg);
        }
    });
};

/**
 *  Get the query amount
 */
module.exports.getAmount = function() {
    return amount;
}
