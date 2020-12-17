import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day17.txt", {encoding:"utf8"}).trim();

/// PROCESSING

function str_into_cube(cube_2d, str)
{
  const slice = str.split("\n").map(l => l.split(""));
  const y_dim = slice.length;
  const x_dim = slice[0].length;

  const x_offset = Math.floor(0.5 * (MAX_DIM - x_dim));
  const y_offset = Math.floor(0.5 * (MAX_DIM - y_dim));

  for(let y=0; y<y_dim; y++)
  {
    for(let x=0; x<x_dim; x++)
    {
      cube_2d[y_offset+y][x_offset+x] = slice[y][x];
    }
  }
}

/// UTILS

const MAX_DIM = 30;

function rng(n){const r = new Array(n);for(let i=0; i<n; i++)r[i] = i;return r;}
const make_cube3 = () => rng(MAX_DIM).map(z => rng(MAX_DIM).map(y => rng(MAX_DIM).map(x => '.')));
const make_cube4 = () => rng(MAX_DIM).map(w => rng(MAX_DIM).map(z => rng(MAX_DIM).map(y => rng(MAX_DIM).map(x => '.'))));

function str_to_cube3(str)
{
  const cube = make_cube3();
  const z_offset = Math.floor(0.5 * (MAX_DIM - 0));
  str_into_cube(cube[z_offset], str);
  return cube;
}
function str_to_cube4(str)
{
  const cube = make_cube4();
  const z_offset = Math.floor(0.5 * (MAX_DIM - 0));
  const w_offset = Math.floor(0.5 * (MAX_DIM - 0));
  str_into_cube(cube[w_offset][z_offset], str);
  return cube;
}

function count_active_neighbors3(c, px, py, pz)
{
  let count = 0;
  for(let z=pz-1; z<=pz+1; z++)
    for(let y=py-1; y<=py+1; y++)
      for(let x=px-1; x<=px+1; x++)
        if(c[z][y][x] === '#' && (x != px || y != py || z != pz))
          count++;
  return count;
}
function count_active_neighbors4(c, px, py, pz, pw)
{
  let count = 0;
  for(let w=pw-1; w<=pw+1; w++)
    for(let z=pz-1; z<=pz+1; z++)
      for(let y=py-1; y<=py+1; y++)
        for(let x=px-1; x<=px+1; x++)
          if(c[w][z][y][x] === '#' && (x != px || y != py || z != pz || w != pw))
            count++;
  return count;
}
function transform(state, neighbors)
{
  if(state === '#' && (neighbors === 2 || neighbors === 3))return '#';
  if(state !== '#' && neighbors === 3)return '#';
  return '.';
}
function count_active(n_dim_cube)
{
  if(!Array.isArray(n_dim_cube))return n_dim_cube === '#' ? 1 : 0;
  let count = 0;
  for(let x=0; x<MAX_DIM; x++)
  {
    count += count_active(n_dim_cube[x]);
  }
  return count;
}

/// PART ONE
{
  let c = str_to_cube3(raw_data);
  for(let sim=0; sim<6; sim++)
  {
    const nc = make_cube3();
    for(let z=1; z<MAX_DIM-1; z++)
      for(let y=1; y<MAX_DIM-1; y++)
        for(let x=1; x<MAX_DIM-1; x++)
          nc[z][y][x] = transform(c[z][y][x], count_active_neighbors3(c, x,y,z));
    c = nc;
  }
  part_one_solution = count_active(c);
}

/// PART TWO
{
  let c = str_to_cube4(raw_data);
  for(let sim=0; sim<6; sim++)
  {
    const nc = make_cube4();
    for(let w=1; w<MAX_DIM-1; w++)
      for(let z=1; z<MAX_DIM-1; z++)
        for(let y=1; y<MAX_DIM-1; y++)
          for(let x=1; x<MAX_DIM-1; x++)
            nc[w][z][y][x] = transform(c[w][z][y][x], count_active_neighbors4(c, x,y,z,w));
    c = nc;
  }
  part_two_solution = count_active(c);
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
