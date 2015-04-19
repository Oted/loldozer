var LolActions  = require('../actions/LolActions'),
    Storage     = require('./localstorage'),
    $           = require('../../common/jquery.min'),
    amount      = 10;
    
/**
 *  Fetches new items from the database.
 */
module.exports.getItems = function() {
    var seenStorage = Storage.getStorage();
    console.log('seen',seenStorage);
    $.ajax({
        method: 'GET',
        url:'http://188.166.45.196:3000/api/items',
        data: {
            amount : amount,
            first: seenStorage.all.first,
            last: seenStorage.all.last
        },
        success: function(data) {
            console.log('response', data);
            for (var i = 0; i < data.length; i++) {
                LolActions.create(data[i]);
            }
        }
    });
};

/**
 *  Get the query amount
 */
module.exports.getAmount = function() {
    return amount;
}
