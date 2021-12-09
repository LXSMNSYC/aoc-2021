function solution(items, days) {
  let size = items.length;
  const arr = [];
  for (let i = 0, len = items.length; i < len; i++) {
    const item = items[i];
    arr[item] = (arr[item] || 0) + 1;
  }
  for (let i = 0; i < days; i++) {
    const count = (arr[i] || 0);
    size += count;
    // 7 days from now a fish would spawn
    arr[i + 7] = (arr[i + 7] || 0) + count;
    // 9 days from now juveniles would be allowed to spawn
    arr[i + 9] = (arr[i + 9] || 0) + count;
  }
  return size;
}

export function solution1(items) {
  return solution(items, 80);
}
export function solution2(items) {
  return solution(items, 256);
}

export function parseInputs(input) {
  return input.split(',').map((item) => Number(item));
}
