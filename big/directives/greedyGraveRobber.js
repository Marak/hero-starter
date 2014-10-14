//
// If passing by a grave and not that damaged, take the grave
//
function greedyGraveRobber (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  
  var grave = nearestTile(gameData, {
    subType: "Bones",
  });
  
  if (grave) {
    if (grave.distance === 1) {
      return grave.direction;
    }
  }
}