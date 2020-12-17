import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day16.txt", {encoding:"utf8"}).trim();

/// PROCESSING

const sections = raw_data.split("\n\n");

const rules = sections[0].split("\n")
  .map(r => r.match(/^([^:]+): (\d+)\-(\d+) or (\d+)\-(\d+)$/))
  .map(r => ({name:r[1], r1s:+r[2], r1e:+r[3], r2s:+r[4], r2e:+r[5]}));
const your = sections[1].split('\n')[1].split(",").map(c => parseInt(c));
const nearby = sections[2].split('\n').slice(1).map(x => x.split(",").map(c => parseInt(c)));

/// PART ONE

const invalid_fields = [];
// track invalid tickets for part 2
const invalid_tickets = new Set();
for(let i=0; i<nearby.length; i++)
{
  const t = nearby[i];
  next_col: for(let j=0; j<t.length; j++)
  {
    const n = t[j];
    for(let k=0; k<rules.length; k++)
    {
      const r = rules[k];
      if(n >= r.r1s && n <= r.r1e)continue next_col;
      if(n >= r.r2s && n <= r.r2e)continue next_col;
    }
    invalid_fields.push(n);
    invalid_tickets.add(i);
  }
}
part_one_solution = invalid_fields.reduce((p, i) => p + i, 0);

/// PART TWO

// first pass: for each column find the list of possible rules
const all_possible_rules = [];
for(let col_idx=0; col_idx<rules.length; col_idx++)
{
  const possible_rules = [];
  next_rule: for(let j=0; j<rules.length; j++)
  {
    const r = rules[j];

    for(let k=0; k<nearby.length; k++)
    {
      if(invalid_tickets.has(k))continue;

      let n = nearby[k][col_idx];
      if((n < r.r1s || n > r.r1e) && (n < r.r2s || n > r.r2e))continue next_rule;
    }
    possible_rules.push(j);
  }
  all_possible_rules[col_idx] = possible_rules;
}

// second pass: columns that only have one possible rule will be assigned first
const allocated = new Set();
const final_map = new Map();
while(allocated.size < rules.length)
{
  for(let i=0; i<all_possible_rules.length; i++)
  {
    if(final_map.has(i))continue;

    const available = all_possible_rules[i].filter(x => !allocated.has(x));
    if(available.length != 1)continue;

    final_map.set(i, available[0]);
    allocated.add(available[0]);
  }
}

// multiply values in your ticket that that start with "departure".
part_two_solution = 1;
for(let [col, rule] of final_map)
{
  if(rules[rule].name.match(/^departure/))
  {
    part_two_solution *= your[col];
  }
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
