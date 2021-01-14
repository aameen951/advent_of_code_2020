import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day24.txt", {encoding:"utf8"}).trim();

/// PROCESSING
const lines = raw_data.split("\n").map(line => line.replace(/(se|sw|ne|nw|e|w)/g, " $1").trim().split(" "));

/// UTILS
// These are the relative coordinates for all neighbors in a hex grid.
const NEIGHBORS = [
  [ 1, 0], // e
  [-1, 0], // w
  [ 0, 1], // se
  [-1, 1], // sw
  [ 1,-1], // ne
  [ 0,-1], // nw
];
// count the number of neighbors with black tile.
function count_black_neighbors(map, x, y)
{
  return NEIGHBORS
    .map(([x_off, y_off]) => map.get(`${x+x_off}|${y+y_off}`) || false)
    .filter(x => x)
    .length;
}
// count the total number of black tiles in a map.
function count_black(map)
{
  return Array.from(map.values()).filter(x => x).length;
}

/// PART ONE
const tiles = new Map();
{
  for(let line of lines)
  {
    let x = 0, y = 0;
    for(let dir of line)
    {
      switch(dir){
        case 'e':  x++;break;
        case 'w':  x--;break;
        case 'se': y++;break;
        case 'sw': y++;x--;break;
        case 'ne': y--;x++;break;
        case 'nw': y--;break;
      }
    }
    const key = `${x}|${y}`;
    tiles.set(key, !tiles.get(key));
  }
  part_one_solution = count_black(tiles);
}

/// PART TWO
{
  let old_map = tiles;
  for(let i=0; i<100; i++)
  {
    let map = new Map();
    for(let start_key of old_map.keys())
    {
      const [x_s, y_s] = start_key.split("|").map(x => +x);
      for(let [x_off, y_off] of [[0,0], ...NEIGHBORS])
      {
        const [x, y] = [x_s+x_off, y_s+y_off];
        const key = `${x}|${y}`;
        let value = old_map.get(key) || false;

        const black_count = count_black_neighbors(old_map, x, y);
        
        if(value)
        {
          if(black_count == 0 || black_count > 2)value = !value;
        }
        else
        {
          if(black_count == 2)value = !value;
        }
        if(value)map.set(key, true);
      }
    }
    old_map = map;
  }
  part_two_solution = count_black(old_map);
}

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
