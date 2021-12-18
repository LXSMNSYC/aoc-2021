export function parseInputs(input) {
  return input.split('\n')
    .map((item) => JSON.parse(item));
}

function serialize(tree) {
  if (typeof tree === 'object') {
    return [serialize(tree.left), serialize(tree.right)];
  }
  return tree;
}

function inputToTree([left, right], parent = null, depth = 0) {
  const value = {
    parent,
    depth,
  };
  value.left = Array.isArray(left) ? inputToTree(left, value, depth + 1) : left;
  value.right = Array.isArray(right) ? inputToTree(right, value, depth + 1) : right;
  return value;
}

function checkForSplitOrExplode(node, isExplode) {
  if (isExplode) {
    if (node.depth >= 4) {
      return {
        type: 'explode',
        node,
      };
    }

    const leftResult = typeof node.left === 'object'
      ? checkForSplitOrExplode(node.left, isExplode)
      : null;
    const rightResult = typeof node.right === 'object'
      ? checkForSplitOrExplode(node.right, isExplode)
      : null;
    return leftResult || rightResult;
  }
  if (typeof node.left === 'number' && node.left >= 10) {
    return {
      type: 'split',
      direction: 'left',
      node,
    };
  }
  if (typeof node.left === 'object') {
    const result = checkForSplitOrExplode(node.left, isExplode);
    if (result) {
      return result;
    }
  }
  if (typeof node.right === 'number' && node.right >= 10) {
    return {
      type: 'split',
      direction: 'right',
      node,
    };
  }

  return typeof node.right === 'object'
    ? checkForSplitOrExplode(node.right, isExplode)
    : null;
}

function splitNode(node, direction) {
  if (typeof node[direction] === 'number' && node[direction] >= 10) {
    const value = node[direction];
    node[direction] = {
      parent: node,
      depth: node.depth + 1,
      left: Math.floor(value / 2),
      right: Math.ceil(value / 2),
    };
  }
}

function findNearest(node, direction) {
  if (typeof node[direction] === 'object') {
    return findNearest(node[direction], direction);
  }
  return {
    node,
    side: direction,
  };
}

function explodeNearest(node, direction) {
  if (node.parent) {
    if (direction === 'left') {
      if (node.parent.left === node) {
        return explodeNearest(node.parent, 'left');
      }
      // Node is on the right side
      if (typeof node.parent.left === 'number') {
        return {
          node: node.parent,
          side: 'left',
        };
      }
      return findNearest(node.parent.left, 'right');
    }
    if (node.parent.right === node) {
      return explodeNearest(node.parent, 'right');
    }
    // Node is on the left side
    if (typeof node.parent.right === 'number') {
      return {
        node: node.parent,
        side: 'right',
      };
    }
    return findNearest(node.parent.right, 'left');
  }
  return null;
}

function explodeNode(node) {
  // Node might be in the depth of 4, however there can
  // be nodes inside of it
  if (typeof node.left === 'object') {
    explodeNode(node.left);
  } else if (typeof node.right === 'object') {
    explodeNode(node.right);
  } else {
    // Reset the value
    const leftAncestor = explodeNearest(node, 'left');
    const rightAncestor = explodeNearest(node, 'right');
    if (leftAncestor) {
      leftAncestor.node[leftAncestor.side] += node.left;
    }
    if (rightAncestor) {
      rightAncestor.node[rightAncestor.side] += node.right;
    }
    if (node.parent.left === node) {
      node.parent.left = 0;
    }
    if (node.parent.right === node) {
      node.parent.right = 0;
    }
  }
}

function magnitude(tree) {
  if (typeof tree === 'number') {
    return tree;
  }
  return 3 * magnitude(tree[0]) + 2 * magnitude(tree[1]);
}

function solve(inputs) {
  const tree = inputToTree(inputs);
  // Traverse tree

  // console.log('Start:', JSON.stringify(serialize(tree)));
  while (true) {
    const explodeResult = checkForSplitOrExplode(tree, true);

    if (explodeResult && explodeResult.type === 'explode') {
      explodeNode(explodeResult.node);
      // console.log('After explode:', JSON.stringify(serialize(tree)));
      continue;
    }
    const splitResult = checkForSplitOrExplode(tree, false);
    if (splitResult && splitResult.type === 'split') {
      splitNode(splitResult.node, splitResult.direction);
      // console.log('After split:', JSON.stringify(serialize(tree)));
    }

    if (!explodeResult && !splitResult) {
      break;
    }
  }

  // console.log('End:', JSON.stringify(serialize(tree)));
  return serialize(tree);
}

export function solution1(inputs) {
  let prev = inputs[0];
  for (let i = 1, len = inputs.length; i < len; i++) {
    prev = solve([prev, inputs[i]]);
  }
  const result = solve(prev);
  return magnitude(result);
}

export function solution2(inputs) {
  let max = 0;
  const len = inputs.length;
  for (let i = 0; i < len; i++) {
    for (let k = 0; k < len; k++) {
      const a = inputs[i];
      const b = inputs[k];
      if (a !== b) {
        const xy = magnitude(solve([a, b]));
        const yx = magnitude(solve([b, a]));
        const result = Math.max(xy, yx);
        if (result > max) {
          max = result;
        }
      }
    }
  }
  return max;
}
