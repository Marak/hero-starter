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