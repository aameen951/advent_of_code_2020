import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day8.txt", {encoding:"utf8"}).trim();

// Each line has an instruction.
const instructions = raw_data.split("\n")
  // syntax: <op> " " [ "+" | "-" ] <imm>
  .map(i => i.match(/([a-z]+) ([\+\-]\d+)/))
  // convert the instruction into an object.
  .map(i => ({i:i[1], v:+i[2]}));
  
/// PART ONE

// This function will run the instructions and return:
// 1. whether the machine will halt or not.
// 2. the value of accumulator.
function run_machine()
{
  // the accumulator
  let acc = 0;
  // cache for remembering whether the instruction was executed previously.
  const cache = {};
  for(let i=0; true; i++)
  {
    const inst = instructions[i];

    // We are the end of instructions, the program finished.
    if(!inst)return [true, acc];

    // if the instruction was already executed, then return false and the value of accumulator.
    if(cache[i])return [false, acc];
    // remember the instruction.
    cache[i] = true;

    // nop: do nothing
    if(inst.i == 'nop') 0;
    // acc: add to acc.
    else if(inst.i == 'acc') acc += inst.v;
    // jmp: update current instruction (-1 to cancel the ++ in the loop).
    else if(inst.i == 'jmp') i += inst.v-1;
    // unknown instruction.
    else throw new Error(`Unknown instruction '${inst.i}'`);
  }
}

// run the machine, and extract the acc as the solution.
[ , part_one_solution] = run_machine();

/// PART TWO

// loop through all instructions.
for(let i=0; i<instructions.length; i++)
{
  // remember what the instruction is.
  const old_i = instructions[i].i;

  // change 'nop' to 'jmp' and vice versa.
  if(old_i == 'nop')instructions[i].i = 'jmp';
  if(old_i == 'jmp')instructions[i].i = 'nop';

  // run the machine after the change.
  const result = run_machine();
  // if the machine halted, then we fixed the program and acc is the solution.
  if(result[0])
  {
    part_two_solution = result[1];
    break;
  }
  // we didn't fix the program, restore the original instruction.
  instructions[i].i = old_i;
}


/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
