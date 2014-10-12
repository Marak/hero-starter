//
// If health is 80 or 80, find a friend
// If no friends are left, go to the closest well
//
function buddyUp (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  //
  if (myHero.health <= 90) {
    //console.log('FINDING FRIEND');
    direction = helpers.findNearestTeamMember(gameData) || findNearestHealthWellTile(gameData).direction;
    return direction;
  }
}