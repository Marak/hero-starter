//
// If passing by a grave and not that damaged, take the grave
//
function graveRobber (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  
  var grave = nearestTile(gameData, {
    subType: "Bones",
  });
  
  if (grave) {
    return grave.direction;
  }
}