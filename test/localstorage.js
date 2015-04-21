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
    
    // it('should update the storage', function (done) {
        // Storage.destroySession();
        // var testPerformers = [
            // {
                // 'type' : "all",
                // '_sort' : 1429444217809
            // },
            // {
                // "type"  : 'all',
                // "_sort" : 1429444187569
            // },
            // {
                // "type" : "all",
                // "_sort" : 1429444173196
            // }
        // ];

        // Storage.updateSession(testPerformers);
        // Storage.mergeAndUpdateStorage();
        // console.log('STORAGE',Storage.getStorage());
        // expect(Storage.getStorage()["all"][0].first).to.equal(1429444601612);
        // expect(Storage.getStorage()["all"][0].last).to.equal(1429444367676);
        // expect(Storage.getStorage()["all"][1].first).to.equal(1429444217809);
        // expect(Storage.getStorage()["all"][1].last).to.equal(1429444173196);
        // done();
    // });
    
    it('should update the storage once more', function (done) {
        var testPerformers1 = [
            {
                'type' : "all",
                '_sort' : 1420918888461
            },
            {
                "type"  : 'all',
                "_sort" : 1420919134954
            }
        ];

        var testPerformers2 = [
            {
                'type' : "all",
                '_sort' : 1429471038521
            },
            {
                "type"  : 'all',
                "_sort" : 1429470999062
            },
            {
                "type" : 'all',
                "_sort" : 1429470965649
            }
        ];
        
        Storage.destroySession();

        Storage.updateSession(testPerformers1);
        Storage.mergeAndUpdateStorage();
        Storage.updateSession(testPerformers2);
        Storage.mergeAndUpdateStorage();
        expect(Storage.getStorage()["all"].length).to.equal(1);
        expect(Storage.getStorage()["all"][0].first).to.equal(1429471038521);

        done();
    });
});
