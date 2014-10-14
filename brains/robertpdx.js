module['exports'] = function (gameData, helpers) {

/*

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")

  The "move" function should accept two arguments that the website will be passing in:
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/#rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

function getObjByDirection(gameData, direction) {
	if(direction == 'North') {
		if(gameData.activeHero.distanceFromTop === 0) {
			return 'invalid';
		} else {
			return gameData.board.tiles[gameData.activeHero.distanceFromTop-1][gameData.activeHero.distanceFromLeft];
		}
	} else if(direction == 'South') {
		if((gameData.activeHero.distanceFromTop + 1) == gameData.board.lengthOfSide) {
			return 'invalid';
		} else {
			return gameData.board.tiles[gameData.activeHero.distanceFromTop+1][gameData.activeHero.distanceFromLeft];
		}
	} else if(direction == 'East') {
		if((gameData.activeHero.distanceFromLeft + 1) == gameData.board.lengthOfSide) {
			return 'invalid';
		} else {
			return gameData.board.tiles[gameData.activeHero.distanceFromTop][gameData.activeHero.distanceFromLeft+1];
		}
	} else if(direction == 'West') {
		if(gameData.activeHero.distanceFromLeft === 0) {
			return 'invalid';
		} else {
			return gameData.board.tiles[gameData.activeHero.distanceFromTop][gameData.activeHero.distanceFromLeft-1];
		}
	}
	return 'invalid';

}

function isEnemy(gameData, obj) {
	var myHero = gameData.activeHero;
	console.log("Checking for Enemy Hero.  obj.type is " + obj.type + ", and obj.team is " + obj.team + ", and myHero.team is " + myHero.team);
	if(obj.type === 'Hero' && obj.team != myHero.team) {
		console.log("Checked enemy: TRUE");
		return true;
	} else {
		console.log("Checked enemy: FALSE");
		return false;
	}
}
	
	
// See if our proposed direction is a safe move, meaning there are no adjacent enemies
//   This is intended to be used as "evasive action" so entrance into mines and enemies
//   should return false also. 
function safeMove(gameData, myHero, direction) {
	//var myX = myHero.distanceFromLeft;
	//var myY = myHero.distanceFromTop;
	
	
	var obj = getObjByDirection(gameData, direction);
	if(obj == 'invalid') {
		console.log("obj to the " + direction + " is " + obj);
		return false;
	} else {
		console.log("obj to the " + direction + " is " + obj.type);
	}
	
	if(obj.type == 'Unoccupied') {
		// Count the number of enemies around the unoccupied square
		var enemyCount = 0;
		if(obj.distanceFromLeft > 0) {
			// Check left
			if(isEnemy(gameData, gameData.board.tiles[obj.distanceFromTop][obj.distanceFromLeft-1])) {
				enemyCount++;
			}
		}
		if(obj.distanceFromLeft <= gameData.board.lengthOfSide) {
			// Check right
			if(isEnemy(gameData, gameData.board.tiles[obj.distanceFromTop][obj.distanceFromLeft+1])) {
				enemyCount++;
			}
		}
		if(obj.distanceFromTop > 0) {
			// Check up
			if(isEnemy(gameData, gameData.board.tiles[obj.distanceFromTop-1][obj.distanceFromLeft])) {
				enemyCount++;
			}
		}
		if(obj.distanceFromTop <= gameData.board.lengthOfSide) {
			// Check down
			if(isEnemy(gameData, gameData.board.tiles[obj.distanceFromTop+1][obj.distanceFromLeft])) {
				enemyCount++;
			}
		}
		if(enemyCount > 0) {
			return false;
		} else {
			return true;
		}
		
	}
	return false;
		

}

// The "Salem Gordita"
var move = function(gameData, helpers) {
	var myHero = gameData.activeHero;
	console.log("Hero position is X:Y -> " + myHero.distanceFromLeft + ":" + myHero.distanceFromTop);
	
	//Get stats on the nearest health well
	var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'HealthWell') {
			return true;
		}
	});
	var distanceToHealthWell = healthWellStats.distance;
	var directionToHealthWell = healthWellStats.direction;

	//Get stats on the nearest enemy
	var nearestEnemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team !== myHero.team) {
			return true;
		}
	});
	var distanceToNearestEnemy = nearestEnemyStats.distance;
	var directionToNearestEnemy = nearestEnemyStats.direction;
	var healthOfNearestEnemy = nearestEnemyStats.health;
	
	//Get stats on the nearest friendly
	var nearestFriendlyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team === myHero.team) {
			return true;
		}
	});
	var distanceToNearestFriendly = nearestFriendlyStats.distance;
	var directionToNearestFriendly = nearestFriendlyStats.direction;
	var healthOfNearestFriendly = nearestFriendlyStats.health;
	
	//Get stats of the nearest unoccupied or enemy mine
	var nearestUnoccupiedMine = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'DiamondMine') {
			if(boardTile.owner) {
				return (boardTile.owner.team !== myHero.team);
			} else {
				return true;
			}
		} else {
			return false;
		}
	});
	var distanceToUnoccupiedMine = nearestUnoccupiedMine.distance;
	var directionToUnoccupiedMine = nearestUnoccupiedMine.direction;
		
	
	//Get stats of the nearest grave
	var nearestGrave = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		return (boardTile.subType === 'Bones');
	});
	var distanceToGrave = nearestGrave.distance;
	var directionToGrave = nearestGrave.direction;
	
	// Where am I?
	var myX = myHero.distanceFromLeft;
	var myY = myHero.distanceFromTop;
	
	/* 
	=================================================================================================
	/
	/
	/  Decisions...decisions
	/
	/
	====================================================================================================
	*/
	
	
	
	// P1 If we're wounded, seek health
	if(myHero.health <= 60 || ((healthOfNearestEnemy >= myHero.health) && (distanceToNearestEnemy <= 2))) {
		console.log("P1 directionToHealthWell: " + directionToHealthWell);
		if(safeMove(gameData, myHero, directionToHealthWell) || distanceToHealthWell === 1) {
			console.log("The original direction to HealthWell is safe");
			return directionToHealthWell;
		} else {
			console.log("The original direction to HealthWell is NOT safe...calculating...");
			if(directionToHealthWell == 'North') {
				if(safeMove(gameData, myHero, 'East')) {
					return 'East';
				} else if(safeMove(gameData, myHero, 'West')) {
					return 'West';
				} else if(safeMove(gameData, myHero, 'South')) {
					return 'South';
				} else {
					return 'Stay';
				}
			} else if(directionToHealthWell == 'South') {
				if(safeMove(gameData, myHero, 'East')) {
					return 'East';
				} else if(safeMove(gameData, myHero, 'West')) {
					return 'West';
				} else if(safeMove(gameData, myHero, 'North')) {
					return 'North';
				} else {
					return 'Stay';
				}
			} else if(directionToHealthWell == 'East') {
				if(safeMove(gameData, myHero, 'North')) {
					return 'North';
				} else if(safeMove(gameData, myHero, 'South')) {
					return 'South';
				} else if(safeMove(gameData, myHero, 'West')) {
					return 'West';
				} else {
					return 'Stay';
				}
			} else if(directionToHealthWell == 'West') {
				if(safeMove(gameData, myHero, 'North')) {
					return 'North';
				} else if(safeMove(gameData, myHero, 'South')) {
					return 'South';
				} else if(safeMove(gameData, myHero, 'East')) {
					return 'East';
				} else {
					return 'Stay';
				}
			}
		}
	}
	
	// We're not wounded, at least badly
	// P5 Fill up on health if we're next to a well 
	if(myHero.health < 100 && distanceToHealthWell <=2) {
		console.log("P5 directionToHealthWell: " + directionToHealthWell);
		return directionToHealthWell;
	}
	
	// We're either not wounded badly and we're not next to a HealthWell,
	//   OR we're at 100% health
	// P2 Rob grave if in immediate vicinity
	if(distanceToGrave === 1) {
		console.log("P2 directionToGrave: " + directionToGrave);
		return directionToGrave;
	}
	
	// Health 100% or at least 60% and not next to a grave or a health well
	// P3 Heal a wounded Hero if we are next to them, but no more than 2 times (heal = +40HP)
	if(distanceToNearestFriendly === 1 && healthOfNearestFriendly < 80) {
		console.log("P3 directionOfNearestFriendly: " + directionOfNearestFriendly);
		return directionOfNearestFriendly;
	}
	
	// Health 100% or at least 60% and not next to a grave, a healthwell, or a wounded friendly
	// P4 If we're within 2 of an unoccupied or non-team mine, and health ok, grab it
	if(distanceToUnoccupiedMine <= 2) {
		console.log("P4 directionToUnoccupiedMine: " + directionToUnoccupiedMine);
		return directionToUnoccupiedMine;
	}
	
	
	// Health 100% or at least 60% and not next to a grave, a healthwell, or a wounded friendly,
	//   and we are more than 2 squares from an unoccupied mine
	// P6 If weaker than nearby enemy, get move towards the closer of either a health well or a friendly
	if(myHero.health < healthOfNearestEnemy) {
		if(distanceToNearestFriendly < distanceToHealthWell) {
			console.log("P6a directionToNearestFriendly: " + directionToNearestFriendly);
			return directionToNearestFriendly; 
		} else {
			console.log("P6b directionToHealthWell: " + directionToHealthWell);
			return directionToHealthWell;
		}
	}
	
	// All the stats of P6, but we are stronger than our nearest enemy
	// P7 Go after an enemy if they are closer to a friendly at this point
	if(distanceToNearestEnemy <= distanceToNearestFriendly) {
		console.log("P7 directionToNearestEnemy: " + directionToNearestEnemy);
		return directionToNearestEnemy;
	}
	
	// Health 100% or at least 60% and not next to a grave, a healthwell, or a wounded friendly,
	//    and we are more than 2 squares from an unoccupied mine. We are closer to a friendly than
	//    an enemy and we are stronger than the nearest enemy. Any friendlies we are next to
	//    are healed to at least 80% - top up on health if need it and health well is closer than friendly
	// P8 if HP <= 80 and nearest health well is closer than nearest friendly, move to health well
	if(myHero.health <= 80 && distanceToHealthWell < distanceToNearestFriendly) {
		console.log("P8 directionToHealthWell: " + directionToHealthWell);
		return directionToHealthWell;
	}
	
	// We are either weakened with a friendly nearer than a health well
	//   OR we're 100% and a health well is closer
	// P9 If the nearest friendly health < 50, move to friendly
	if(healthOfNearestFriendly < 50) {
		console.log("P9 directionToNearestFriendly:" + directionToNearestFriendly);
		return directionToNearestFriendly;
	}
	
	// Either weakened with a friendly nearer than a health well, OR we're 100%
	//   and a health well is closer.  Nearest friendly is not near death.
	// P10 if HP >= 40 and nearest unoccupied mine is closer than nearest enemy, move to mine
	if(directionToUnoccupiedMine) {
		if(myHero.health >= 40 && (distanceToUnoccupiedMine < distanceToNearestEnemy)) {
			console.log("P10 directionToUnoccupiedMine: " + directionToUnoccupiedMine);
			return directionToUnoccupiedMine;
		}
	}
		
	// There are no unoccupied mines left
	// P11 What's left?  If we're healthy, go enemy whomping
	if(myHero.health >= 80) {
		var dirWeaker = helpers.findNearestWeakerEnemy(gameData);
		console.log("P11 dirWeaker: " + dirWeaker);
		if(dirWeaker) {
			return dirWeaker;
		} else {
			return directionToNearestFriendly;
		}
	}
	
	// P12 If we fall through to this point, we're weak so seek the nearest comrade
	console.log("P12 directionToNearestFriendly: " + directionToNearestFriendly);
	return directionToNearestFriendly;
	
}


};