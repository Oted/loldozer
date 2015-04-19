var Code    = require('code'),
    Lab     = require('lab'),
    lab     = exports.lab 
            = Lab.script();

var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    after       = lab.after,
    expect      = Code.expect;

var Utils       = require('../js/utils/utils');

describe('utils', function () {
    it('clone an object', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 10
            },
            {
                "type"  : 'all',
                "_sort" : 9
            }
        ];

        expect(Utils.clone(testPerformers)[0]["type"]).to.equal(testPerformers[0]["type"]);
        done();
    });
});
