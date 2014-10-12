var helpers;

 var tileQuery = function (gameDate, query) {
    query = query || {};
    
    var board = gameData.board;

    //Get the path info object
    var pathInfoObject = big.helpers.findNearestObjectDirectionAndDistance(board, hero, function(tile) {

      var parameters = ['type', 'team', 'health', 'owner'];
      var type = tile.type;
      var team = tile.team;
      var health = tile.health;
      var owner = tile.owner;

      var _query = [];
      var commands = ['NEQ', 'EQ', 'GT', 'GTE', 'LT', 'LTE'];
      
      var found = true;
      parameters.forEach(function(p){
        if (typeof query[p] !== "undefined") {
          if (found) {
            var statement = query[p];
            
            if (typeof statement === "string") {
              found = statement === eval(p);
            } else {
              var op = statement.op,
                  val = statement.val;
                  switch(str) {
                    case 'NEQ':
                      found = val !== eval(p);
                    break;
                    case 'EQ':
                      found = val === eval(p);
                    break;
                    case 'GT':
                      found = val > p;
                    break;
                    case 'GTE':
                      found = val === p;
                    break;
                    case 'LT':
                      found = val === p;
                    break;
                    case 'LTE':
                      found = val === p;
                    break;
                    
                  }
              f
            }
            var str = statement.substr(0, 3);
            var arr = str.join('');
            
            if(arr[2] === " ") {
              arr.pop();
            }
            
            str = arr.split("");

            console.log(str);
            
            if (str.indexOf(commands) !== -1) {
              
            }
            
            found = (p === query[p]);
          }
        }
      });

      return found;
    });
    
    
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
