/*

  Hello, I am big

  This file was autogenerated using ./build/gulpfile.js
  
  See: ./big/ folder for actual source code

*/
var big = {};
big.directives = [];
big.use = function (directive, fn) {
  big.directives[directive] = fn;
  return this;
};
big.move = function (gameData, helpers){
  big.helpers = helpers;
  var direction;
  Object.keys(big.directives).forEach(function(directive){
    if (direction) {
      return direction;
    }
    direction = big.directives[directive](gameData, helpers);
  });
  if (typeof direction === "undefined") {
    // if all else fails, go north my son
    direction = "North";
  }
  return direction;
};
//
// Kill heavily damaged enemy if right next to it
//
function assassinate (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  if (myHero.health >= 60) {

      var damagedEnemy = nearestTile(gameData, {
        type: "Hero",
        team: {
          op: "NEQ",
          val: myHero.team
        },
        health: {
          op: "LTE",
          val: 20 
        }
      });

    if (damagedEnemy) {
      //console.log(tile.distance);
      if(damagedEnemy.distance <= 1) {
        direction = damagedEnemy.direction;
        return direction;
      }
    }
  }
}

//
// If hero is potentially entering a 2:1 combat situation,
// try to move to a position that ensures next move is 1:1 and not 2:1
//
function avoidDanger (gameData, helpers) {
  var direction;
  //console.log(gameData.board)
  var myHero = gameData.activeHero;

  var zone = myZone(gameData);
  
  console.log("----- MYZONE -----")
  console.log(zone[0], '|', zone[1], '|', zone[2]);
  console.log(zone[3], '|', zone[4], '|', zone[5]);
  console.log(zone[6], '|', zone[7], '|', zone[8]);
  
  var NW = zone[0], 
      N = zone[1],
      NE = zone[2],
      W = zone[3],
      E = zone[5],
      SW = zone[6],
      S = zone[7],
      SE = zone[8];
  
  /*
  
    2:1 attack south / north-east

     U | U | E
     U | ☺ | U
     D | E | U

  */

  // 2:1 from south / north-east
  if (S === "E" && NE === "E") {
    if (W === "U") {
      return "West";
    }
    if (N === "U") {
      return "North";
    }
  }

  /*
    2:1 attack south / north-west

     E | U | U
     U | ☺ | U
     D | E | U
  */
  if (S === "E" && NW === "E") {
    if (E === "U") {
      return "East";
    }
    if (N === "U") {
      return "North";
    }
  }

  /*
    2:1 attack west / south-east

     U | U | U
     E | ☺ | U
     D | U | E
  */
  if (W === "E" && SE === "E") {
    if (N === "U") {
      return "North";
    }
    if (E === "U") {
      return "East";
    }
  }

  /*
    2:1 attack east / north-west

     E | U | U
     U | ☺ | E
     D | U | U
  */
  if (E === "E" && NW === "E") {
    if (S === "U") {
      return "South";
    }
    if (W === "U") {
      return "West";
    }
  }

  /*
    2:1 attack north / south

     U | E | U
     U | ☺ | U
     D | E | U
  */
  if (N === "E" && S === "E") {
    if (W === "U") {
      return "West";
    }
    if (E === "U") {
      return "East";
    }
  }

  /*
    2:1 attack east / west

     U | U | U
     E | ☺ | E
     D | U | U
  */
  if (E === "E" && W === "E") {
    if (N === "U") {
      return "North";
    }
    if (S === "U") {
      return "South";
    }
  }

   // from the north-west
  if (N === "E" && W === "E") {
    if (E === "U") {
      return "East";
    }
    if (S === "U") {
      return "South";
    }
  }

  // from the north-east
  if (N === "E" && E === "E" ) {
    if (W === "U") {
      return "West";
    }
    if (S === "U") {
      return "South";
    }
  }

  // south-west
  if (S === "E" && W === "E") {
    if (E === "U") {
      return "East";
    }
    if (N === "U") {
      return "Noth";
    }
  }

  // south-east
  if (S === "E" && E === "E") {
    if (W === "U") {
      return "West";
    }
    if (N === "U") {
      return "North";
    }
  }
  
  
}
//
// If health is 90 or less, find a friend
//
function buddyUp (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  if (myHero.health <= 90) {

    var friend = nearestTile(gameData, {
      type: "Hero",
      team: myHero.team
    });

    var well = nearestTile(gameData, {
      type: "HealthWell"
    });

    if (friend) {
      return friend.direction;
    } else {
      return well.direction || "North";
    }

  }
}
/*
  //
  // 5. Pick Pocket
  //Pick pocket - If nearest well and nearest enemy mine are both 1 distance away,
  //steal from enemy mine
  if (myHero.health === 100) {
    var well = findNearestHealthWellTile(gameData);
    var enemyMine = findNearestEnemyMineTile(gameData);
    
    if (well && enemyMine) {
      if (well.distance === 1 && enemyMine.distance === 1) {
        direction = enemyMine.direction;
        return finish();
      }
    }
  }

  //Sprint
  // If nearest weakest enemy is much farther away then nearest enemy,
  // attack the nearest enemy
  if (myHero.health === 100) {
    var weakEnemy = findNearestWeakerEnemyTile(gameData);
    var nearEnemy = 
    direction = helpers.findNearestWeakerEnemy(gameData);
    if (!direction) {
      direction = findNearestEnemyTile(gameData).direction || "North";
    }
    return finish();
  }
  
  */
//
// If passing by a grave and not that damaged, take the grave
//
function graveRobber (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  
  var grave = nearestTile(gameData, {
    subType: "Bones",
  });
  
  if (grave) {
    return grave.direction;
  }
}
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
//
// If health is above 80 but below 100 and we are passing by a well,
// move in the direction of that well to heal
//
function greedyHeal (gameData, helpers) {
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
//
// If hero is at full health and passing by a damaged friend,
// heal that friend
//
function highFive (gameData, helpers) {
  var myHero = gameData.activeHero;
  if (myHero.health >= 70) {
    var friend = nearestTile(gameData, {
      type: "Hero",
      team: myHero.team,
      health: {
        op: "LTE",
        val: 90
      }
    });
    if (friend) {
      if (friend.distance === 1) {
        return friend.direction;
      }
    }
  }
};

//
// If only one enemy is left, and we have more 20 more health then him, always attack
//
function killLastManStanding (gameData, helpers) {
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
//
// If we are facing a safe-miner ( enemy is adjacent to well and diamond well ),
// then attack him if a buddy is on the 4th adjacent tile
// If not, then go find a buddy
//
function onlyDoubleTeamSafeMiner (gameData, helpers) {
  var hero = gameData.activeHero;
  if (hero.health >= 40) {
  
  var enemy = nearestTile(gameData, {
    type: "Hero",
    team: {
      op: "NEQ",
      val: hero.team
    }
  });
  
  var well = nearestTile(gameData, {
    type: "HealthWell"
  });

  var mine = nearestTile(gameData, {
    type: "DiamondMine"
  });

  var buddy = nearestTile(gameData, {
    type: "Hero",
    team: {
      op: "EQ",
      val: hero.team
    }
  });
  
  if (enemy) {
    console.log(enemy, well)
    /*
    
      W E D 
      * H * 
      * * * 
    */
    
    var touching = function (t1, t2) {
      /*
      * * * 
      1 * * 
      2 * * 
      */
      var result = false;

      var t1x = t1.coords[0],
          t2x = t2.coords[0],
          t1y = t1.coords[1],
          t2y = t2.coords[1];
//          console.log(t1x, t1y, t2x, t2y);
      /*
          * * * 
          1 2 1 
          * * * 
      */
      if (t1x === t2x && (t1y === t2y - 1 || t1y === t2y + 1 )) {
        result = true;
      }

      /*
          * 1 * 
          * 2 *
          * 1 * 
      */
      if (t1y === t2y && (t1x === t2x - 1 || t1x === t2x + 1 )) {
        result = true;
      }

      
      return result;
      
    };
    
    if (enemy.distance === 1 
      && touching(enemy, well)
      && touching(enemy, mine)) {
        console.log('FOUND SAFE MINER')
      // we found a safe miner
      if (buddy) {
        console.log('where is my buddy', buddy, hero)
        if (touching(enemy, buddy)) {
            // attempt to attack ( double team ) the safe miner
            console.log("DOUBLE TEAM")
            return enemy.direction;
        } else {
           // can't kill safeminer, go find a friend instead
           return buddy.direction;
        }
      }
      
    }
  }
  }
  
};
/*

if(
  enemy.distance === 1
  && nearestWell.distance === 2
  && 
{

  // safe miner, was found
  // if a friend is next to the safe mine, attack
  
  if (buddy.distance <= 2) {
      // attempt to attack ( double team ) the safe miner
  } else {
     // can't kill safeminer, go find a friend instead
  }
  
  

}
* * W * * * 
* * E * * * 
* * H * * * 
* * * * * * 
* * * * * * 

U U W U U U 
U U E U U U 
U U H U U U 
U U U U U U 
U U U U U U

*/
//
// Attack nearest damaged enemies
// If no enemies are damaged, go start a fight
//
function pickFight (gameData, helpers) {
 var direction;
 var myHero = gameData.activeHero;

  if (myHero.health === 100) {
    var damagedEnemy = nearestTile(gameData, {
      type: "Hero",
      team: {
        op: "NEQ",
        val: myHero.team
      },
      health: {
        op: "LTE",
        val: 40
      }
    });
    if (!damagedEnemy) {
      var enemy = nearestTile(gameData, {
        type: "Hero",
        team: {
          op: "NEQ",
          val: myHero.team
        }
      })
      return enemy.direction;
    } else {
      return damagedEnemy.direction;
    }
  }
}
//
// Heal if under 60 health
//
function recover (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  if (myHero.health <= 60) {
    direction = helpers.findNearestHealthWell(gameData);
    return direction;
  }
}
// if found enemy safeminer and touching well, we are deadlocked if a 2v1 doesnt' come along
// better to just go find a damaged buddy
//
// Sometimes, make a random move ( to create entropy and potentially break from an unforseen dead-lock )
//
function sometimesRandom (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  
  var rand = Math.floor(Math.random() * 100);
  
  var directions = ["North", "South", "East", "West"];
  
  var tile = nearestTile(gameData, {
    "type": "Unoccupied"
  });

  // give a 10% chance to make a random move
  if(rand > 90) {
    var direction = Math.floor(Math.random() * 4);
    console.log("MAKING RANDOM MOVE")
    return directions[direction]
  }
  
}

//
// Chases critically injured enemies that less then 2 away
//
function stalk (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;

  var damagedEnemy = nearestTile(gameData, {
    type: "Hero",
    team: {
      op: "NEQ",
      val: myHero.team
    }
  });


  if (damagedEnemy) {
    if (myHero.health >= (damagedEnemy.health - 20)) {
      if(damagedEnemy.distance <= 2) {
        direction = damagedEnemy.direction;
        return direction;
      }
    }
  }
}

//
// If under 80 health and well is farther away then buddy, move to buddy
//
function tooFar (gameData, helpers) {
  var direction;
  var hero = gameData.activeHero;
  
  if (myHero.health < 80) {
    
    var buddy = nearestTile(gameData,{
      type: 'Hero',
      team: hero.team
    });

    var well = nearestTile(gameData,{
      type: 'HealthWell'
    });
    
    direction = helpers.findNearestHealthWell(gameData);
    return direction;
  }
}
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
            switch(op) {
              case 'NEQ':
                found = tile[p] !== val;
              break;
              case 'EQ':
                found = tile[p] === val;
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

big
 .use('Assassinate', assassinate)
 .use('Greedy Grave Robber', greedyGraveRobber)
 .use('Stalk', stalk)
 .use('Greedy Heal', greedyHeal)
 .use('Avoid Danger', avoidDanger)
 .use('Sometimes Random', sometimesRandom)
// .use('Only Double Team Safe Miner', onlyDoubleTeamSafeMiner)
 .use('Recover', recover)
 .use('High Five!', highFive)
 .use('Well Affinity', wellAffinity)
 .use('Grave Robber', pickFight)
 .use('Pick a Fight', pickFight)
 .use('Buddy Up', buddyUp);
 
var move = function (gameData, helpers) {
 return big.move(gameData, helpers);
}
module.exports = move;