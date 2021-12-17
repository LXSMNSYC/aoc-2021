export function parseInputs(input) {
  return Object.fromEntries(input.substring('target area: '.length)
    .split(', ')
    .map((item) => {
      const range = item.substring(2).split('..').map((val) => Number(val));
      if (/^x=/.test(item)) {
        return ['x', range];
      }
      return ['y', range];
    }));
}

function inRect(x, y, bounds) {
  return (
    bounds.x[0] <= x
    && x <= bounds.x[1]
    && bounds.y[0] <= y
    && y <= bounds.y[1]
  );
}

function throwProbe(input, cx, cy) {
  let dx = cx;
  let dy = cy;

  let x = 0;
  let y = 0;
  let maxY = 0;
  while (x <= input.x[1] && y >= input.y[0]) {
    x += dx;
    y += dy;
    dx -= Math.sign(dx);
    dy--;

    if (y > maxY) {
      maxY = y;
    }

    if (inRect(x, y, input)) {
      return maxY;
    }
  }
  return null;
}

export function solution1(input) {
  let maxY = 0;

  for (let cx = 1; cx <= input.x[1]; cx++) {
    for (let cy = input.y[0]; cy < 1000; cy++) {
      const result = throwProbe(input, cx, cy);
      if (result && result > maxY) {
        maxY = result;
      }
    }
  }

  return maxY;
}

export function solution2(input) {
  let count = 0;

  for (let cx = 1; cx <= input.x[1]; cx++) {
    for (let cy = input.y[0]; cy < 1000; cy++) {
      const result = throwProbe(input, cx, cy);
      if (result != null) {
        count++;
      }
    }
  }

  return count;
}
