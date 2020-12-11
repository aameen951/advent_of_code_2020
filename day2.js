import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day2.txt", {encoding:"utf8"}).trim();

// Split the file into lines and parse it.
const entries = raw_data.split("\n").map(l => l.match(/^(\d+)\-(\d+) ([a-z]): ([a-z]+)$/).slice(1));

/// PART ONE

// We need to count the number of valid policies.
part_one_solution = 0;
entries.forEach(entry => {
  // Number of occurrences of char in the policy.
  let char_count = 0;
  // Loop over the letters in the policy.
  for(let i=0; i<entry[3].length; i++)if(entry[3][i] == entry[2])char_count++;
  // If the number of letters is between the allowed range, then
  if(char_count >= +entry[0] && char_count <= +entry[1])
  {
    // count the policy as valid.
    part_one_solution++;
  }
});

/// PART TWO

// We need to count the number of valid policies.
part_two_solution = 0;
entries.forEach(entry => {
  // get the char at position specified by first number (1-based index)
  const c_at_a = entry[3][+entry[0] - 1];
  // get the char at position specified by second number (1-based index)
  const c_at_b = entry[3][+entry[1] - 1];

  // If one and only one of the position has the char specified, then it is a valid policy.
  if((c_at_a === entry[2]) !== (c_at_b === entry[2]))
  {
    // count the policy as valid.
    part_two_solution++;
  }
});


/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
