import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day5.txt", {encoding:"utf8"}).trim();

// Each passport is separated by two newlines.

const IDs = raw_data.split("\n")
  // This is just binary numbers Front,Left = 0  Back,Right = 1
  .map(id => parseInt(id.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2));

/// PART ONE

part_one_solution = IDs.reduce((p, i) => Math.max(p, i), 0);

/// PART TWO

IDs.sort((a, b) => a - b);
for(let i=0; i<IDs.length-1; i++)
{
  const next = IDs[i]+1;
  if(next != IDs[i+1])
  {
    part_two_solution = next;
    break;
  }
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
