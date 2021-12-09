export function solution1(arr) {
  let horizontal = 0;
  let depth = 0;
  for (const [k, v] of arr) {
    if (k === 'forward') {
      horizontal += Number(v);
    } else if (k === 'down') {
      depth += Number(v);
    } else {
      depth -= Number(v);
    }
  }
  return horizontal * depth;
}

export function solution2(arr) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (const [k, v] of arr) {
    if (k === 'forward') {
      horizontal += Number(v);
      depth += aim * Number(v);
    } else if (k === 'down') {
      aim += Number(v);
    } else {
      aim -= Number(v);
    }
  }
  return horizontal * depth;
}

export function parseInput(input) {
  return input.split('\n').map((item) => item.split(' '));
}
