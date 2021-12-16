const bitmap = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

class Stream {
  constructor(bits) {
    this.bits = bits;
  }

  read(size) {
    const value = this.bits.substring(0, size);
    this.bits = this.bits.substring(size);
    return value;
  }

  more() {
    return this.bits.length > 0;
  }
}

function solvePacket(bits) {
  const packetVersion = bits.read(3);
  const packetType = bits.read(3);
  if (packetType === '100') {
    // Literal packet
    const subBits = [];
    while (true) {
      const currentBits = bits.read(5);
      subBits.push(currentBits.substring(1));
      if (currentBits[0] === '0') {
        break;
      }
    }
    return {
      version: Number(`0b${packetVersion}`),
      type: packetType,
      bits: subBits,
    };
  }
  const lengthType = bits.read(1);
  if (lengthType === '0') {
    const length = bits.read(15);
    const subPackets = bits.read(Number(`0b${length}`));
    const subStream = new Stream(subPackets);
    const children = [];
    while (subStream.more()) {
      children.push(solvePacket(subStream));
    }
    return {
      version: Number(`0b${packetVersion}`),
      type: packetType,
      packets: children,
    };
  }
  const length = bits.read(11);
  const actualLength = Number(`0b${length}`);
  const children = [];

  for (let i = 0; i < actualLength; i++) {
    children.push(solvePacket(bits));
  }

  return {
    version: Number(`0b${packetVersion}`),
    type: packetType,
    packets: children,
  };
}

function traverse1(tree) {
  if (tree.type !== '100') {
    let sum = tree.version;
    for (const packet of tree.packets) {
      sum += traverse1(packet);
    }
    return sum;
  }
  return tree.version;
}

export function solution1(input) {
  let encodedBits = '';
  for (let i = 0, len = input.length; i < len; i++) {
    encodedBits += bitmap[input[i]];
  }
  const tree = solvePacket(new Stream(encodedBits));
  return traverse1(tree);
}

function traverse2(tree) {
  if (tree.type === '100') {
    let concatBits = '';
    for (const bit of tree.bits) {
      concatBits += bit;
    }
    const decodedValue = Number(`0b${concatBits}`);
    return decodedValue;
  }
  if (tree.type === '000') {
    let sum = 0;
    for (const packet of tree.packets) {
      sum += traverse2(packet);
    }
    return sum;
  }
  if (tree.type === '001') {
    let product = 1;
    for (const packet of tree.packets) {
      product *= traverse2(packet);
    }
    return product;
  }
  if (tree.type === '010') {
    let minimum = Number.MAX_SAFE_INTEGER;
    for (const packet of tree.packets) {
      const value = traverse2(packet);
      if (value < minimum) {
        minimum = value;
      }
    }
    return minimum;
  }
  if (tree.type === '011') {
    let maximum = 0;
    for (const packet of tree.packets) {
      const value = traverse2(packet);
      if (value > maximum) {
        maximum = value;
      }
    }
    return maximum;
  }
  const left = traverse2(tree.packets[0]);
  const right = traverse2(tree.packets[1]);
  if (tree.type === '101') {
    return (left > right) ? 1 : 0;
  }
  if (tree.type === '110') {
    return (left < right) ? 1 : 0;
  }
  return (left === right) ? 1 : 0;
}

export function solution2(input) {
  let encodedBits = '';
  for (let i = 0, len = input.length; i < len; i++) {
    encodedBits += bitmap[input[i]];
  }
  const tree = solvePacket(new Stream(encodedBits));
  return traverse2(tree);
}
