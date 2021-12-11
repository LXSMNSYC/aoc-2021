const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completion = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const closing = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export function solution1(lines) {
  let sum = 0;
  for (const line of lines) {
    const stack = [];
    for (let i = 0, len = line.length; i < len; i++) {
      if (/\{|\(|\[|</.test(line[i])) {
        stack.push(line[i]);
      }
      if (/\}|\)|\]|>/.test(line[i])) {
        const top = stack.pop();
        if (closing[top] !== line[i]) {
          sum += scores[line[i]];
          break;
        }
      }
    }
  }
  return sum;
}

export function solution2(lines) {
  const scores = [];
  for (const line of lines) {
    const stack = [];
    let corrupted = false;
    for (let i = 0, len = line.length; i < len; i++) {
      if (/\{|\(|\[|</.test(line[i])) {
        stack.push(line[i]);
      }
      if (/\}|\)|\]|>/.test(line[i])) {
        const top = stack.pop();
        if (closing[top] !== line[i]) {
          corrupted = true;
          break;
        }
      }
    }
    if (!corrupted) {
      let product = 0;
      for (const char of stack.reverse()) {
        product = (product * 5) + completion[closing[char]];
      }
      scores.push(product);
    }
  }
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

export function parseInputs(input) {
  return input.split('\n');
}
