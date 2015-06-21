/**
 *  The init effect.
 */
module.exports.init = function() {
    module.exports.spinText(1080);
    module.exports.setCrystalSize(30);
};

/**
 *  Spin the logo text.
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
