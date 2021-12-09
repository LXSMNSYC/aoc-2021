export function solution1(arr) {
  const map = [];

  function set(x, y) {
    const row = map[x] || [];
    row[y] = (row[y] || 0) + 1;
    map[x] = row;
  }

  for (const [[x1, y1], [x2, y2]] of arr) {
    const goX = x1 === x2;
    const goY = y1 === y2;
    if (goX && goY) {
      set(Number(x1), Number(y1));
      continue;
    }
    if (goX) {
      const r1 = Number(y1);
      const r2 = Number(y2);
      const direction = Math.sign(r2 - r1);
      for (let i = r1; (direction < 0) ? (i >= r2) : (i <= r2); i += direction) {
        set(Number(x1), i);
      }
      continue;
    }
    if (goY) {
      const r1 = Number(x1);
      const r2 = Number(x2);
      const direction = Math.sign(r2 - r1);
      for (let i = r1; (direction < 0) ? (i >= r2) : (i <= r2); i += direction) {
        set(i, Number(y1));
      }
      continue;
    }
  }
  let c = 0;
  for (let x = 0, xlen = map.length; x < xlen; x++) {
    if (map[x]) {
      for (let y = 0, ylen = map[x].length; y < ylen; y++) {
        c += (map[x][y] > 1) ? 1 : 0;
      }
    }
  }
  return c;
}

export function solution2(arr) {
  const map = [];

  function set(x, y) {
    const row = map[x] || [];
    row[y] = (row[y] || 0) + 1;
    map[x] = row;
  }

  for (const [[x1, y1], [x2, y2]] of arr) {
    const goX = x1 === x2;
    const goY = y1 === y2;
    if (goX && goY) {
      set(Number(x1), Number(y1));
      continue;
    }
    if (goX) {
      const r1 = Number(y1);
      const r2 = Number(y2);
      const direction = Math.sign(r2 - r1);
      for (let i = r1; (direction < 0) ? (i >= r2) : (i <= r2); i += direction) {
        set(Number(x1), i);
      }
      continue;
    }
    if (goY) {
      const r1 = Number(x1);
      const r2 = Number(x2);
      const direction = Math.sign(r2 - r1);
      for (let i = r1; (direction < 0) ? (i >= r2) : (i <= r2); i += direction) {
        set(i, Number(y1));
      }
      continue;
    }
    const slope = (y2 - y1) / (x2 - x1);
    if (slope === 1 || slope === -1) {
      const rx1 = Number(x1);
      const rx2 = Number(x2);
      const xdirection = Math.sign(rx2 - rx1);
      const ry1 = Number(y1);
      const ry2 = Number(y2);
      const ydirection = Math.sign(ry2 - ry1);
      for (
        let x = rx1, y = ry1;
        ((xdirection < 0) ? (x >= rx2) : (x <= rx2))
        && ((ydirection < 0) ? (y >= ry2) : (y <= ry2));
        x += xdirection, y += ydirection
      ) {
        set(x, y);
      }
    }
  }
  let c = 0;
  for (let x = 0, xlen = map.length; x < xlen; x++) {
    if (map[x]) {
      for (let y = 0, ylen = map[x].length; y < ylen; y++) {
        c += (map[x][y] > 1) ? 1 : 0;
      }
    }
  }
  return c;
}

export function parseInputs(input) {
  return input.split('\n').map(
    (item) => item.split(' -> ').map(
      (row) => row.split(','),
    ),
  );
}
