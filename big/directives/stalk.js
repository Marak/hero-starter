//
// Chases critically injured enemies that are 2 away
//
function stalk (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  if (myHero.health >= 80) {
    // TODO: finishing blow logic / keep going if enemy is one hit away
    var tile = findNearestWeakerEnemyTile(gameData);

      var damagedEnemy = nearestTile(gameData, {
        type: "Hero",
        team: {
          op: "NEQ",
          val: myHero.team
        },
        health: {
          op: "LTE",
          val: 40 
        }
      });

    if (damagedEnemy) {
      //console.log(tile.distance);
      if(damagedEnemy.distance <= 2) {
        direction = damagedEnemy.direction;
        return direction;
      }
    }
  }
}
