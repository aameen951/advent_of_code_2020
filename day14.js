import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day14.txt", {encoding:"utf8"}).trim();
// raw_data = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`;

/// PROCESSING

const commands = raw_data.split("\n")
  .map(c => c[1] == 'a' ? 
    {cmd:'mask', m:c.match(/^mask = (.*)$/)[1].split("").reverse()} : 
    {cmd:'mem', v:c.match(/^mem\[(\d+)\] = (\d+)$/).slice(1)}
  );

/// PART ONE

{
  let memory = new Map();
  let mask = [];
  commands.forEach(c => {
    if(c.cmd == 'mask')mask = c.m;
    else 
    {
      const value = parseInt(c.v[1]);
      let new_value = 0;
      for(let i=0; i<mask.length; i++)
      {
        let m = mask[i];
        const pw = Math.pow(2, i);
        if(m == '1' || m == 'X' && (value / pw & 1))new_value += pw;
      }
      memory.set(parseInt(c.v[0]), new_value);
    }
  });
  part_one_solution = Array.from(memory.values()).reduce((p, i) => i+p, 0);
}

/// PART TWO

{
  let memory = new Map();
  let mask = [];
  commands.forEach(c => {
    if(c.cmd == 'mask')mask = c.m;
    else 
    {
      const address = parseInt(c.v[0]).toString(2).split("").reverse();
      const value = parseInt(c.v[1]);
      let m = [];
      function rec(i){
        if(i == mask.length)
        {
          memory.set(parseInt(m.slice(0).reverse().join(""), 2), value);
        }
        else if(mask[i] == '1')
        {
          m.push('1');
          rec(i+1);
          m.pop();
        }
        else if(mask[i] == '0')
        {
          m.push(address[i] || '0');
          rec(i+1);
          m.pop();
        }
        else if(mask[i] == 'X')
        {
          m.push('0');
          rec(i+1);
          m.pop();
          m.push('1');
          rec(i+1);
          m.pop();
        }
      }
      rec(0);
    }
  });
  part_two_solution = Array.from(memory.values()).reduce((p, i) => i+p, 0);
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
