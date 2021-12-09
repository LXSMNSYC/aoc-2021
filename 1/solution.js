export function solution1(list) {
  let c = 0;
  for (let i = 1, len = list.length; i < len; i++) {
    c += (list[i] > list[i - 1]) ? 1 : 0;
  }
  return c;
}

export function solution2(list) {
  let c = 0;
  for (let i = 0, len = list.length; i < len - 3; i++) {
    const a = list[i] + list[i + 1] + list[i + 2];
    const b = list[i + 1] + list[i + 2] + list[i + 3];
    c += (b > a) ? 1 : 0;
  }
  return c;
}

export function parseInputs(input) {
  return input.split('\n').map((item) => Number(item));
}
