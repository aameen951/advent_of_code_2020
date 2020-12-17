import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day15.txt", {encoding:"utf8"}).trim();
// raw_data = `0,3,6`;

/// PROCESSING

const starting_numbers = raw_data.split(",").map(n => parseInt(n));

/// PART ONE

const numbers = starting_numbers.slice(0);
const map = new Map();
for(let i=0; i < numbers.length-1; i++)map.set(numbers[i], i);
for(let i=numbers.length-1; i < 2020-1; i++)
{
  let last_idx = map.get(numbers[i]);
  numbers.push(last_idx === undefined ? 0 : i - last_idx);
  map.set(numbers[i], i);
}
part_one_solution = numbers[numbers.length-1];

/// PART TWO

for(let i=numbers.length-1; i < 30000000-1; i++)
{
  let last_idx = map.get(numbers[i]);
  numbers.push(last_idx === undefined ? 0 : i - last_idx);
  map.set(numbers[i], i);
}
part_two_solution = numbers[numbers.length-1];

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
