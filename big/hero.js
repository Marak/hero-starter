big
 .use('Assassinate', assassinate)
 .use('Stalk', stalk)
 .use('Greedy Heal', greedyHeal)
 .use('Greedy Grave Robber', greedyGraveRobber)
 .use('Avoid Danger', avoidDanger)
 .use('Sometimes Random', sometimesRandom)
 .use('Recover', recover)
 .use('High Five!', highFive)
// .use('Safe Mine Grab', safeMineGrab)
 .use('Well Affinity', wellAffinity)
 .use('Grave Robber', pickFight)
 .use('Pick a Fight', pickFight)
 .use('Buddy Up', buddyUp);

var move = function (gameData, helpers) {
 return big.move(gameData, helpers);
}
module.exports = move;