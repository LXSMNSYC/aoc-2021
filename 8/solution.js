// Solution 1
export function solution1(arr) {
  const keys = [2, 4, 3, 7];
  let size = 0;
  for (const [, l] of arr) {
    for (const i of l) {
      if (keys.includes(i.length)) {
        size++;
      }
    }
  }
  return size;
}

// Solution 2
function generateMap(keys) {
  const plot = {};
  for (const k of keys) {
    for (const s of k.split('')) {
      plot[s] = (plot[s] || 0) + 1;
    }
  }
  const map = {};
  for (const k in plot) {
    switch (plot[k]) {
      case 4: // e
        map.e = k;
        break;
      case 6: // b
        map.b = k;
        break;
      case 9: // f
        map.f = k;
        break;
    }
  }

  const nums = {};
  function setnum(k, v) {
    nums[k.split('').sort().join('')] = v;
  }
  // Map 1
  for (const k of keys) {
    if (k.length === 2) {
      setnum(k, 1);
      const [l, r] = k;
      if (map.f === l) {
        map.c = r;
      } else {
        map.c = l;
      }
      break;
    }
  }
  // Map 7
  for (const k of keys) {
    if (k.length === 3) {
      setnum(k, 7);
      const [a, b, c] = k;
      if (map.f === a && map.c === b) {
        map.a = c;
      }
      if (map.f === b && map.c === a) {
        map.a = c;
      }
      if (map.f === b && map.c === c) {
        map.a = a;
      }
      if (map.f === c && map.c === b) {
        map.a = a;
      }
      if (map.f === a && map.c === c) {
        map.a = b;
      }
      if (map.f === c && map.c === a) {
        map.a = b;
      }
      break;
    }
  }
  for (const k of keys) {
    if (k.length === 4) { // 4
      setnum(k, 4);
    } else if (k.length === 7) { // 8
      setnum(k, 8);
    } else if (k.length === 5) { // 2, 3, 5
      if (k.includes(map.f) && k.includes(map.b)) {
        setnum(k, 5);
      } else if (k.includes(map.e)) {
        setnum(k, 2);
      } else {
        setnum(k, 3);
      }
    } else if (k.length === 6) { // 0, 6, 9
      if (!k.includes(map.c)) {
        setnum(k, 6);
      } else if (!k.includes(map.e)) {
        setnum(k, 9);
      } else {
        setnum(k, 0);
      }
    }
  }
  return nums;
}

function decode(keys, output) {
  const map = generateMap(keys);
  let s = '';
  for (const k of output) {
    s += map[k.split('').sort().join('')].toString();
  }
  return Number(s);
}

export function solution2(arr) {
  let sum = 0;
  for (const [a, b] of arr) {
    sum += decode(a, b);
  }
  return sum;
}

export function parseInputs(input) {
  return input.split('\n')
    .map((row) => row.split(' | ').map((item) => item.split(' ')));
}
