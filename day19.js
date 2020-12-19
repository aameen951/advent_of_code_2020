import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day19.txt", {encoding:"utf8"}).trim();

/// PROCESSING

const sections = raw_data.split("\n\n");
const messages = sections[1].split("\n");

const rules = new Map();
sections[0].split("\n").forEach(l => {
  const [ , id, r] = l.match(/^(\d+): (.*)$/);
  rules.set(id, r[0] == '"' ? r[1] : r.split(" | ").map(sub => sub.split(" ")));
});

/// UTILS

function match_list(set, message, char_idx, sub_rule_idx, sub_rules)
{
  const matches = new Set();
  const rule = rules.get(sub_rules[sub_rule_idx]);
  if(typeof rule == 'string')
  {
    if(message[char_idx] === rule)matches.add(char_idx+1);
  }
  else 
  {
    for(let list of rule)
    {
      match_list(new Set(), message, char_idx, 0, list).forEach(v => matches.add(v));
    }
  }
  if(sub_rule_idx+1 === sub_rules.length)
  {
    matches.forEach(i => set.add(i));
  }
  else
  {
    for(let m of matches)match_list(set, message, m, sub_rule_idx+1, sub_rules);
  }
  return set;
}
function match_rule(m, rule_id)
{
  return match_list(new Set(), m, 0, 0, [rule_id]).has(m.length);
}

/// PART ONE

part_one_solution = messages.filter(m => match_rule(m, '0')).length;

/// PART TWO

rules.set("8", [["42"], ["42", "8"]]);
rules.set("11", [["42", "31"], ["42", "11", "31"]]);

part_two_solution = messages.filter(m => match_rule(m, '0')).length;

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
