var myZone = function (gameData) {
  
  var board = gameData.board;
  var hero = gameData.activeHero;
  
  var x = hero.distanceFromLeft,
      y = hero.distanceFromTop;

  var topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight;
  
  
  board.tiles.forEach(function(_tile){
    _tile.forEach(function(tile){
      var tileX = tile.distanceFromLeft,
          tileY = tile.distanceFromTop

      if (tileX === x - 1 && tileY === y - 1) {
        topLeft = tile;
      }

      if (tileX === x && tileY === y - 1) {
        top = tile;
      }

      if (tileX === x + 1 && tileY === y - 1) {
        topRight = tile;
      }

      if (tileY === y && tileX === x - 1) {
        left = tile;
      } 
      //console.log('tile', tileX, tileY)
      //console.log('me', x, y)
      //console.log('__')

      if (tileX === x + 1 && tileY === y) {
        right = tile;
      }

      if (tileX === x - 1 && tileY === y + 1) {
        bottomLeft = tile;
      }

      if (tileX === x && tileY === y + 1) {
        bottom = tile;
      }

      if (tileX === x + 1 && tileY === y + 1) {
        bottomRight = tile;
      }      
    });



  });
  
  function assignType (tile) {
    var type;
    if(typeof tile === "object") {
      
      if(tile.type === "Unoccupied") {
        return "U";
      }
      if(tile.type === "DiamondMine") {
        return "D";
      }
      if(tile.type === "HealthWell") {
        return "H";
      }

      
      if (tile.type === "Hero") {
        if (tile.team !== hero.team) {
          return "B";
        } else {
          return "E";
        }
      }
      
      type = tile.subType || tile.type;
//      console.log('ASS', type)
      
    } else {
      type = "N";
    }
    return type;
  }
  
  
  topLeft = assignType(topLeft)
  top = assignType(top)
  topRight = assignType(topRight)
  left = assignType(left)
  right = assignType(right)
  bottomLeft = assignType(bottomLeft)
  bottom = assignType(bottom)
  bottomRight = assignType(bottomRight)
  
  var arr = [];
  arr.push(topLeft, top, topRight);
  arr.push(left, '☺', right);
  arr.push(bottomLeft,  bottom, bottomRight);
  
  return arr;
  // get all tiles in my zone
//  var topLeft = gameData.board.tiles
  
  
  //console.log('ZONE', zone)
  //console.log(gameData)
};

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

            var parts = p.split('.');
            var tileValue;
            if (parts.length > 1) {
              tileValue = tile[parts[0]][parts[1]]
            } else {
              tileValue = tile[parts[0]];
            }

            switch(op) {
              case 'NEQ':
                found = tileValue !== val;
              break;
              case 'EQ':
                found = tileValue === val;
              break;
              case 'GT':
                found = tileValue > val;
              break;
              case 'GTE':
                found = tileValue >= val ;
              break;
              case 'LT':
                found = tileValue < val;
              break;
              case 'LTE':
                found = tileValue <= val;
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

 helpers.findNearestMuchWeakerEnemy = function(gameData) {
   var hero = gameData.activeHero;
   var board = gameData.board;

   //Get the path info object
   var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
     return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && (hero.health - enemyTile.health) > 20;
   });

   //Return the direction that needs to be taken to achieve the goal
   //If no weaker enemy exists, will simply return undefined, which will
   //be interpreted as "Stay" by the game object
   return pathInfoObject.direction;
 };