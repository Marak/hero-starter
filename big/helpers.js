var nearestTile = function (gameData, query) {
  query = query || {};

  var board = gameData.board;
  var hero = gameData.activeHero;

  //Get the path info object
  var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(tile) {
    var found = true;
    for (var p in query) {
      var statement = query[p];
      // check searching until found is false
      // once found is false, that search parameter has failed
      // if none of the search parameters fail, this tile matches the query
      if (found) {
        if (typeof statement === "string" || typeof statement === "number") {
          found = statement === tile[p];
          // console.log('PERFORMING string query', statement, p, tile[p], found)
        } else {
          var op = statement.op,
              val = statement.val;
            switch(op) {
              case 'NEQ':
                found = tile[p] !== val;
              break;
              case 'EQ':
                found = tile[p] !== val;
              break;
              case 'GT':
                found = tile[p] > val;
              break;
              case 'GTE':
                found = tile[p] >= val ;
              break;
              case 'LT':
                found = tile[p] < val;
              break;
              case 'LTE':
                found = tile[p] <= val;
              break;
            }
            //console.log('PERFORMING obj query', statement, tile[p], found)
        }
      }
    }
    return found;
  });
  return pathInfoObject;
};

var findNearestTeamMemberDamagedTile = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
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
   var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(healthWellTile) {
     return healthWellTile.type === 'HealthWell';
   });

   //Return the direction that needs to be taken to achieve the goal
   return pathInfoObject;
 };
 
 // Returns the nearest health well or false, if there are no health wells
 var findNearestEnemyMineTile = function(gameData) {
   var hero = gameData.activeHero;
   var board = gameData.board;

   //Get the path info object
   var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(healthWellTile) {
     return mineTile.type === 'DiamondMine' && ineTile.owner.team !== hero.team;
   });

   //Return the direction that needs to be taken to achieve the goal
   return pathInfoObject;
 };
 
 
 var findNearestWeakerEnemyTile = function(gameData) {
   var hero = gameData.activeHero;
   var board = gameData.board;

   //Get the path info object
   var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
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
   var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
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
   var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
     return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health === 100;
   });

   //Return the direction that needs to be taken to achieve the goal
   //If no weaker enemy exists, will simply return undefined, which will
   //be interpreted as "Stay" by the game object
   return pathInfoObject;
 };
