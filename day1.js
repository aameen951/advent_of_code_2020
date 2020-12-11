import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day1.txt", {encoding:"utf8"}).trim();

// Split the file into lines and for each line convert it from string to number
const numbers = raw_data.split("\n").map(n => parseInt(n));

/// PART ONE

// Loop through all the numbers
out: for(let i=0; i<numbers.length; i++)
{
  let m = numbers[i];
  // We already tested numbers in the range [0..i] so start from i+1 to the end
  for(let j=i+1; j<numbers.length; j++)
  {
    let n = numbers[j];
    // If `m` and `n` add up to 2020, then they are the solution.
    if(m + n === 2020)
    {
      // The solution is `m * n`
      part_one_solution = m * n;
      // Exit from both loops.
      break out;
    }
  }
}

/// PART TWO

out: for(let i=0; i<numbers.length; i++)
{
  let m = numbers[i];
  // We already tested numbers in the range [0..i] so start from i+1 to the end
  for(let j=i+1; j<numbers.length; j++)
  {
    let n = numbers[j];
    // We already tested numbers in the range [0..j] so start from j+1 to the end
    for(let k=j+1; k<numbers.length; k++)
    {
      let o = numbers[k];
      // If `m`, `n` and `o` add up to 2020, then they are the solution.
      if(m + n + o === 2020)
      {
        // The solution is `m * n * o`
        part_two_solution = m * n * o;
        // Exit from both loops.
        break out;
      }
    }
  }
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
