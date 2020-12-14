import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day13.txt", {encoding:"utf8"}).trim();
// raw_data = `939
// 7,13,x,x,59,x,31,19`;

/// PROCESSING

const lines = raw_data.split("\n");
const time = +lines[0];
const ids = lines[1].split(",").filter(x => x != 'x').map(x => +x);

/// PART ONE
{
  let min = 0;
  let min_id = 0;
  ids.forEach(id => {
    if((time + id) % id > min)
    {
      min = (time + id) % id;
      min_id = id;
    }
  });
  part_one_solution = min_id * (min_id-min);
}

/// PART TWO
{
  let times = lines[1].split(",").map(c => c == 'x' ? 0 : +c);
  let step = times[0];
  let base = 0;
  for(let i=1; i<times.length; i++)
  {
    if(times[i] == 0)continue;
    for(let j = base; ; j += step)
    {
      if((j + i) % times[i] == 0)
      {
        base = j;
        break;
      }
    }
    step *= times[i];
  }
  part_two_solution = base;
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
