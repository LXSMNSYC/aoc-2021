function checkBingo(item) {
  // check rows
  for (let i = 0; i < 5; i++) {
    let rowCheck = true;
    let colCheck = true;
    for (let k = 0; k < 5; k++) {
      rowCheck = rowCheck && item[i][k] == null;
      colCheck = colCheck && item[k][i] == null;
    }
    if (rowCheck || colCheck) {
      return true;
    }
  }
  return false;
}

function sumBingo(card, seq) {
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    for (let k = 0; k < 5; k++) {
      if (card[k][i] != null) {
        sum += Number(card[k][i]);
      }
    }
  }
  return sum * seq;
}

function markBingo(card, seq) {
  for (let i = 0; i < 5; i++) {
    for (let k = 0; k < 5; k++) {
      if (card[k][i] === seq) {
        card[k][i] = undefined;
      }
    }
  }
}

export function solution1(arr, seq) {
  const clone = JSON.parse(JSON.stringify(arr));
  for (let i = 0, len = seq.length; i < len; i++) {
    for (let c = 0, clen = arr.length; c < clen; c++) {
      markBingo(clone[c], seq[i]);
      if (checkBingo(clone[c])) {
        return sumBingo(clone[c], seq[i]);
      }
    }
  }
  return undefined;
}

export function solution2(arr, seq) {
  const clone = JSON.parse(JSON.stringify(arr));
  let final = 0;
  const won = [];
  for (let i = 0, len = seq.length; i < len; i++) {
    for (let c = 0, clen = arr.length; c < clen; c++) {
      if (!won[c]) {
        markBingo(clone[c], seq[i]);
        if (checkBingo(clone[c])) {
          won[c] = true;
          final = sumBingo(clone[c], seq[i]);
        }
      }
    }
  }
  return final;
}

export function parseInputs(input) {
  const [sequence, ...cards] = input.split('\n\n');
  return [
    cards.map((card) => card.split('\n').map((row) => row.split(/\s+/).filter(Boolean))),
    sequence.split(','),
  ];
}
