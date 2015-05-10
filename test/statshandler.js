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
        var data = StatsHandler.getData();

        expect(data.labels.length).to.equal(data.charts[0].length);

        done();
    });

    it('should create tow identical charts', function (done) {
        StatsHandler.resetData();

        StatsHandler.transformRatingsToChart(testRatings);
        StatsHandler.transformRatingsToChart(testRatings);

        var data = StatsHandler.getData();

        expect(data.charts.length).to.equal(2);
        expect(data.labels.length).to.equal(data.charts[0].length);

        done();
    });

});
