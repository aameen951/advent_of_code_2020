import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day12.txt", {encoding:"utf8"}).trim();
// raw_data = `F10
// N3
// F7
// R90
// F11`;

/// PROCESSING
const instructions = raw_data.split("\n").map(x => x.match(/^(.)(\d+)$/).slice(1));

/// UTILS
/// PART ONE

{
  let dir = 'E';
  let x = 0, y = 0;
  const right = {E:'S', S:'W', W:'N', N:'E'};
  const left = {E:'N', S:'E', W:'S', N:'W'};
  for(let i=0; i<instructions.length; i++)
  {
    const inst = instructions[i];
    let c = inst[0];

    if(c == 'L')for(let j=0; j<+inst[1]; j+=90)dir = left[dir];
    else if(c == 'R')for(let j=0; j<+inst[1]; j+=90)dir = right[dir];
    else
    {
      if(c == 'F')c = dir;
          if(c == 'N')y += +inst[1];
      else if(c == 'S')y -= +inst[1];
      else if(c == 'E')x += +inst[1];
      else if(c == 'W')x -= +inst[1];
    }
  }
  part_one_solution = Math.abs(x)+Math.abs(y);
}

/// PART TWO
{
  let wx = 10, wy = 1;
  let x = 0, y = 0;
  for(let i=0; i<instructions.length; i++)
  {
    const inst = instructions[i];
    let c = inst[0];

    if(c == 'L')for(let j=0; j<+inst[1]; j+=90){ [wx, wy] = [-wy, wx]; }
    else if(c == 'R')for(let j=0; j<+inst[1]; j+=90){ [wx, wy] = [wy, -wx]; }
    else if(c == 'F'){x += wx*(+inst[1]); y += wy*(+inst[1]);}
    else if(c == 'N')wy += +inst[1];
    else if(c == 'S')wy -= +inst[1];
    else if(c == 'E')wx += +inst[1];
    else if(c == 'W')wx -= +inst[1];
  }
  part_two_solution = Math.abs(x)+Math.abs(y);
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
