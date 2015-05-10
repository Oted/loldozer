var Code    = require('code'),
    Lab     = require('lab'),
    lab     = exports.lab 
            = Lab.script();

var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    after       = lab.after,
    expect      = Code.expect;

var Storage         = require('../js/utils/localstorage'),
    testStorage     = require('./data/test_storage.json');


describe('storage', function () {
    var d1 = new Date() - 1000;
    var d2 = new Date() - 2000;
    var d3 = new Date() - 3000;
    var d4 = new Date() - 4000;
    var d5 = new Date() - 5000;
    var d6 = new Date() - 6000;

    it('should create the session and update it', function (done) {
        
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : d1
            },
            {
                "type"  : 'all',
                "_sort" : d2
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getSession()["all"]["first"]).to.equal(d1);
        expect(Storage.getSession()["all"]["last"]).to.equal(d2);
        done();
    });
    
    it('should update the session', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : d3
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getSession()["all"]["first"]).to.equal(d1);
        expect(Storage.getSession()["all"]["last"]).to.equal(d3);
        done();
    });

    it('should update the storage', function (done) {
        Storage.mergeAndUpdateStorage();
        expect(Storage.getStorage()["all"].length).to.equal(1);
        expect(Storage.getStorage()["all"][0].last).to.equal(d3);
        done();
    });
    
    it('should update the storage once more', function (done) {
        Storage.destroySession();
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : d4
            },
            {
                "type"  : 'all',
                "_sort" : d5
            },
            {
                "type" : "all",
                "_sort" : d6
            }
        ];

        Storage.updateSession(testPerformers);
        Storage.mergeAndUpdateStorage();
        expect(Storage.getStorage()["all"][0].last).to.equal(d3);
        expect(Storage.getStorage()["all"][1].last).to.equal(d6);
        done();
    });
});
