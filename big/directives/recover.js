//
// Heal if considerably damaged
//
function recover (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  if (myHero.health < 50) {
    direction = helpers.findNearestHealthWell(gameData);
    return direction;
  }
}