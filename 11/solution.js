function flash(map) {
  const maxY = map.length;
  const maxX = map[0].length;
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      map[y][x]++;
    }
  }

  const flashed = {};

  function internal() {
    let flashes = 0;
    let pending = false;

    function inc(x, y) {
      if (x >= 0 && x < maxX && y >= 0 && y < maxY && !flashed[`${x}-${y}`]) {
        map[y][x]++;
        if (map[y][x] > 9) {
          pending = true;
        }
      }
    }
    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        if (map[y][x] > 9 && !flashed[`${x}-${y}`]) {
          map[y][x] = 0;
          flashed[`${x}-${y}`] = true;

          inc(x - 1, y - 1);
          inc(x - 1, y);
          inc(x - 1, y + 1);
          inc(x, y - 1);
          inc(x, y + 1);
          inc(x + 1, y - 1);
          inc(x + 1, y);
          inc(x + 1, y + 1);

          flashes++;
        }
      }
    }
    return flashes + (pending ? internal() : 0);
  }
  return internal();
}

export function solution1(map) {
  let count = 0;
  for (let i = 0; i < 100; i++) {
    count += flash(map);
  }
  return count;
}

function isSync(map) {
  const maxY = map.length;
  const maxX = map[0].length;
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (map[y][x] > 0) {
        return false;
      }
    }
  }
  return true;
}

export function solution2(map) {
  let i = 0;
  while (!isSync(map)) {
    flash(map);
    i++;
  }
  return i;
}

export function parseInputs(input) {
  return input.split('\n').map((row) => row.split('').map((item) => Number(item)));
}
