import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day6.txt", {encoding:"utf8"}).trim();

// Each passport is separated by two newlines.

// groups are separated by two newlines.
const groups = raw_data.split("\n\n")
  // each person on separate line
  .map(group => group.split("\n")
    // convert answers into set
    .map(p => new Set(p.split("")))
  );

/// PART ONE

part_one_solution = 0;
for(let group of groups)
{
  // use set to prevent counting the same question multiple times.
  const set = new Set();
  // for each person
  for(let p of group)
  {
    // for each yes-answer, add it to the set
    for(let c of p.keys())set.add(c);
  }
  // count the number of unique yes-questions in the group.
  part_one_solution += set.size;
}

/// PART TWO

// return questions answered as yes by two people.
const intersect = (s1, s2) => new Set([...s1].filter(e => s2.has(e)));

part_two_solution = 0;
for(let group of groups)
{
  let set = group[0];
  for(let p of group.slice(1))
    set = intersect(set, p);
  // add the number of all-answered-yes-questions.
  part_two_solution += set.size;
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
