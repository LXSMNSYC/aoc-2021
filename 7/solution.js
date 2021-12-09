export function solution1(arr) {
  // find smallest alignment
  let floor = Number.MAX_SAFE_INTEGER;
  let ceil = 0;
  for (const x of arr) {
    if (x < floor) {
      floor = x;
    }
    if (x > ceil) {
      ceil = x;
    }
  }

  let min = Number.MAX_SAFE_INTEGER;

  for (; floor <= ceil; floor++) {
    let sum = 0;
    for (const x of arr) {
      sum += Math.abs(floor - x);
    }
    if (sum < min) {
      min = sum;
    }
  }
  return min;
}

export function solution2(arr) {
  // find smallest alignment
  let floor = Number.MAX_SAFE_INTEGER;
  let ceil = 0;
  for (const x of arr) {
    if (x < floor) {
      floor = x;
    }
    if (x > ceil) {
      ceil = x;
    }
  }

  let min = Number.MAX_SAFE_INTEGER;

  for (; floor <= ceil; floor++) {
    let sum = 0;
    for (const x of arr) {
      const n = Math.abs(floor - x);
      sum += (n * n + n) / 2;
    }
    if (sum < min) {
      min = sum;
    }
  }
  return min;
}

export function parseInputs(input) {
  return input.split(',').map((item) => Number(item));
}
