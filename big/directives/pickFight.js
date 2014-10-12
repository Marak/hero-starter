//
// Attack nearest damaged enemies
// If no enemies are damaged, go start a fight
//
function pickFight (gameData, helpers) {
 var direction;
 var myHero = gameData.activeHero;
  if (myHero.health === 100) {
    direction = helpers.findNearestWeakerEnemy(gameData);
    if (!direction) {
      direction = findNearestEnemyTile(gameData).direction || "North";
    }
    return direction;
  }
}
 
