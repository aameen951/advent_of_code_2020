import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

const raw_data = fs.readFileSync("data/day4.txt", {encoding:"utf8"}).trim();

// Each passport is separated by two newlines.

const passports = raw_data.split("\n\n")
  .map(passport => 
    // fields are separated by a space or a new lines.
    new Map(passport.replace(/\n/g, " ").split(" ").map(field => 
      // field name and value are separated by colon
      /** @type {[String, String]} */(field.split(":"))
    ))
  );

/// PART ONE

// Fields that must all exists in all passports.
const required_fields = [
  'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'
];
part_one_solution = 0;
skip_passport: for(let passport of passports)
{
  for(let f of required_fields)
  {
    // if passport doesn't have one of the required fields skip to the next passport.
    if(!passport.has(f))continue skip_passport;
  }
  // passport has all require fields, count it.
  part_one_solution++;
}

/// PART TWO

part_two_solution = 0;
for(let p of passports)
{
  const [byr, iyr, eyr, hgt, hcl, ecl, pid] = [
    p.get('byr'), p.get('iyr'), p.get('eyr'), p.get('hgt'), p.get('hcl'), p.get('ecl'), p.get('pid'),
  ]

  // if any of the required fields doesn't exists skip the passport.
  if(!byr||!iyr||!eyr||!hgt||!hcl||!ecl||!pid)continue;
  
  // check all the rules.
  if(!byr.match(/^\d+$/) || +byr < 1920 || +byr > 2002)continue;
  if(!iyr.match(/^\d+$/) || +iyr < 2010 || +iyr > 2020)continue;
  if(!eyr.match(/^\d+$/) || +eyr < 2020 || +eyr > 2030)continue;
  if(hgt.slice(-2) != 'cm' && hgt.slice(-2) != 'in')continue;
  if(hgt.slice(-2) == 'cm' && +hgt.slice(0, -2) < 150)continue;
  if(hgt.slice(-2) == 'cm' && +hgt.slice(0, -2) > 193)continue;
  if(hgt.slice(-2) == 'in' && +hgt.slice(0, -2) < 59)continue;
  if(hgt.slice(-2) == 'in' && +hgt.slice(0, -2) > 76)continue;
  if(!hcl.match(/^#[0-9a-fA-F]{6}$/))continue;
  if(!(new Set('amb blu brn gry grn hzl oth'.split(" "))).has(ecl))continue;
  if(!pid.match(/^\d{9}$/))continue;
  
  // all rules checked for this passport, count it.
  part_two_solution++;
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
