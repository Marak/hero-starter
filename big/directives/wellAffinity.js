//
// If not at full health and a well is within 2 blocks, move towards it
//
function wellAffinity (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
   var well = nearestTile(gameData, {
     type: "HealthWell"
   });
   if (myHero.health < 100) {
     if (well) {
       if (well.distance === 2) {
         return well.direction;
       }
     }
   }
}