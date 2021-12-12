function isUpper(char) {
  return char >= 'A' && char <= 'Z';
}

export function solution1(inputs) {
  // Find all nodes
  const set = new Set();
  for (const [left, right] of inputs) {
    set.add(left);
    set.add(right);
  }
  // Create nodes
  const nodes = Object.fromEntries([...set].map((node) => [node, {}]));
  // Build links
  for (const [left, right] of inputs) {
    nodes[left][right] = nodes[right];
    nodes[right][left] = nodes[left];
  }
  // Traverse
  let count = 0;
  function traverse(id, visited = { start: true }) {
    if (id === 'end') {
      count++;
    } else {
      const node = nodes[id];
      for (const link in node) {
        if (!visited[link]) {
          const copy = {
            ...visited,
          };
          if (!isUpper(link) || link === 'start') {
            copy[link] = true;
          }
          traverse(link, copy);
        }
      }
    }
  }

  traverse('start');

  return count;
}

export function solution2(inputs) {
  // Find all nodes
  const set = new Set();
  for (const [left, right] of inputs) {
    set.add(left);
    set.add(right);
  }
  // Create nodes
  const nodes = Object.fromEntries([...set].map((node) => [node, {}]));
  // Build links
  for (const [left, right] of inputs) {
    nodes[left][right] = nodes[right];
    nodes[right][left] = nodes[left];
  }
  // Traverse
  let count = 0;
  function traverse(id, visited = { start: true }, visitOnce = { value: true }) {
    if (id === 'end') {
      count++;
    } else {
      const node = nodes[id];
      for (const link in node) {
        if (!visited[link] || (!isUpper(link) && link !== 'start' && visitOnce.value)) {
          const copy = {
            ...visited,
          };
          const flag = {
            ...visitOnce,
          };
          if (!isUpper(link) || link === 'start') {
            if (link !== 'start') {
              if (flag.value && visited[link]) {
                flag.value = false;
              } else {
                copy[link] = true;
              }
            } else {
              copy[link] = true;
            }
          }
          traverse(link, copy, flag);
        }
      }
    }
  }

  traverse('start');

  return count;
}

export function parseInputs(input) {
  return input.split('\n').map((item) => item.split('-'));
}
