import fs from 'fs';

let part_one_solution = null;
let part_two_solution = null;

let raw_data = fs.readFileSync("data/day22.txt", {encoding:"utf8"}).trim();

/// PROCESSING
const sections = raw_data.split("\n\n");
const [player_1, player_2] = sections.map(s => s.split("\n").slice(1).map(n => +n));

/// UTILS
function score_deck(deck)
{
  return deck.slice(0).reverse().map((n, i) => n*(i+1)).reduce((p, i) => p + i);
}

/// PART ONE
{
  const p1 = player_1.slice(0);
  const p2 = player_2.slice(0);
  while(p1.length && p2.length)
  {
    const [n1, n2] = [p1.shift(), p2.shift()];
    if(n1 > n2) p1.push(n1, n2);
    else p2.push(n2, n1);
  }
  part_one_solution = score_deck(p1.length ? p1 : p2);
}

/// PART TWO
{
  const p1 = player_1.slice(0);
  const p2 = player_2.slice(0);
  part_two_solution = score_deck(play_game(p1, p2) == 1 ? p1 : p2);

  function play_game(p1, p2)
  {
    const cache = new Set();
    while(p1.length && p2.length)
    {
      // construct a unique key for the round
      const key = `p1|${p1.join(",")}|p2|${p2.join(",")}`;
      if(cache.has(key))return 1;
      cache.add(key);

      const [n1, n2] = [p1.shift(), p2.shift()];

      let won = null;
      if(n1 <= p1.length && n2 <= p2.length)
        won = play_game(p1.slice(0, n1), p2.slice(0, n2));
      else
        won = n1 > n2 ? 1 : 2;

      if(won == 1)
        p1.push(n1, n2);
      else
        p2.push(n2, n1);
    }
    return p1.length ? 1 : 2;
  }
}

/// OUTPUT

console.log(part_one_solution);
console.log(part_two_solution);
