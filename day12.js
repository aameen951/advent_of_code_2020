import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day12.txt", {encoding:"utf8"}).trim();

/// PROCESSING

// represent directions as numbers to allow using add/sub to turn right/left.
const N=0, E=1, S=2, W=3;
// parse_map converts characters to symbols.
const parse_map = {N:N, E:E, S:S, W:W, L:'L', R:'R', F:'F'};

// each line has one instruction.
const instructions = raw_data.split("\n").map(x => {
  // syntax: <char> <number>
  const m = x.match(/^(.)(\d+)$/);
  return {i:parse_map[m[1]], v: +m[2]};
});

/// PART ONE

{
  // current direction of the ship.
  let dir = E;
  // current coordinates of the ship (positive is N or E, negative is S or W).
  let x = 0, y = 0;
  
  for(let idx=0; idx<instructions.length; idx++)
  {
    let {i, v} = instructions[idx];

    // if Forward, then use the current direction.
    if(i == 'F')i = dir;

    switch(i)
    {
      // update current coordinate according to the direction using specified value.
      case N: y += v; break;
      case S: y -= v; break;
      case E: x += v; break;
      case W: x -= v; break;

      // add/sub to current direction the number of quarters to turn.
      // add for right, sub for left.
      // we use mod to wrap W+1 to N and N-1 to W.
      case 'L': dir = (dir - v/90 + 4) % 4; break;
      case 'R': dir = (dir + v/90    ) % 4; break;
    }
  }
  // The Manhattan distance is the solution.
  part_one_solution = Math.abs(x)+Math.abs(y);
}

/// PART TWO
{
  // x,y are the coordinates of the ship. 
  // wx,wy are the coordinates of the waypoint.
  let x = 0, y = 0, wx = 10, wy = 1;

  for(let idx=0; idx<instructions.length; idx++)
  {
    let {i, v} = instructions[idx];
    switch(i)
    {
      // update the waypoint coordinate according to the direction using value.
      case N: wy += v; break;
      case S: wy -= v; break;
      case E: wx += v; break;
      case W: wx -= v; break;

      // move the ship to the waypoint `v` times.
      case 'F': x += wx*v; y += wy*v; break;
      
      // for each turning quarter, rotate the waypoint coordinates.
      case 'L': for(let j=0; j<v; j+=90) [wx, wy] = [-wy,  wx]; break;
      case 'R': for(let j=0; j<v; j+=90) [wx, wy] = [ wy, -wx]; break;
    }
  }
  // The Manhattan distance is the solution.
  part_two_solution = Math.abs(x)+Math.abs(y);
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
