/**
 *  Module deals with transformation from raw data from the DB 
 *  to Chart.js compatible format.
 *
 *  expected single format
    {
        "query": {
            "hash" : "required, the _hash of the item"
        },
        "response": {
            "ratings" : [{
                "lastUpdated": "2015-01-05T14:55:42.100Z",
                "created": "2015-01-05T14:55:42.100Z",
                "_hash": "c0e7ec652aedac7b8b79d9555a77ada3",
                "value": -1,
                "expression": "creepy"
            }]
        }
    }
    
        chart js entety format
 
    label: "My Second dataset",
    fillColor: "rgba(151,187,205,0.2)",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: [28, 48, 40, 19, 86, 27, 90]


    data : {
        labels : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets : [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }]
    }
 */

var Utils       = require('./utils.js');

var steps       = 8,                            //steps(#labels)
    distance    = 3,                            //hours for each step
    frequency   = distance * 60 * 60 * 1000,    //frequency interval of data in 
    data        = {};                           //the actual data

/**
 *  Receives a set of rating's and converts them to the correct format.
 *  Data is an array of an array of ratings [[rating]]
 */
module.exports.transformRatingsToChart = function(ratingData) {
    var now         = new Date(),
        tempDates   = [];

    //iterate over the steps and create the array
    for (var i = 0; i < steps; i++) {
        tempDates[i] = now - (frequency * (steps - (i + 1)));
        console.log(Utils.time(tempDates[i]));
    }

    console.log(ratingData);
    //iterate over the given data
    for (var i = 0; i < ratingData.length; i++) {
        data[ratingData[i][0]] = 'dunno what to put here lol';
    }
};

/**
 *  Takes one single rating and put it into the right spot
 */
var transformSingleRating = function() {



};

/**
 *
 */
var generateLabels = function() {
    


};
