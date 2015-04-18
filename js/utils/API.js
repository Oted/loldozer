var LolActions  = require('../actions/LolActions'),
    $           = require('../../common/jquery.min');
    
/**
 *  Fetches new items from the database.
 */
module.exports.getItems = function() {
    $.ajax({
        method: 'GET',
        url:"http://188.166.45.196:3000/api/items?amount=100",  
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                LolActions.create(data[i]);
            }
        }
    });
};

