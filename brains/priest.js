module['exports'] = function (gameData, helpers) {

// // The "Priest"
// // This hero will heal nearby friendly champions.
 var move = function(gameData, helpers) {
   var myHero = gameData.activeHero;
   if (myHero.health < 60) {
     return helpers.findNearestHealthWell(gameData);
   } else {
     return helpers.findNearestTeamMember(gameData);
   }
 };

};