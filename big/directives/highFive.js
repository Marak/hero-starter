//
// If hero is at full health and passing by a damaged friend,
// heal that friend
//
function highFive (gameData, helpers) {
  var myHero = gameData.activeHero;
  if(myHero.health === 100) {
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
