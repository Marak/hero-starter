/*

If you'd like to test your hero code locally,
run this code using node (must have node installed).

Please note that you DO NOT need to do this to enter javascript
battle, it is simply an easy way to test whether your new hero 
code will work in the javascript battle.

To run:

  -Install node
  -Run the following in your terminal:

    node test_your_hero_code.js

  -If you don't see any errors in your terminal, the code works!

*/

var colors = require('colors')

//Get the helper file and the Game logic
var helpers = require('./helpers.js');
var Game = require('./game_logic/Game.js');

//Get my hero's move function ("brain")
var heroMoveFunction = require('./hero.js');

//The move function ("brain") the practice enemy will use
/*
var enemyMoveFunction = function(gameData, helpers) {
  //Move in a random direction
  var choices = ['North', 'South', 'East', 'West'];
  return choices[Math.floor(Math.random()*4)];
}
*/

/*
*/

var brains = {};

var fs = require('fs');

var files = fs.readdirSync(__dirname + '/brains');

files.forEach(function(file){
  brains[file.replace('.js', '')] = require('./brains/' + file)
});
//console.log(brains)

//var enemyMoveFunction = require('./safeMiner');

//brains["Big"] = heroMoveFunction;



var rows = [
             ['☺','U','W','U','B','U','U','U'],
             ['U','U','U','U','U','E','U','U'],
             ['U','D','E','U','U','D','U','U'],
             ['E','U','U','D','W','U','U','B'],
             ['U','U','B','U','U','U','E','E'],
             ['W','U','E','B','U','U','E','U'],
             ['U','B','E','U','W','D','U','U'],
             ['U','U','D','B','U','U','B','U']
           ];

var enemyMoveFunction = brains[Object.keys(brains)[0]];




//console.log('About to start the game!  Here is what the board looks like:');

//You can run game.board.inspect() in this test code at any time
//to log out the current state of the board (keep in mind that in the actual
//game, the game object will not have any functions on it)

var teams;

function tick () {
  
  var alive = [0, 0];
  teams = [[],[]];
  game.heroes.forEach(function(_hero){
    teams[_hero.team].push({ team: _hero.team, name: _hero.name });
    if(_hero.dead === false) {
      alive[_hero.team]++;
    }
  });
  
  if(turnsToPlay <= 0) {
    return end();
  }
  turnsToPlay = turnsToPlay - 1;
  i++
  var hero = game.activeHero;
  var direction;
  if (hero.name === 'MyHero') {
    //console.log(hero)
    
    if(hero.dead) {
      //console.log("DEAD")
      //process.exit();
    }
    //Ask your hero brain which way it wants to move
    direction = heroMoveFunction(game, helpers);
  } else {
    direction = brains[hero.name](game, helpers);
  }
  

  game.handleHeroTurn(direction);
  
  var enemy = false, heros = false;
  game.heroes.forEach(function(hero){
    if(hero.team === 1 && hero.dead === false) {
      enemy = true;
    }
    
    if(hero.team === 0 && hero.dead === false) {
      heros = true;
    }
    
  });
  
  if (enemy === false) {
    end();
  }
  if (heros === false) {
    end();
  }
  
//  if (hero.name === "MyHero") {
      //console.log('-----');
      //console.log('Turn ' + i + ':');
      //console.log('Players ' + alive[0] + ' - ' + alive[1]);
      if (i === 1) {
        //console.log(teams)
      }
      //console.log('-----');
      //game.board.inspect();
      
    //  console.log(hero.name + ' tried to move ' + direction);
    //  console.log(hero.name + ' owns ' + hero.mineCount + ' diamond mines')
    //  console.log(hero.name + ' has ' + hero.health + ' health')
  tick();
  
}

function end(){
  //console.log(teams)
  //console.log('Kills:' + game.activeHero.heroesKilled.length);
  //console.log('Graves:' + game.activeHero.gravesRobbed);
  if(game.winningTeam === 0) {
    results.wins++;
    //console.log("WON!!".green)
  } else {
    results.losses++;
    //console.log("Lost...".red);
  }
//  console.log(game.winningTeam)
  //console.log("Turns: " + i)
  if (!game.heroes[0].dead) {
    results.survived++;
  }
  results.kills += game.heroes[0].heroesKilled.length;
  //console.log(game.heroes[0].heroesKilled.length)
  //console.log("Survived:", !game.heroes[0].dead)

  runGame();
  
  // process.exit();
  
};

var results = {
  wins: 0,
  losses: 0,
  survived: 0,
  kills: 0
};


var times = 10;
var _times = 10;
var turnsToPlay = 0, i =0;
var runGame = function () {
  turnsToPlay = 1200, i = 0;

  game = new Game(8);

  rows.forEach(function(row, _x){
    row.forEach(function(cell, _y){
  //    console.log(x,y)

      //console.log(rows[x][0])
  //    console.log(x, y, rows[x][y]);

      var cell = rows[_x][_y];
      var rand = Math.floor(Math.random() * Object.keys(brains).length);
      var ai = Object.keys(brains)[rand];
      switch(cell) {
        case '☺':
          game.addHero(_x, _y, 'MyHero', 0);
        break;
        case 'W':
          game.addHealthWell(_x, _y);
        break;
        case 'D':
          game.addDiamondMine(_x, _y);
        break;
        case 'E':
          game.addHero(_x, _y, ai, 1);
        break;
        case 'B':
          game.addHero(_x, _y, ai, 0);
        break;
        default:
          // do nothing
        break;
      }

    });
  });
  //game.board.inspect();
  
  if(times > 0) {
    times--;
  }
  else {
    
    // crunch results
    
    var winLoss = (results.wins / _times) * 100;
    var surviveRate = (results.survived / _times) * 100;
    
    console.log("Win", winLoss + "%", "Survived", surviveRate + "%", "Kills", results.kills)
    
    //console.log(results);
    process.exit();
  }
  //Play a very short practice game
  tick();  
}

//Makes a new game with a 8x8 board
var game;




runGame();