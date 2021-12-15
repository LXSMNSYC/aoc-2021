const { astar, Graph } = require('javascript-astar');

function parseInputs1(input) {
  return input.split('\n')
    .map((row) => row.split('').map((item) => Number(item)));
}
function parseInputs2(input) {
  const base = input.split('\n')
    .map((row) => row.split('').map((item) => Number(item)));

  const clones = [
    base,
  ];

  for (let i = 1; i < 9; i++) {
    const clone = JSON.parse(JSON.stringify(base));
    for (let y = 0, ylen = clone.length; y < ylen; y++) {
      for (let x = 0, xlen = clone[y].length; x < xlen; x++) {
        const sum = clone[y][x] + i;
        clone[y][x] = sum > 9 ? sum % 9 : sum;
      }
    }
    clones.push(clone);
  }

  const widerMap = [];

  for (let y = 0; y < 5; y++) {
    widerMap[y] = [];
    for (let x = 0; x < 5; x++) {
      widerMap[y][x] = JSON.parse(JSON.stringify(clones[x + y]));
    }
  }

  const normalMap = [];
  // Normalize rows
  for (let y = 0; y < 5; y++) {
    const row = widerMap[y];

    const maxY = base.length;
    for (let ky = 0; ky < maxY; ky++) {
      let dataRow = [];
      for (let x = 0; x < 5; x++) {
        const map = row[x][ky];
        dataRow = [...dataRow, ...map];
      }
      normalMap.push(dataRow);
    }
  }
  return normalMap;
}

function solution(inputs) {
  const graph = new Graph(inputs);
  const start = graph.grid[0][0];
  const maxY = inputs.length - 1;
  const maxX = inputs[maxY].length - 1;
  const end = graph.grid[maxY][maxX];
  return astar.search(graph, start, end).reduce((acc, item) => item.weight + acc, 0);
}

export function solution1(input) {
  return solution(parseInputs1(input));
}
export function solution2(input) {
  return solution(parseInputs2(input));
}
