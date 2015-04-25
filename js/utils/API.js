var LolActions  = require('../actions/LolActions'),
    Storage     = require('./localstorage'),
    $           = require('../../common/jquery.min'),
    Utils       = require('./utils.js'),
    amount      = 10;

 /**
 *  Fetches new items from the database.
 */
module.exports.getItems = function() {
    var seenStorage = Storage.getSuggestedQuery(),
        data = {
            "amount" : amount
        };

    if (seenStorage) {
        var first = Array.isArray(seenStorage.all) ? seenStorage.all[0].first : seenStorage.all.first; 
        var last = Array.isArray(seenStorage.all) ? seenStorage.all[0].last : seenStorage.all.last; 
        console.log('fetching first ', first, Utils.time(first));
        console.log('fetching first ', last, Utils.time(last));
        data.first = first;
        data.last = last;
    }

    $.ajax({
        method: 'GET',
        url:'http://188.166.45.196:3000/api/items',
        data: data,
        success: function(data) {
            console.log('response', data);
            for (var i = 0; i < data.length; i++) {
                LolActions.create(data[i]);
            }
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
        method: 'POST',
        url:'http://188.166.45.196:3000/api/items',
        data : {
            data : item.url,
            title : item.title,
            scraped : false
        },
        success: function(data, status) {
            console.log('response', data, status);
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
        success: function(data) {
            console.log('response', data);
        }
    });
};


/**
 *  Votes 1 for an item
 */
module.exports.upVote = function(hash) {
    $.ajax({
        method: 'POST',
        url:'http://188.166.45.196:3000/api/upvote/' + hash,
        success: function(data) {
            console.log('response', data);
        }
    });
};

/**
 *  Votes -1 for an item
 */
module.exports.downVote = function(hash) {
    $.ajax({
        method: 'POST',
        url:'http://188.166.45.196:3000/api/downvote/' + hash,
        success: function(data) {
            console.log('response', data);
        }
    });
};

/**
 *  Get the query amount
 */
module.exports.getAmount = function() {
    return amount;
}
