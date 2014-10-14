//
// Chases critically injured enemies that less then 2 away
//
function stalk (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

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
    if (myHero.health >= (damagedEnemy.health - 20)) {
      if(damagedEnemy.distance <= 2) {
        direction = damagedEnemy.direction;
        return direction;
      }
    }
  }
}
