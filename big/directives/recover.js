//
// Heal if under 80 health
//
function recover (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  if (myHero.health < 80) {
    direction = helpers.findNearestHealthWell(gameData);
    return direction;
  }
}