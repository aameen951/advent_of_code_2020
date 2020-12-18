import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day18.txt", {encoding:"utf8"}).trim();

/// PROCESSING

const expressions = raw_data.split("\n").map(l => l.replace(/ /g, "").split(""));

/// UTILS
let parser = null;
function parse_operand(e)
{
  let r = null;
  if(e[0] == '(')
  {
    e.shift();
    r = parser(e);
    e.shift();
  }
  else if(e[0].match(/[0-9]+/))
  {
    r = parseInt(e.shift());
  }
  else
  {
    throw new Error(`${e[0]}`);
  }
  return r;
}

/// PART ONE

function parse_expr1(e)
{
  let r = parse_operand(e);
  while(e[0] == '+' || e[0] == '*')
  {
    const op = e.shift();
    const n2 = parse_operand(e);
    r = op == '+' ? r + n2 : r * n2;
  }
  return r;
}
parser = parse_expr1;
part_one_solution = expressions.map(e => parser(e.slice(0))).reduce((p, i) => p + i, 0);

/// PART TWO

function parse_add(e)
{
  let r = parse_operand(e);
  while(e[0] == '+')
  {
    e.shift();
    r = r + parse_operand(e);
  }
  return r;
}
function parse_expr2(e)
{
  let r = parse_add(e);
  while(e[0] == '*')
  {
    e.shift();
    r = r * parse_add(e);
  }
  return r;
}
parser = parse_expr2;
part_two_solution = expressions.map(e => parser(e.slice(0))).reduce((p, i) => p + i, 0);

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
