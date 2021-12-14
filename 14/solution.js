export function parseInputs(input) {
  const [seed, sequence] = input.split('\n\n');
  return [
    seed,
    sequence.split('\n')
      .map((row) => (
        row.split(' -> ')
      )),
  ];
}

function solution([seed, sequence], count) {
  let pairs = {};
  const rules = {};
  for (const [pattern, insertion] of sequence) {
    rules[pattern] = insertion;
  }
  for (let x = 1, len = seed.length; x < len; x++) {
    const pair = seed[x - 1] + seed[x];
    pairs[pair] = (pairs[pair] || 0) + 1;
  }
  for (let i = 0; i < count; i++) {
    const newPairs = {};
    for (const pair in pairs) {
      const value = pairs[pair];
      if (pair in rules) {
        const [left, right] = pair;
        const insertion = rules[pair];
        newPairs[left + insertion] = (newPairs[left + insertion] || 0) + value;
        newPairs[insertion + right] = (newPairs[insertion + right] || 0) + value;
      }
    }
    pairs = newPairs;
  }
  const counts = {};
  for (const pair in pairs) {
    counts[pair[0]] = (counts[pair[0]] || 0) + pairs[pair];
    counts[pair[1]] = (counts[pair[1]] || 0) + pairs[pair];
  }

  const values = Object.values(counts);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return Math.ceil(max / 2) - Math.ceil(min / 2);
}

export function solution1(inputs) {
  return solution(inputs, 10);
}

export function solution2(inputs) {
  return solution(inputs, 40);
}
