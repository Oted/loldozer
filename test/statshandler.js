var Code    = require('code'),
    Lab     = require('lab'),
    lab     = exports.lab 
            = Lab.script();

var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    after       = lab.after,
    expect      = Code.expect;

var StatsHandler    = require('../js/utils/statshandler'),
    testRatings     = require('./data/test_ratings.json');

describe('stats', function () {
    it('should create data', function (done) {
        StatsHandler.transformRatingsToChart(testRatings);
        done();
    });
});
