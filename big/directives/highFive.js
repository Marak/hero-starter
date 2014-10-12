//
// If hero is at full health and passing by a damaged friend,
// heal that friend
//
function highFive (gameData, helpers) {
  var direction;
  var myHero = gameData.activeHero;
  if(myHero.health === 100) {
    var friend = findNearestTeamMemberDamagedTile(gameData);
    if (friend) {
      if (friend.distance === 1) {
        direction = friend.direction;
        return direction;
      }
    }
  }
};
