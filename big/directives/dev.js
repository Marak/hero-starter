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