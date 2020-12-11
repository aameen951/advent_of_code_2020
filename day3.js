import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day3.txt", {encoding:"utf8"}).trim();

// Split the file into lines.
const lines = raw_data.split("\n");

const line_width = lines[0].length;

/// PART ONE

function count_trees(y_step, x_step)
{
  let x = 0;
  let tree_count = 0;
  for(let y=0; y<lines.length; y += y_step)
  {
    // read the value at [y][x], the pattern is repeated horizontally so we mod it by `line_width`.
    const v = lines[y][x%line_width];
    // move to the right according to the specified step.
    x += x_step;

    // count the trees (represented by '#').
    if(v == '#')tree_count++;
  }
  return tree_count;
}
const y_step = 1;
const x_step = 3;
part_one_solution = count_trees(y_step, x_step);


/// PART TWO

// Slopes for traversals.
const slopes = [
  {x_step:1, y_step: 1},
  {x_step:3, y_step: 1},
  {x_step:5, y_step: 1},
  {x_step:7, y_step: 1},
  {x_step:1, y_step: 2},
];

// Multiply tree count for all traversals.
part_two_solution = 1;

// Loop through all the slopes.
slopes.forEach(({x_step, y_step}) => {
  const tree_count = count_trees(y_step, x_step);
  part_two_solution *= tree_count;
});

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
