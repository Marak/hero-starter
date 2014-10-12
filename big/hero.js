big
 .use('Recover', recover)
 .use('Greedy Heal', greedHeal)
 .use('High Five!', highFive)
 .use('Assassinate', assassinate)
 .use('Pick a Fight', pickFight)
 .use('Buddy Up', buddyUp);
 
var move = function (gameData, helpers) {
 return big.move(gameData, helpers);
}
module.exports = move;