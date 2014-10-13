var big = {};
big.directives = [];
big.use = function (directive, fn) {
  big.directives[directive] = fn;
  return this;
};
big.move = function (gameData, helpers){
  big.helpers = helpers;
  var direction;
  Object.keys(big.directives).forEach(function(directive){
    if (direction) {
      return direction;
    }
    direction = big.directives[directive](gameData, helpers);
  });
  if (typeof direction === "undefined") {
    // if all else fails, go north my son
    direction = "North";
  }
  return direction;
};