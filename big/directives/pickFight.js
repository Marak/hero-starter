//
// Attack nearest damaged enemies
// If no enemies are damaged, go start a fight
//
function pickFight (gameData, helpers) {
 var direction;
 var myHero = gameData.activeHero;

  if (myHero.health === 100) {
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
    if (!damagedEnemy) {
      var enemy = nearestTile(gameData, {
        type: "Hero",
        team: {
          op: "NEQ",
          val: myHero.team
        }
      })
      return enemy.direction;
    } else {
      return damagedEnemy.direction;
    }
  }
}