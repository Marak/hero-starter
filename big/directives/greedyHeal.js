//
// If health is above 80 but below 100 and we are passing by a well,
// move in the direction of that well to heal
//
function greedHeal (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
   if(myHero.health < 100) {
     var well = findNearestHealthWellTile(gameData);
     var well = nearestTile(gameData, {
       type: "HealthWell"
     });
     if (well) {
       if (well.distance === 1) {
         return well.direction;
       }
     }
   }
}