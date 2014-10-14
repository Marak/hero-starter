var colors = require('colors');

var Unoccupied = function(distanceFromTop, distanceFromLeft) {
  this.type = "Unoccupied";
  this.subType = "Unoccupied";
  this.distanceFromTop = distanceFromTop;
  this.distanceFromLeft = distanceFromLeft;
};

Unoccupied.prototype.getCode = function() {
  
  if(this.subType === "Bones") {
    return 'BBB'.grey;
  } else {
    return '   ';
  }
  
};

module.exports = Unoccupied;