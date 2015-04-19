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
    it('should create the session and update it', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 1429444601612
            },
            {
                "type"  : 'all',
                "_sort" : 1429444455402
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getSession()["all"]["first"]).to.equal(1429444601612);
        expect(Storage.getSession()["all"]["last"]).to.equal(1429444455402);
        done();
    });
    
    it('should update the session', function (done) {
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 1429444433871
            }
        ];

        Storage.updateSession(testPerformers);
        expect(Storage.getSession()["all"]["first"]).to.equal(1429444601612);
        expect(Storage.getSession()["all"]["last"]).to.equal(1429444433871);
        done();
    });

    it('should update the storage', function (done) {
        Storage.mergeAndUpdateStorage();
        expect(Storage.getStorage()["all"].length).to.equal(1);
        expect(Storage.getStorage()["all"][0].last).to.equal(1429444433871);
        done();
    });
    
    it('should update the storage once more', function (done) {
        Storage.destroySession();
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 1429444373494
            },
            {
                "type"  : 'all',
                "_sort" : 1429444372337
            },
            {
                "type" : "all",
                "_sort" : 1429444367676
            }
        ];

        Storage.updateSession(testPerformers);
        Storage.mergeAndUpdateStorage();
        expect(Storage.getStorage()["all"][0].last).to.equal(1429444433871);
        expect(Storage.getStorage()["all"][1].last).to.equal(1429444367676);
        done();
    });
    
    it('should update the storage', function (done) {
        Storage.destroySession();
        var testPerformers = [
            {
                'type' : "all",
                '_sort' : 1429444217809
            },
            {
                "type"  : 'all',
                "_sort" : 1429444187569
            },
            {
                "type" : "all",
                "_sort" : 1429444173196
            }
        ];

        Storage.updateSession(testPerformers);
        Storage.mergeAndUpdateStorage();
        console.log('STORAGE',Storage.getStorage());
        expect(Storage.getStorage()["all"][0].first).to.equal(1429444601612);
        expect(Storage.getStorage()["all"][0].last).to.equal(1429444367676);
        expect(Storage.getStorage()["all"][1].first).to.equal(1429444217809);
        expect(Storage.getStorage()["all"][1].last).to.equal(1429444173196);
        done();
    });
    
    it('should update the storage once more', function (done) {
        console.log('----')
            process.exit();
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
        expect(Storage.getSession()["all"]["first"]).to.equal(400);
        expect(Storage.getSession()["all"]["last"]).to.equal(1);
        expect(Storage.getSession()["lol"]["first"]).to.equal(2);
        expect(Storage.getSession()["lol"]["last"]).to.equal(1);

        done();
    });
    
});
