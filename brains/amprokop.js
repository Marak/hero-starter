module['exports'] = function (gameData, helpers) {
// The "Paranoid Assassin"
// This hero will attempt to kill the closest weaker enemy hero if the enemy is waaaaay weaker.
  var myHero = gameData.activeHero;
  if (myHero.health < 50) {
    return helpers.findNearestHealthWell(gameData);
  } else if (helpers.findNearestMuchWeakerEnemy(gameData)) {
    return helpers.findNearestMuchWeakerEnemy(gameData);
  } else {
    return helpers.findNearestNonTeamDiamondMine(gameData);
  }

};