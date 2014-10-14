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