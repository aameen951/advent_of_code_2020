import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day25.txt", {encoding:"utf8"}).trim();

/// PROCESSING
const [card_pub, door_pub] = raw_data.split("\n").map(n => +n);

/// UTILS
const DIVISOR = 20201227;
function transform(loop_size, key)
{
  let value = 1;
  for(let i=0; i<loop_size; i++)
  {
    value *= key;
    value = value % DIVISOR;
  }
  return value;
}
function reverse_transform(public_key)
{
  const SUBJECT_NUMBER = 7;
  let value = 1;
  let loop_size = 0;
  while(value != public_key)
  {
    value *= SUBJECT_NUMBER;
    value = value % DIVISOR;
    loop_size++;
  }
  return loop_size;
}

/// PART ONE
{
  const card_loop_size = reverse_transform(card_pub);
  part_one_solution = transform(card_loop_size, door_pub);
}

/// PART TWO
// no part two

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
