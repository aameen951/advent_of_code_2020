import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day23.txt", {encoding:"utf8"}).trim();
// raw_data = `389125467`;

/// PROCESSING
const org_cups = raw_data.split("").map(i => +i);

/// UTILS

function process (MAX, times)
{
  const next_map = [];

  const cups = org_cups.slice(0);
  for(let i=cups.length; i<MAX; i++)cups.push(i+1);

  for(let i=0; i<cups.length; i++)
  {
    next_map[cups[i]] = cups[(i+1)%cups.length];
  }

  // start with the first cup.
  let c0 = cups[0];
  for(let i=0; i<times; i++)
  {
    // pickup the next three cups.
    const c1 = next_map[c0];
    const c2 = next_map[c1];
    const c3 = next_map[c2];

    // remove c1, c2, c3 from the list.
    next_map[c0] = next_map[c3];

    // find destination
    let d = c0 == 1 ? MAX : c0 - 1;
    while(d == c1 || d == c2 || d == c3)
    {
      d = d == 1 ? MAX : d - 1;
    }

    // insert c1, c2, c3 after destination
    next_map[c3] = next_map[d];
    next_map[d] = c1;

    // move to the next cup
    c0 = next_map[c0];
  }
  return next_map;
}

/// PART ONE
{
  const next_map = process(9, 100);
  let current = 1;
  part_one_solution = 0;
  while(next_map[current] != 1)
  {
    part_one_solution = 10*part_one_solution + (current = next_map[current]);
  }
}

/// PART TWO
{
  const next_map = process(1000000, 10000000);
  part_two_solution = next_map[1] * next_map[next_map[1]];
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
