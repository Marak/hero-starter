//
// Heal if under 60 health
//
function recover (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  if (myHero.health <= 60) {
    direction = helpers.findNearestHealthWell(gameData);
    return direction;
  }
}