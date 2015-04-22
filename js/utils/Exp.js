var currentExp = 0,
    currentLevel = 1;

/**
 * Calculates the exp given the interactions.
 */
module.exports.calculateExperience = function(interactions) {
    currentExp = ((interactions.upvotes + interactions.downvotes + (interactions.novotes / 10)) * (5 / currentLevel));

    if (currentExp > (100 * currentLevel)) {
        currentLevel++;
    }

    console.log(currentExp);

    return currentExp;
};

/**
 *  Get experience
 */
module.exports.getExperience = function() {
    return currentExp % 100;
};
