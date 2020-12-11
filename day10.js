import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day10.txt", {encoding:"utf8"}).trim();

// One number on each line
let numbers = raw_data.split("\n").map(n => parseInt(n));

// 0 is implicit according to the question.
numbers.push(0)
// sort the number to optimize/simplify processing.
numbers.sort((a, b) => a - b);
// max+3 is implicit according to the question.
numbers.push(numbers[numbers.length-1]+3);

/// PART ONE

// array to store all the differences [0,1,2,3].
let diff = [0,0,0,0];
for(let i=0; i<numbers.length-1; i++)
{
  let n = numbers[i];
  // compute the difference.
  const d = numbers[i+1] - n;
  // increment the number of the difference `d` occurrences.
  diff[d]++;
}
// the solution is the number of 1 differences multiplied by the number of 3 differences.
part_one_solution = diff[1] * diff[3];

/// PART TWO

// cache the results to prevent a processing explosion O(3^n).
const cache = {};
function visit(i)
{
  // if the value is cached return it immediately.
  if(cache[i])return cache[i];

  let total = 0;
  // loop over the following numbers whose difference to current number is <= 3.
  for(let j=i+1; j < numbers.length && numbers[j]-numbers[i] <= 3; j++)
  {
    total += visit(j);
  }
  // if total is zero, then this is a one complete arrangement.
  if(!total)total++;
  // cache the value.
  cache[i] = total;
  return total;
}
part_two_solution = visit(0);

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
