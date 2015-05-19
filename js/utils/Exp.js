var LolActions      = require('../actions/LolActions.js');
var internals = {};

/**
 *  Constructor for experience and level handler
 */
function Exp(interactions, level, experience) {
    this.interactions   = interactions;
    this.lvl            = level;
    this.exp            = experience;
}

/**
 * Calculates the exp given the interactions.
 */
Exp.prototype.calculateExperience = function(vote) {
    switch (vote) {
        case "+1" :
            this.exp= 5 / (this.lvl * 0.5);
            this.interactions.upvotes++;
        break;
        case "0" :
            this.exp+= 2 / (this.lvl * 0.5);
            this.interactions.novotes++;
        break;
        case "-1" :
            this.exp+= 4 / (this.lvl * 0.5);
            this.interactions.downvotes++;
        break;
    }

    if (this.exp > 100) {
        this.levelUp();
    }
    
    return this.exp;
};

/**
 *  Get interactions
 */
Exp.prototype.getInteractions = function() {
    return this.interactions;
};

/**
 *  Get experience
 */
Exp.prototype.getExperience = function() {
    return this.exp;
};

/**
 *  Get level
 */
Exp.prototype.getLevel = function() {
    return this.lvl;
};

/**
 *  Helper for level up.
 */
Exp.prototype.levelUp = function() {
    var level = ++this.lvl;
    this.exp = 0;
   
    //set timout for now, not a valid solution 
    setTimeout(function() {
        LolActions.levelUp(level);
    },10);
};

module.exports = Exp;
