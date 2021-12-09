export function solution1(arr) {
  const zero = [];
  const ones = [];
  for (const v of arr) {
    for (let i = 0, len = v.length; i < len; i++) {
      if (v[i] === '0') {
        zero[i] = (zero[i] || 0) + 1;
      } else {
        ones[i] = (ones[i] || 0) + 1;
      }
    }
  }
  let most = '0b';
  let least = '0b';
  for (let i = 0, len = zero.length; i < len; i++) {
    if (zero[i] < ones[i]) {
      most += '1';
      least += '0';
    } else {
      most += '0';
      least += '1';
    }
  }
  return Number(most) * Number(least);
}

function find(arr, index, reverse = false) {
  if (arr.length === 1) {
    return arr[0];
  }
  if (arr[0].length <= index) {
    return arr[0];
  }
  let zero = 0;
  let ones = 0;
  for (const v of arr) {
    if (v[index] === '0') {
      zero++;
    } else {
      ones++;
    }
  }
  if (reverse) {
    if (zero <= ones) {
      return find(arr.filter((v) => v[index] === '0'), index + 1, reverse);
    }
    return find(arr.filter((v) => v[index] === '1'), index + 1, reverse);
  }
  if (zero <= ones) {
    return find(arr.filter((v) => v[index] === '1'), index + 1, reverse);
  }
  return find(arr.filter((v) => v[index] === '0'), index + 1, reverse);
}

export function solution2(arr) {
  return Number(`0b${find(arr, 0)}`) * Number(`0b${find(arr, 0, true)}`);
}

export function parseInput(input) {
  return input.split('\n');
}
