//
// Kill heavily damaged enemy if right next to it
//
function assassinate (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  if (myHero.health >= 60) {

    var tile = findNearestWeakerEnemyTile(gameData);

    if (tile) {
      //console.log(tile.distance);
      if(tile.distance <= 2) {
        direction = tile.direction;
        return direction;
      }
    }
  }
}
