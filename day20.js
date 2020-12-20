import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day20.txt", {encoding:"utf8"}).trim();

const MONSTER = [
  `                  # `,
  `#    ##    ##    ###`,
  ` #  #  #  #  #  #   `
].map(l => l.split(""));

/// PROCESSING

const sections = raw_data.split("\n\n");
const tiles = new Map(sections.map(section => {
  const [id_line, ...rows] = section.split("\n");
  const id = parseInt(id_line.match(/.* (\d+):/)[1]);
  const pixels = rows.map(l => l.split(""));
  return [id, {id, pixels}];
}));

const TILE_DIM = 10;

/// UTILS

function rng(n){const arr = new Array(n);for(let i=0; i<n; i++)arr[i] = i;return arr;}
function get_edge0(tile)
{
  return tile.pixels[0];
}
function get_edge1(tile)
{
  return tile.pixels.map(row => row[row.length-1]);
}
function get_edge2(tile)
{
  return tile.pixels[tile.pixels.length-1].slice(0).reverse();
}
function get_edge3(tile)
{
  return tile.pixels.map(row => row[0]).reverse();
}
const get_edge_cb = [get_edge0, get_edge1, get_edge2, get_edge3];
function get_edge(edge, tile){return get_edge_cb[edge](tile);}
function edge_eq(a, b)
{
  console.assert(a.length == b.length);
  for(let i=0; i<a.length; i++)if(a[i] !== b[i])return false;
  return true;
}
function edge_r_eq(a, b)
{
  console.assert(a.length == b.length);
  for(let i=0; i<a.length; i++)if(a[i] !== b[b.length-i-1])return false;
  return true;
}
function edge_search(tile, tile_edge_idx)
{
  const edge = get_edge(tile_edge_idx, tile);
  for(let [test_id, test_tile] of tiles)
  {
    if(test_id != tile.id)
    {
      for(let edge_idx=0; edge_idx<4; edge_idx++)
      {
        const test_edge = get_edge(edge_idx, test_tile);
        if(edge_eq(edge, test_edge))return {tile:test_tile, edge_idx, reverse:true};
        if(edge_r_eq(edge, test_edge))return {tile:test_tile, edge_idx, reverse:false};
      }
    }
  }
  return null;
}
function rotate_grid(grid)
{
  console.assert(grid.length == grid[0].length);
  const TILE_DIM = grid.length;
  const result = rng(TILE_DIM).map(c => rng(TILE_DIM));
  for(let i=0; i<TILE_DIM; i++)
  {
    for(let j=0; j<TILE_DIM; j++)
    {
      result[i][j] = grid[TILE_DIM-j-1][i];
    }
  }
  return result;
}
function flip_grid_h(grid)
{
  return grid.map(c => c.slice(0).reverse());
}
function flip_grid_v(grid)
{
  return grid.map(c => c).reverse();
}
function rotate_tile(tile)
{
  return {id:tile.id, pixels:rotate_grid(tile.pixels)};
}
function flip_tile_v(tile)
{
  return {id:tile.id, pixels: flip_grid_v(tile.pixels)};
}
function flip_tile_h(tile)
{
  return {id:tile.id, pixels: flip_grid_h(tile.pixels)};
}

function fix_tile(tile, edge_idx, reverse, target_edge_idx)
{
  while((edge_idx + 2) % 4 != target_edge_idx)
  {
    tile = rotate_tile(tile);
    edge_idx++;
  }
  if(reverse)
  {
    tile = (target_edge_idx & 1) == 1 ? flip_tile_v(tile) : flip_tile_h(tile);
  }
  return tile;
}

/// PART ONE

part_one_solution = 1;
for(let [id, tile] of tiles)
{
  let not_found_count = 0;
  for(let edge_idx=0; edge_idx<4; edge_idx++)
  {
    if(!edge_search(tile, edge_idx))not_found_count++;
  }
  if(not_found_count == 2)part_one_solution *= id;
}

/// PART TWO

const IMG_DIM_IN_TILES = Math.sqrt(tiles.size);
const image_tiles = rng(IMG_DIM_IN_TILES).map(c => rng(IMG_DIM_IN_TILES).map(c => null));

// find a corner tile and rotate to be in the top-left corner.
done: for(let [id, tile] of tiles)
{
  let edges = [0,1,2,3].map(edge => !edge_search(tile, edge));
  if(edges.reduce((p, i) => p + +i, 0) == 2)
  {
    for(let i=0; i<4; i++)
    {
      if(edges[i] && edges[(i+1)%4])
      {
        image_tiles[0][0] = fix_tile(tile, i, false, 1);
        break done;
      }
    }
  }
}

// resolve the first row of tiles.
for(let i=1; i<IMG_DIM_IN_TILES; i++)
{
  const search_res = edge_search(image_tiles[0][i-1], 1);
  image_tiles[0][i] = fix_tile(search_res.tile, search_res.edge_idx, search_res.reverse, 1);
}

// resolve the rest of tiles.
for(let i=1; i<IMG_DIM_IN_TILES; i++)
{
  for(let j=0; j<IMG_DIM_IN_TILES; j++)
  {
    const search_res = edge_search(image_tiles[i-1][j], 2);
    image_tiles[i][j] = fix_tile(search_res.tile, search_res.edge_idx, search_res.reverse, 2);
  }
}

let image = [];

// remove the border of each tile and construct the image.
for(let i=0; i<IMG_DIM_IN_TILES; i++)
{
  for(let j=1; j<TILE_DIM-1; j++)
  {
    const row = [];
    for(let k=0; k<IMG_DIM_IN_TILES; k++)
    {
      row.push(...image_tiles[i][k].pixels[j].slice(1, -1));
    }
    image.push(row);
  }
}

const excluded = new Set();

// scan the image in all orientation and all flips.
for(let rot=0; rot<4; rot++)
{
  for(let flip of [image, flip_grid_h(image), flip_grid_v(image)])
  {
    for(let i=0; i<flip.length-MONSTER.length; i++)
    {
      next: for(let j=0; j<flip[i].length-MONSTER[0].length; j++)
      {
        for(let k=0; k<MONSTER.length; k++)
        {
          for(let l=0; l<MONSTER[k].length; l++)
          {
            if(MONSTER[k][l] == '#' && flip[i+k][j+l] != '#')
            {
              continue next;
            }
          }
        }
        for(let k=0; k<MONSTER.length; k++)
        {
          for(let l=0; l<MONSTER[k].length; l++)
          {
            if(MONSTER[k][l] == '#')excluded.add(`${i+k}|${j+l}`);
          }
        }
      }
    }
  }
  image = rotate_grid(image);
}

const num_of_hashes = image.map(row => row.filter(c => c == '#').length).reduce((p,i)=>p+i);
part_two_solution = num_of_hashes - excluded.size;

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
