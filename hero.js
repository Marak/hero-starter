/* 
   "Big"

   This hero will in order:

    1. Recover - Heal self if below 80 health
    2. Greedy Heal - Heal self if not at full health and right next to well
    3. High-Five! - Heal damaged friend if at full health and right next to friend
    4. Assasinate - Kill heavily damaged enemy if right next to it
    5. Pick a Fight - If at full health, attack damaged enemies
    6. Buddy Up - If at 80 or 90 health, go find a friend

*/
 var move = function(gameData, helpers) {

   var myHero = gameData.activeHero,
       myBoard = gameData.board,
       direction = "North";

    var findNearestTeamMemberDamagedTile = function(gameData) {
      var hero = gameData.activeHero;
      var board = gameData.board;

      //Get the path info object
      var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
        //console.log(heroTile.health)
        return heroTile.type === 'Hero' && heroTile.team === hero.team && heroTile.health < 90;
      });

      //Return the direction that needs to be taken to achieve the goal
      return pathInfoObject;
    };

   // Returns the nearest health well or false, if there are no health wells
   var findNearestHealthWellTile = function(gameData) {
     var hero = gameData.activeHero;
     var board = gameData.board;

     //Get the path info object
     var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(healthWellTile) {
       return healthWellTile.type === 'HealthWell';
     });

     //Return the direction that needs to be taken to achieve the goal
     return pathInfoObject;
   };
   
   var findNearestWeakerEnemyTile = function(gameData) {
     var hero = gameData.activeHero;
     var board = gameData.board;

     //Get the path info object
     var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
       return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health <= 40;
     });

     //Return the direction that needs to be taken to achieve the goal
     //If no weaker enemy exists, will simply return undefined, which will
     //be interpreted as "Stay" by the game object
     return pathInfoObject;
   };

   var findNearestEnemyTile = function(gameData) {
     var hero = gameData.activeHero;
     var board = gameData.board;

     //Get the path info object
     var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
       return enemyTile.type === 'Hero' && enemyTile.team !== hero.team;
     });

     //Return the direction that needs to be taken to achieve the goal
     //If no weaker enemy exists, will simply return undefined, which will
     //be interpreted as "Stay" by the game object
     return pathInfoObject;
   };


   var findNearestEnemyTileFullHealth = function(gameData) {
     var hero = gameData.activeHero;
     var board = gameData.board;

     //Get the path info object
     var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
       return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health === 100;
     });

     //Return the direction that needs to be taken to achieve the goal
     //If no weaker enemy exists, will simply return undefined, which will
     //be interpreted as "Stay" by the game object
     return pathInfoObject;
   };


   var finish = function () {
     //console.log("MOVING", direction)
     return direction;
   };

   //
   // Directives ( in order of importance )
   //
   
   // 1. Recover
   // Heal if under 80 health
   //
   if (myHero.health < 80) {
     //console.log('HEALING');
     direction = helpers.findNearestHealthWell(gameData);
     return finish();
   }

   //
   // 2. Greedy Heal
   // If health is above 80 but below 100 and we are passing by a well,
   // move in the direction of that well to heal
   //
   if(myHero.health < 100) {
     var well = findNearestHealthWellTile(gameData);
     if (well) {
       if (well.distance === 1) {
         direction = well.direction;
         return finish();
       }
     }
   }

   //
   // 3. High-five!
   // If hero is at full health and passing by a damaged friend,
   // heal that friend
   if(myHero.health === 100) {
     var friend = findNearestTeamMemberDamagedTile(gameData);
     if (friend) {
       if (friend.distance === 1) {
         direction = friend.direction;
         return finish();
       }
     }
   }

    //
    // 4. Assasinate
    // Kill heavily damaged enemy if right next to it
    if (myHero.health >= 60) {

      var tile = findNearestWeakerEnemyTile(gameData);

      if (tile) {
        //console.log(tile.distance);
        if(tile.distance <= 2) {
          direction = tile.direction;
          return finish();
        }
      }
    }

   //
   // 5. Pick a fight
   // Attack nearest damaged enemies
   // If no enemies are damaged, go start a fight
   if (myHero.health === 100) {
     direction = helpers.findNearestWeakerEnemy(gameData);
     if (!direction) {
       direction = findNearestEnemyTile(gameData).direction || "North";
     }
     return finish();
   }

   //
   // 6. Buddy up
   // If health is 80 or 80, find a friend
   // If no friends are left, go to the closest well
   if (myHero.health <= 90) {
     //console.log('FINDING FRIEND');
     direction = helpers.findNearestTeamMember(gameData) || findNearestHealthWellTile(gameData).direction;
     return finish();
   }

 };

// Export the move function here
module.exports = move;
