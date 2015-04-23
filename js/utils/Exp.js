var LolActions      = require('../actions/LolActions.js'),
    currentExp      = 0,
    currentLevel    = 1;

/**
 * Calculates the exp given the interactions.
 */
module.exports.calculateExperience = function(interactions, vote) {
    //currentExp = (interactions.upvotes + interactions.downvotes + interactions.novotes) * (5 / currentLevel));
    switch (vote) {
        case "+1" :
            currentExp+= 5 / (currentLevel * 0.5);
        break;
        case "0" :
            currentExp+= 2 / (currentLevel * 0.5);
        break;
        case "-1" :
            currentExp+= 4 / (currentLevel * 0.5);
        break;
    }

    if (currentExp > 100) {
        levelUp();
    }
    
    console.log(currentExp);
    return currentExp;
};

/**
 *  Get experience
 */
module.exports.getExperience = function() {
    return currentExp;
};

/**
 *  Helper for level up.
 */
var levelUp = function() {
    currentLevel++;
    currentExp = 0;
   
    //set timout for now, not a valid solution 
    setTimeout(function() {
        LolActions.levelUp(currentLevel);
    },10);
}
