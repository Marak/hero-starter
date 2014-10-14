big
 .use('Assassinate', assassinate)
 .use('Greedy Grave Robber', greedyGraveRobber)
 .use('Stalk', stalk)
 .use('Greedy Heal', greedyHeal)
 .use('Avoid Danger', avoidDanger)
 .use('Sometimes Random', sometimesRandom)
// .use('Only Double Team Safe Miner', onlyDoubleTeamSafeMiner)
 .use('Recover', recover)
 .use('High Five!', highFive)
 .use('Well Affinity', wellAffinity)
 .use('Grave Robber', pickFight)
 .use('Pick a Fight', pickFight)
 .use('Buddy Up', buddyUp);
 
var move = function (gameData, helpers) {
 return big.move(gameData, helpers);
}
module.exports = move;