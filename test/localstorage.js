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
    testStorage     = require('./data/test_storage.json'),
    testValues  = {
        "all" : {
            "first" : 4,
            "last" : 3
        },
        "youtube" : {
            "first" : 2,
            "last" : 1
        }
    };


describe('storage', function () {
    it('should create the session and update it', function (done) {
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

        Storage.updateSession(testPerformers);
        expect(Storage.getStorage()).to.not.exist();
        expect(Storage.getSession()["all"]["first"]).to.equal(10);
        expect(Storage.getSession()["all"]["last"]).to.equal(9);
        done();
    });
    
    it('should update the session', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 100
            },
            {
                "type"  : 'all',
                "_sort" : 2
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getStorage()).to.not.exist();
        expect(Storage.getSession()["all"]["first"]).to.equal(100);
        expect(Storage.getSession()["all"]["last"]).to.equal(2);
        done();
    });

    it('should update the all and the lol key in session', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 100
            },
            {
                "type"  : 'all',
                "_sort" : 2
            },
            {
                "type" : "lol",
                "_sort" : 1
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getStorage()).to.not.exist();
        expect(Storage.getSession()["all"]["first"]).to.equal(100);
        expect(Storage.getSession()["all"]["last"]).to.equal(1);
        expect(Storage.getSession()["lol"]["first"]).to.equal(1);
        expect(Storage.getSession()["lol"]["last"]).to.equal(1);

        done();
    });

    it('should update the storage', function (done) {
        Storage.mergeAndUpdateStorage();
        
        expect(Storage.getStorage()["all"].length).to.equal(1);
        expect(Storage.getStorage()["lol"].length).to.equal(1);
        expect(Storage.getStorage()["all"][0].last).to.equal(1);

        done();
    });
    
    it('should update the storage once more', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 200
            },
            {
                "type"  : 'all',
                "_sort" : 150
            },
            {
                "type" : "lol",
                "_sort" : 2
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getSession()["all"]["first"]).to.equal(200);
        expect(Storage.getSession()["all"]["last"]).to.equal(1);
        expect(Storage.getSession()["lol"]["first"]).to.equal(2);
        expect(Storage.getSession()["lol"]["last"]).to.equal(1);

        done();
    });
    
    it('should update the storage', function (done) {
        Storage.mergeAndUpdateStorage();
        
        expect(Storage.getStorage()["all"].length).to.equal(1);
        expect(Storage.getStorage()["lol"].length).to.equal(1);
        expect(Storage.getStorage()["all"][0].first).to.equal(200);
        expect(Storage.getStorage()["all"][0].last).to.equal(1);

        done();
    });
    
    it('should update the storage once more', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 400
            },
            {
                "type"  : 'all',
                "_sort" : 350
            }
        ];

        Storage.updateSession(testPerformers);
        Storage.mergeAndUpdateStorage();
        expect(Storage.getSession()["all"]["first"]).to.equal(200);
        expect(Storage.getSession()["all"]["last"]).to.equal(1);
        expect(Storage.getSession()["lol"]["first"]).to.equal(2);
        expect(Storage.getSession()["lol"]["last"]).to.equal(1);

        done();
    });
    
});
