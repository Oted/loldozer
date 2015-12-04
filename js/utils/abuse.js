var aps         = 0,
    Storage     = require('../utils/localstorage'),
    warnings    = 0;

module.exports = function() {
    aps++;
    setTimeout(function() {
        aps--;
    }, 5000);

    //threshold before warning
    if (aps >= 2) {
        sendWarning();
    }
}

var sendWarning = function() {
    warnings++;
    aps = 0;
    
    switch (warnings) {
        case 1 : 
            alert('You are scrolling too fast, calm down!'); 
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
