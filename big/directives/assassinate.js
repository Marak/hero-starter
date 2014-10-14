//
// Kill heavily damaged enemy if right next to it
//
function assassinate (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  if (myHero.health >= 60) {

      var damagedEnemy = nearestTile(gameData, {
        type: "Hero",
        team: {
          op: "NEQ",
          val: myHero.team
        },
        health: {
          op: "LTE",
          val: 20 
        }
      });

    if (damagedEnemy) {
      //console.log(tile.distance);
      if(damagedEnemy.distance <= 1) {
        direction = damagedEnemy.direction;
        return direction;
      }
    }
  }
}
