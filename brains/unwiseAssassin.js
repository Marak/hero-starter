module['exports'] = function (gameData, helpers) {

 // The "Unwise Assassin"
   var myHero = gameData.activeHero;
   if (myHero.health < 30) {
     return helpers.findNearestHealthWell(gameData);
   } else {
     return helpers.findNearestEnemy(gameData);
   }

};