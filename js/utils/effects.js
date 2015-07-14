var flashNextButton = false;

/**
 *  The init effect.
 */
module.exports.init = function() {
    module.exports.spinText(1080);
    module.exports.spinPlay(-1800);
    module.exports.setCrystalSize(30);
};

/**
 * Flash the next button so retarded people know where to click
 */
module.exports.flashNextButton = function() {
    var e = document.getElementById('next-button');
    e.style.color = 'white';
    setTimeout(function() {
        e.style.color = 'red';
        setTimeout(function() {
            if (flashNextButton) {
                module.exports.flashNextButton(); 
            }
        }, 1000);
    }, 1000);
}

/**
 * Set flashing of next button
 */
module.exports.setFlashNext = function(bool) {
    console.log('here');
    flashNextButton = bool;
};

/**
 *  Shine logo
 */
module.exports.shineLogo = function() {
    var e = document.getElementById('logo-bright-top');
    e.style.opacity = 1;
    setTimeout(function(){e.style.opacity = 0;}, 750);
}

/**
 *  Spin the logo text.
 */
module.exports.spinPlay = function(deg) {
    var e = document.getElementById('logo-play');
    e.rotation = e.rotation ? e.rotation + deg : deg;
    e.style.webkitTransform = 'rotate(' + e.rotation + 'deg)';
    e.style.transform = 'rotate(' + e.rotation + 'deg)';
};


/**
 *  Spin the inner play.
 */
module.exports.spinText = function(deg) {
    var e = document.getElementById('logo-text-top');
    e.rotation = e.rotation ? e.rotation + deg : deg;
    e.style.webkitTransform = 'rotate(' + e.rotation + 'deg)';
    e.style.transform = 'rotate(' + e.rotation + 'deg)';
};

/**
 *  Set sizes of crystals
 */
module.exports.setCrystalSize = function(width) {
    var l = document.getElementById('left-corner-image'),
        r = document.getElementById('right-corner-image');

    l.style.width = width + '%';
    r.style.width = width + '%';
};
