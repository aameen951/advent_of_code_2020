import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day11.txt", {encoding:"utf8"}).trim();

/// PROCESSING
const layout = raw_data.split("\n").map(l => l.split(""));

const h = layout.length;
const w = layout[0].length;

/// UTILS

// check if two layout are the same.
function equal(a, b)
{
  for(let i=0; i<h; i++)
    for(let j=0; j<w; j++)
      if(a[i][j] !== b[i][j])return false;
  return true;
}
// count the number of occupied seats in the layout.
function count_occupied(l)
{
  return l.reduce((p, i) => p + i.filter(c => c == '#').length, 0);
}
// apply a round on the layout
function round(l, max_to_empty, chk)
{
  let output = [];
  for(let i=0; i<h; i++){
    output.push([]);
    for(let j=0; j<w; j++)
    {
      // use the chk function on each direction to count the number of occupied seats in that direction.
      const adj = (
        chk(l,i,j, +1, +1) + chk(l,i,j, -1, -1) + chk(l,i,j, +1, -1) + chk(l,i,j, -1, +1) +
        chk(l,i,j, +1, +0) + chk(l,i,j, -1, +0) + chk(l,i,j, +0, +1) + chk(l,i,j, +0, -1)
      );
      let s = l[i][j];
      // if it is empty and no adjacent occupied seats, then occupy it
      // else if it is occupied and adjacent occupied seats >= max, then empty it.
      // else stays the same.
      output[i].push(s == 'L' && adj == 0 ? '#' : (s == '#' && adj >= max_to_empty) ? 'L' : s);
    }
  }
  return output;
}


/// PART ONE
{
  function chk(l, i, j, di, dj)
  {
    // check one adjacent seat in the specified direction.
    i += di; j += dj;
    // if the seats exists and equals to #, then it is occupied otherwise it is not.
    return i >= 0 && j >= 0 && i<h && j<w && l[i][j] === '#' ? 1 : 0; 
  }
  let r = layout, prev_r = null;
  do
  {
    prev_r = r;
    // apply a round on the layout.
    r = round(r, 4, chk);
  }
  // if the layout is stable (it is equal to the previous) then we're done.
  while(!equal(r, prev_r));
  // the number of occupied seats is the answer.
  part_one_solution = count_occupied(r);
}

/// PART TWO
{
  function chk(l, i, j, di, dj)
  {
    // check all cells along the direction.
    while(true)
    {
      i += di; j += dj;
      // if the seat is outside the layout, then it is empty
      if(i<0 || j<0 || i>=h || j>=w)return 0;
      // if the seat is L, then it is empty
      if(l[i][j] == 'L')return 0;
      // if the seat is #, then it occupied
      if(l[i][j] == '#')return 1;
      // otherwise, continue to the next seat along the direction.
    }
  }
  let r = layout, prev_r = null;
  do
  {
    prev_r = r;
    // apply a round on the layout.
    r = round(r, 5, chk);
  }
  // if the layout is stable (it is equal to the previous) then we're done.
  while(!equal(r, prev_r));
  // the number of occupied seats is the answer.
  part_two_solution = count_occupied(r);
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
