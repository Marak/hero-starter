var big = {};
big.directives = [];
big.use = function (directive, fn) {
  big.directives[directive] = fn;
  return this;
};
big.move = function (gameData, helpers){
  big.helpers = helpers;
  // blow up the helpers variable into global scope, because we have no real module system for bots...lol
  var direction;
  Object.keys(big.directives).forEach(function(directive){
    if (direction) {
      return direction;
    }
    direction = big.directives[directive](gameData, helpers);
  });
  if(typeof direction === "undefined") {
    direction = "North";
  }
  return direction;
};