import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day9.txt", {encoding:"utf8"}).trim();

// One number on each line
let numbers = raw_data.split("\n").map(n => parseInt(n));

/// PART ONE

// number of preamble numbers.
let preamble = 25;
// start the loop after the preamble.
for(let i=preamble; i<numbers.length; i++)
{
  let valid = false;

  // loop over the preamble
  loop: for(let j=i-preamble; j<i; j++)
  {
    // loop over the preamble again.
    for(let k=i-preamble; k<i; k++)
    {
      // The number is valid: if the sum of any two numbers in the preamble (but not the same number) 
      // is equal to it.
      if(j!=k && numbers[j] + numbers[k] == numbers[i])
      {
        valid = true;
        // no need to continue the loop.
        break loop;
      }
    }
  }
  // the first invalid number is the solution.
  if(!valid)
  {
    part_one_solution = numbers[i];
    break;
  }
}

/// PART TWO

// loop through all the numbers.
loop: for(let i=0; i<numbers.length; i++)
{
  // keep track of the min,max,sum
  let min = numbers[i];
  let max = numbers[i];
  let sum = numbers[i];
  // loop over the following numbers.
  for(let j=i+1; j<numbers.length; j++)
  {
    // update min,max,sum
    if(numbers[j] > max)max = numbers[j];
    if(numbers[j] < min)min = numbers[j];
    sum += numbers[j];
    // if the sum is equal to the invalid number, ...
    if(sum == part_one_solution)
    {
      // ... then the solution is (min+max)
      part_two_solution = min + max;
      break loop;
    }
    // if the sum is larger, no need to continue the loop.
    else if(sum > part_one_solution)break;
  }
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
