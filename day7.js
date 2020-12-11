import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day7.txt", {encoding:"utf8"}).trim();

// Each rule is on a separate line.
const rules = new Map(raw_data.split("\n")
  // parse-rule          =  <bag-color> " bags contain " <bag-contents> "."
  .map(r => r.match(/^(.*?) bags contain (.*?)\.$/).slice(1))
  .map(r => {
    // bag-contents      =  ("no other bags" | #<bag-content>)
    const contents = r[1] == 'no other bags' ? [] : r[1].split(", ")
      .map(i => {
        // bag-content   =  <number> " " <bag-color> " bag" ["s"]
        const m = i.match(/^(\d+) (.*?) bags?$/).slice(1);
        return [+m[0], m[1]];
      });
    return [r[0], contents];
  }));
  

/// PART ONE

function contain(contents, color)
{
  // Loop through the bags inside
  for(let c of contents)
  {
    // if the bag color equal to the requested return true
    if(c[1] == color)return true;
  }
  // We didn't find the bag directly within, loop through the bags again
  for(let c of contents)
  {
    // recursively check if one of the bags contains inside it the required bag.
    if(contain(rules.get(c[1]), color))return true;
  }
  return false;
}

part_one_solution = 0;
// loop through all the colors
for(let contents of rules.values())
{
  // check if the bag contains directly or indirectly the bag that we want.
  if(contain(contents, "shiny gold"))part_one_solution++;
}

/// PART TWO

// count all the bags recursively inside the specified bag.
function count_bags(color)
{
  let total = 0;
  // get the bag contents
  rules.get(color).map(content => {
    const count = /** @type {number}*/(content[0]);
    // add the number of bags and the number of bags inside of each one.
    total += count + count * count_bags(content[1]);
  });
  return total;
}
part_two_solution = count_bags("shiny gold");

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
