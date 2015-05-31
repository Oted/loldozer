var aps         = 0,
    Storage     = require('../utils/localstorage'),
    warnings    = 0;

module.exports = function(action) {
    console.log(aps);
    aps++;
    setTimeout(function() {
        aps--;
    }, 1500);

    //threshold before warning
    if (aps >= 4) {
        sendWarning();
    }
}

var sendWarning = function() {
    warnings++;
    aps = 0;
    
    switch (warnings) {
        case 1 : 
            alert('You are clicking too fast, calm down!'); 
        break;
        case 2 : 
            alert('Slow down!');
        break;
        default :
            Storage.destroyStorage("state");
            alert('Sry, u lost all experience...');
            location.reload();
        break;
    };
};
