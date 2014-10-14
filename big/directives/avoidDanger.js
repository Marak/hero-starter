//
// If hero is potentially entering a 2:1 combat situation,
// try to move to a position that ensures next move is 1:1 and not 2:1
//
function avoidDanger (gameData, helpers) {
  var direction;
  //console.log(gameData.board)
  var myHero = gameData.activeHero;

  var zone = myZone(gameData);
  
  console.log("----- MYZONE -----")
  console.log(zone[0], '|', zone[1], '|', zone[2]);
  console.log(zone[3], '|', zone[4], '|', zone[5]);
  console.log(zone[6], '|', zone[7], '|', zone[8]);
  
  var NW = zone[0], 
      N = zone[1],
      NE = zone[2],
      W = zone[3],
      E = zone[5],
      SW = zone[6],
      S = zone[7],
      SE = zone[8];
  
  /*
  
    2:1 attack south / north-east

     U | U | E
     U | ☺ | U
     D | E | U

  */

  // 2:1 from south / north-east
  if (S === "E" && NE === "E") {
    if (W === "U") {
      return "West";
    }
    if (N === "U") {
      return "North";
    }
  }

  /*
    2:1 attack south / north-west

     E | U | U
     U | ☺ | U
     D | E | U
  */
  if (S === "E" && NW === "E") {
    if (E === "U") {
      return "East";
    }
    if (N === "U") {
      return "North";
    }
  }

  /*
    2:1 attack west / south-east

     U | U | U
     E | ☺ | U
     D | U | E
  */
  if (W === "E" && SE === "E") {
    if (N === "U") {
      return "North";
    }
    if (E === "U") {
      return "East";
    }
  }

  /*
    2:1 attack east / north-west

     E | U | U
     U | ☺ | E
     D | U | U
  */
  if (E === "E" && NW === "E") {
    if (S === "U") {
      return "South";
    }
    if (W === "U") {
      return "West";
    }
  }

  /*
    2:1 attack north / south

     U | E | U
     U | ☺ | U
     D | E | U
  */
  if (N === "E" && S === "E") {
    if (W === "U") {
      return "West";
    }
    if (E === "U") {
      return "East";
    }
  }

  /*
    2:1 attack east / west

     U | U | U
     E | ☺ | E
     D | U | U
  */
  if (E === "E" && W === "E") {
    if (N === "U") {
      return "North";
    }
    if (S === "U") {
      return "South";
    }
  }

   // from the north-west
  if (N === "E" && W === "E") {
    if (E === "U") {
      return "East";
    }
    if (S === "U") {
      return "South";
    }
  }

  // from the north-east
  if (N === "E" && E === "E" ) {
    if (W === "U") {
      return "West";
    }
    if (S === "U") {
      return "South";
    }
  }

  // south-west
  if (S === "E" && W === "E") {
    if (E === "U") {
      return "East";
    }
    if (N === "U") {
      return "Noth";
    }
  }

  // south-east
  if (S === "E" && E === "E") {
    if (W === "U") {
      return "West";
    }
    if (N === "U") {
      return "North";
    }
  }
  
  
}