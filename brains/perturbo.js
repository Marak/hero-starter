module['exports'] = function (gameData, helpers) {


// The "Careful grab-a-mine-if-i-can Assassin"
//
   var myHero = gameData.activeHero;

   var enemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
     if (boardTile.type === 'Hero' && boardTile.team != myHero.team) {
       return true;
     }
   });
   var distanceToEnemy = enemyStats.distance;
   var directionToEnemy = enemyStats.direction;
   var healthOfEnemy = enemyStats.health;

   weakEnemy = helpers.findNearestWeakerEnemy(gameData);
   nonTeamDiamondMine = helpers.findNearestNonTeamDiamondMine(gameData);
   healthWell = helpers.findNearestHealthWell(gameData);
   teamMember = helpers.findNearestTeamMember(gameData);

   
   // Finish him!!
   if (typeof directionToEnemy != 'undefined' && distanceToEnemy === 1 && healthOfEnemy <= 30) {
     return directionToEnemy;
   }

   // OMG RUN....
   else if (myHero.health <= 30) {
     return healthWell;
   }

   // Shhh hunting rabbit
   else if (typeof weakEnemy != 'undefined') {
     return weakEnemy;
   }

   // While I'm here ....
   else if (typeof directionToEnemy != 'undefined' && distanceToEnemy === 1) {
     return directionToEnemy;
   }

   // Quick!  No one is around to stop me
   else if (typeof nonTeamDiamondMine != 'undefined' && distanceToEnemy > 5 && myHero.health > Math.max(50, 100-10*(distanceToEnemy-3))){
     return nonTeamDiamondMine;
   }

   // This looks like a good place to sit .. except when I'm at 100 health
   else if (myHero.health < 100) {
     return healthWell;
   }

   // Help a friend
   else if (typeof teamMember != 'undefined') {
     return teamMember;
   }

   else {
     return healthWell;
   }
};
