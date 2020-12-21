import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day21.txt", {encoding:"utf8"}).trim();

/// PROCESSING

const foods = raw_data.split("\n").map(x => {
  let m = x.match(/^(.+) \(contains (.*)\)$/);
  const ingredients = m[1].split(" ");
  const allergies = m[2].split(", ");
  return {ingredients, allergies};
});

/// UTILS

/// PART ONE
const ingredients = new Map();
{
  // for each allergy, find the ingredients that are common between all foods that has this allergy.
  const allergies = new Map();
  for(let f of foods)
  {
    const ingredients = new Set(f.ingredients);
    for(let alg_name of f.allergies)
    {
      if(!allergies.has(alg_name))
      {
        allergies.set(alg_name, Array.from(ingredients.keys()));
      }
      else
      {
        allergies.set(alg_name, allergies.get(alg_name).filter(ing => ingredients.has(ing)));
      }
    }
  }

  // resolve which ingredient is the allergic ingredient by progressive elimination.
  let progress = true;
  while(progress)
  {
    progress = false;
    for(let [alg_name, alg] of allergies)
    {
      for(let i=0; i<alg.length; i++)
      {
        if(alg.length > 1 && ingredients.has(alg[i]))
        {
          alg.splice(i--, 1);
          progress = true;
        }
      }
      if(alg.length == 1 && !ingredients.has(alg[0]))
      {
        ingredients.set(alg[0], alg_name);
        progress = true;
      }
    }
  }

  // count non-allergic ingredients
  part_one_solution = 0;
  for(let f of foods)
  {
    for(let ing of f.ingredients)
    {
      if(!ingredients.has(ing))part_one_solution++;
    }
  }
}

/// PART TWO

{
  // get the list of allergic ingredients sorted by allergy name.
  const sorted_ingredients = Array.from(ingredients.entries()).sort((a,b)=>a[1].localeCompare(b[1]));
  part_two_solution = sorted_ingredients.map(e=>e[0]).join(",");
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
