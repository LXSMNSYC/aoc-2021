function plot(map) {
  return map.map((row) => row.map((item) => (item ? '#' : '.')).join('')).join('\n');
}

function createMap(maxX, maxY) {
  const map = [];
  for (let y = 0; y <= maxY; y++) {
    map[y] = [];
    for (let x = 0; x <= maxX; x++) {
      map[y][x] = false;
    }
  }
  return map;
}

function solution([coords, folds], isSolution1) {
  const xs = [];
  const ys = [];
  for (const [x, y] of coords) {
    xs.push(x);
    ys.push(y);
  }
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  let map = createMap(maxX, maxY);
  for (const [x, y] of coords) {
    map[y][x] = true;
  }
  for (const fold of folds) {
    const oldMap = map;
    if ('x' in fold) {
      map = createMap(fold.x - 1, map.length - 1);
      for (let y = 0, ylen = oldMap.length; y < ylen; y++) {
        const row = oldMap[y];
        for (let x = fold.x + 1, xlen = row.length; x < xlen; x++) {
          const distance = fold.x - Math.abs(fold.x - x);
          map[y][distance] = row[x] || row[distance];
        }
      }
    } else {
      map = createMap(map[0].length - 1, fold.y - 1);
      for (let y = fold.y + 1, ylen = oldMap.length; y < ylen; y++) {
        const row = oldMap[y];
        const distance = fold.y - Math.abs(fold.y - y);
        for (let x = 0, xlen = row.length; x < xlen; x++) {
          map[distance][x] = row[x] || oldMap[distance][x];
        }
      }
    }
    if (isSolution1) {
      break;
    }
  }
  if (isSolution1) {
    // count
    let count = 0;
    for (let y = 0, ylen = map.length; y < ylen; y++) {
      for (let x = 0, xlen = map[y].length; x < xlen; x++) {
        if (map[y][x]) {
          count++;
        }
      }
    }
    return count;
  }
  return plot(map);
}

export function solution1([coords, folds]) {
  return solution1([coords, folds], true);
}

export function solution2([coords, folds]) {
  return solution1([coords, folds]);
}

export function parseInputs(input) {
  const [coords, fold] = input.split('\n\n');
  return [
    coords.split('\n').map((item) => item.split(',').map((data) => Number(data))),
    fold.split('\n').map((item) => (
      /fold along y/.test(item)
        ? { y: Number(item.substring(13)) }
        : { x: Number(item.substring(13)) }
    )),
  ];
}
