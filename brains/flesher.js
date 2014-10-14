module['exports'] = function (gameData, helpers) {

//- My Helpers

// Copy to outer scope each turn
var game, helpers;

var DIRS = ['North', 'South', 'East', 'West'];

function getDirections(from, to) {
  var dirs = [];
  if (to.distanceFromTop > from.distanceFromTop) dirs.push('South');
  if (to.distanceFromTop < from.distanceFromTop) dirs.push('North');
  if (to.distanceFromLeft > from.distanceFromLeft) dirs.push('East');
  if (to.distanceFromLeft < from.distanceFromLeft) dirs.push('West');
  return dirs;
}

function closest(filter) {
  if (typeof filter === 'object') {
    var obj = filter;
    filter = function(tile) { return tile === obj; };
  }
  return helpers.findNearestObjectDirectionAndDistance(game.board, game.activeHero, filter);
}

function distanceTo(to) {
  var tile = closest(to);
  return tile ? tile.distance : 99;
}

function directionTo(to) {
  var tile = closest(to);
  return tile ? tile.direction : null;
}

function diamondsAdvantage() {
  var diamonds = game.totalTeamDiamonds;
  var we = game.activeHero.team;
  return diamonds[we] - diamonds[1-we];
}

function getEnemies() {
  var heroTeam = game.activeHero.team;
  return game.teams[1-heroTeam].filter(function(enemy) {
    return !enemy.dead;
  });
}

function turnsToDie(hero) {
  var health = typeof hero === 'number' ? hero : hero.health;
  return Math.ceil(Math.max(0, health) / 30);
}

function reactToEnemy(enemy) {
  var hero = game.activeHero;
  var te = turnsToDie(enemy), th = turnsToDie(hero);
  switch (distanceTo(enemy)) {
    case 1:
      // Sure kill
      return te === 1 ? 'attack' :
        // There's no escape and we can win
        !nextToWell(enemy) && te <= th ? 'attack' : 'run';

    case 2:
      // Sure kill
      te = turnsToDie(enemy.health - 20);
      return te === 0 ? 'attack' :
        // Can win even if hitting only 20 this turn
        !nextToWell(enemy) && te < th ? 'attack' : 'run';

    case 3:
      th = turnsToDie(hero.health - 20);
      // Can win even if he hits first
      return te <= th ? 'attack' :
        // TODO: Avoid locks due to static enemy
        hero.health === 100 ? 'stay' :
        isAThreat(enemy) ? 'run' : null;
  }
  return null;
}

function getTile(x, y) {
  var board = game.board;
  return board.tiles[y] && board.tiles[y][x];
}

function getTileOnDirection(dir) {
  var hero = game.activeHero;
  return helpers.getTileNearby(game.board, hero.distanceFromTop, hero.distanceFromLeft, dir);
}

function tilesAround(tile) {
  var x = tile.distanceFromLeft;
  var y = tile.distanceFromTop;
  return [
    getTile(x-1, y),
    getTile(x, y-1),
    getTile(x+1, y),
    getTile(x, y+1)
  ].filter(function(tile) {
    return !!tile;
  });
}

function nextToWell(hero) {
  return tilesAround(hero).filter(function(tile) {
    return tile.type === 'HealthWell'
  }).length > 0;
}

function threatsCloseBy() {
  return getEnemies().filter(function(enemy) {
    // In order to make this number 3 instead of 2 and be
    // extra careful about assassins, I need some speculation
    // about the risks, else my guy will always run
    return isAThreat(enemy) && distanceTo(enemy) <= 3;
  });
}

function tileId(tile) {
  return tile.distanceFromLeft+'|'+tile.distanceFromTop;
}

function directionIsBlocked(dir) {
  var tile = getTileOnDirection(dir);
  return !tile || tile.type !== 'Unoccupied';
}

function inferHeroType(hero) {
  // Assume most people either go for kills or mines
  var miner = hero.minesCaptured > 0;
  var killer = hero.heroesKilled.length > 0;
  if (miner === killer) return 'unknown';
  return miner ? 'miner' : 'killer';
}

function isAThreat(enemy) {
  return inferHeroType(enemy) !== 'miner';
}

//- Moncho the "try-hard" -//
var move = function(/*game, helpers*/) {
  // Save to outer scope
  game = arguments[0];
  helpers = arguments[1];

  var hero = game.activeHero;
  var enemies = {run:[], attack:[], stay:[]};
  getEnemies().forEach(function(enemy) {
    var reaction = reactToEnemy(enemy);
    if (reaction) enemies[reaction].push(enemy);
  });

  var surrounding = threatsCloseBy();
  if (surrounding.length > 1) {
    // Run from all enemies if surrounded
    enemies.run = surrounding;
  }
  // Escape
  if (enemies.run.length) {
    // Don't bother running
    if (nextToWell(hero)) return helpers.findNearestHealthWell(game);

    var danger = {};
    // Get all the dangerous directions
    enemies.run.forEach(function(enemy) {
      getDirections(hero, enemy).forEach(function(dir) {
        danger[dir] = true;
      });
    });
    // Add blocked directions as well
    DIRS.forEach(function(dir) {
      if (directionIsBlocked(dir)) {
        danger[dir] = true;
      }
    });
    // There's somewhere to run
    if (Object.keys(danger).length < 4) {
      // Run to the closest well, as long as it isn't through enemies
      var visited = {};
      do {
        var tile = closest(function(well) {
          if (well.type !== 'HealthWell') return false;
          var id = tileId(well);
          if (visited[id]) return false;
          visited[id] = true;
          return true;
        });
        if (tile && !danger[tile.direction]) {
          return tile.direction;
        }
      } while (tile);
      // If all wells blocked, just try to stay away
      return DIRS.filter(function(dir) {
        return !danger[dir];
      })[0];
    }
  }

  if (enemies.attack.length) {
    // Attack closest. TODO: look for best (distance * 100 + health)
    return directionTo(function(enemy) {
      return enemies.attack.indexOf(enemy) !== -1;
    });
  }

  if (enemies.stay.length) return 'Stay';

  // Unhealthy, go heal
  if (turnsToDie(hero) === 1) return helpers.findNearestHealthWell(game); 

  // TODO: Prioritize within those at the same distance, specially attack/heal/run

  // Look for closest tile of interest
  var direction = directionTo(function(tile) {
    var dist = distanceTo(tile);
    var closeBy = dist < 6;
    // Find the closest valuable tile
    switch (tile.type) {
      case 'Hero':
        // Ally
        if (tile.team === hero.team) {
          // Be a good samaritan, heal the poor dude
          if (tile.health <= 60 && dist === 1) return true;
          break;
        }

        // Go after wounded enemies
        if (closeBy && turnsToDie(tile) < turnsToDie(hero)) {
          return true;
        }

        break;
      case 'HealthWell':
        // Close-by well, heal fully
        return hero.health < 100;
      case 'DiamondMine':
        // Disregard mines now, let's try a full murderer
        break;
        // If the difference is too big for either team, don't waste time
        var adv = Math.abs(diamondsAdvantage());
        if (adv > 100 && dist > 1) break;

        // The greedy version is cool but can get into deadlocks with other greedy allies
        return closeBy && (!tile.owner || tile.owner.team !== hero.team);
        // Capture the nearby mine
        //return (!tile.owner || tile.owner.id !== hero.id);
      case 'Unoccupied':
        // Snatch those bones
        return tile.subType === 'Bones' && closeBy;
    }
    
    return false;
  });

  // If healthy, winning on diamonds and no graves or hurt enemies, go for a fair fight
  return direction || helpers.findNearestEnemy(game);
};

};