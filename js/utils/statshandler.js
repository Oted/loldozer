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
 */

var Utils       = require('./utils.js');

var steps       = 8,    //steps(#labels)
    //set these variables to override
    distance    = 0,    //hours for each step
    frequency   = 0,    //frequency interval of data in 
    data        = {
        'charts'  : [],
        'labels' : []    
    };

/**
 *  Receives an array of rating's and converts them to the correct format
 *  that chart.js expect, a list of values is returned.
 *
 *  This alg is basically place rating dates values into the right date 'bucket'.
 */
module.exports.transformRatingsToChart = function(ratingData) {
    if (!Array.isArray(ratingData) || ratingData.length < 1) {
        return data; 
    }

    //sort on created times
    ratingData = ratingData.sort(function(a, b) {
        return new Date(a.created) - new Date(b.created);
    });
   
    var result      = [],
        tempDates   = [],
        min         = new Date(ratingData[0].created),
        max         = new Date(ratingData[ratingData.length - 1].created),
        distance    = distance ? distance : max - min,
        frequency   = frequency ? frequency : Math.floor(distance / steps);

    //console.log(min, max, distance, frequency);
    //iterate over the steps and create the array
    for (var i = 0; i < steps; i++) {
        tempDates[i] = +(min) + frequency * i;
    }

    //loop over all label dates
    for (var i = 0; i < tempDates.length; i++) {

        //iterate over the given data
        for (var j = 0; j < ratingData.length; j++) {
      
            // if cond then add it to the interval
            if (new Date(ratingData[j].created) <= new Date(tempDates[i]) && new Date(ratingData[j].created) >= new Date(tempDates[i] - frequency)) {
                result[i] = result[i] ? result[i] + ratingData[j].value : ratingData[j].value;
            }
        }

        //if there is not result, add it
        if (!result[i]) {
            result[i] = 0;
        }

        //this should be a line chart so add previous value to the next
        if (i > 0) {
            result[i] += result[i-1];
        }
    }

    data.charts.push(result);
    data.labels = tempDates.map(function(d){return Utils.time(d)});
    return data;
};

/**
 *  Get the current data state
 */
module.exports.getData = function() {
    return data;
};

/**
 *Reset the data variable
 */
module.exports.resetData = function() {
    data = {
        'charts'  : [],
        'labels' : []    
    };
};
