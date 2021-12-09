export function solution1(map) {
  let sum = 0;
  for (let y = 0, ylen = map.length; y < ylen; y++) {
    for (let x = 0, xlen = map[y].length; x < xlen; x++) {
      let isLower = true;
      // Check top
      if (y > 0) {
        isLower = isLower && map[y][x] < map[y - 1][x];
      }
      // Check bottom
      if (y < ylen - 1) {
        isLower = isLower && map[y][x] < map[y + 1][x];
      }
      // Check left
      if (x > 0) {
        isLower = isLower && map[y][x] < map[y][x - 1];
      }
      // Check right
      if (x < xlen - 1) {
        isLower = isLower && map[y][x] < map[y][x + 1];
      }

      if (isLower) {
        sum += map[y][x] + 1;
      }
    }
  }
  return sum;
}

export function solution2(map) {
  const points = [];
  for (let y = 0, ylen = map.length; y < ylen; y++) {
    for (let x = 0, xlen = map[y].length; x < xlen; x++) {
      let isLower = true;
      // Check top
      if (y > 0) {
        isLower = isLower && map[y][x] < map[y - 1][x];
      }
      // Check bottom
      if (y < ylen - 1) {
        isLower = isLower && map[y][x] < map[y + 1][x];
      }
      // Check left
      if (x > 0) {
        isLower = isLower && map[y][x] < map[y][x - 1];
      }
      // Check right
      if (x < xlen - 1) {
        isLower = isLower && map[y][x] < map[y][x + 1];
      }

      if (isLower) {
        points.push([x, y]);
      }
    }
  }
  const basins = [];
  const maxY = map.length;
  const maxX = map[0].length;
  function toggleVisited(visited, x, y) {
    if (!visited[x]) {
      visited[x] = [];
    }
    visited[x][y] = true;
  }
  function isVisited(visited, x, y) {
    if (!visited[x]) {
      visited[x] = [];
    }
    return visited[x][y];
  }
  function getBasin(x, y, id, visited) {
    // Check top
    if (y > 0) {
      if (!isVisited(visited, x, y - 1) && map[y - 1][x] !== 9 && map[y][x] < map[y - 1][x]) {
        basins[id]++;
        toggleVisited(visited, x, y - 1);
        getBasin(x, y - 1, id, visited);
      }
    }
    // Check bottom
    if (y < maxY - 1) {
      if (!isVisited(visited, x, y + 1) && map[y + 1][x] !== 9 && map[y][x] < map[y + 1][x]) {
        basins[id]++;
        toggleVisited(visited, x, y + 1);
        getBasin(x, y + 1, id, visited);
      }
    }
    // Check left
    if (x > 0) {
      if (!isVisited(visited, x - 1, y) && map[y][x - 1] !== 9 && map[y][x] < map[y][x - 1]) {
        basins[id]++;
        toggleVisited(visited, x - 1, y);
        getBasin(x - 1, y, id, visited);
      }
    }
    // Check right
    if (x < maxX - 1) {
      if (!isVisited(visited, x + 1, y) && map[y][x + 1] !== 9 && map[y][x] < map[y][x + 1]) {
        basins[id]++;
        toggleVisited(visited, x + 1, y);
        getBasin(x + 1, y, id, visited);
      }
    }
  }
  for (let i = 0, len = points.length; i < len; i++) {
    const visited = [];
    basins[i] = 1;
    toggleVisited(visited, ...points[i]);
    getBasin(...points[i], i, visited);
  }
  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
}

export function parseInputs(input) {
  return input.split('\n').map((row) => row.split('').map((item) => Number(item)));
}
