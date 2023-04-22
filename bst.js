class Node {
  constructor(left, data, right) {
    this.left = left;
    this.data = data;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = buildTree(arr);
  }

  insert(value) {
    if (this.root === null) {
      this.root = buildTree([value]);
    } else {
      if (value != this.root.data) {
        if (value < this.root.data) {
          this.root.left = buildTree([value]);
        } else {
          this.root.right = buildTree([value]);
        }
      } else {
        console.log('equal');
      }
    }
  }
}

function mergeSorter(arr) {
  // sort 2 arrays into 1
  const sorter = (arr1, arr2, sorted = []) => {
    if (arr1.length === 0 || arr2.length === 0) {
      if (arr1.length === 0) {
        sorted = [...sorted, ...arr2];
      } else if (arr2.length === 0) {
        sorted = [...sorted, ...arr1];
      }
      return sorted;
    } else {
      if (arr1[0] <= arr2[0]) {
        sorted.push(arr1[0]);
        arr1.shift();
      }
      if (arr1[0] > arr2[0]) {
        sorted.push(arr2[0]);
        arr2.shift();
      }
      return sorter(arr1, arr2, sorted);
    }
  };

  const mergeSort = (arr) => {
    if (arr.length <= 2) {
      return arr.sort((a, b) => a - b);
    } else {
      return sorter(
        mergeSort(arr.slice(0, Math.floor(arr.length / 2))),
        mergeSort(arr.slice(Math.floor(arr.length / 2)))
      );
    }
  };

  return mergeSort(arr);
}

function removeDuplicatesArr(inp, counter = 0, arr = []) {
  if (counter >= inp.length - 1) {
    if (!arr.includes(inp[counter])) arr.push(inp[counter]);
    return arr;
  } else {
    if (!arr.includes(inp[counter])) arr.push(inp[counter]);
    return removeDuplicatesArr(inp, counter + 1, arr);
  }
}

function buildTree(arr) {
  if (arr.length === 0) return null;
  let sorted = mergeSorter(arr);
  let removedDup = removeDuplicatesArr(sorted);

  let middleIndex = Math.floor((removedDup.length - 1) / 2);
  let left = removedDup.slice(0, middleIndex);
  let right = removedDup.slice(middleIndex + 1);
  let middle = removedDup[middleIndex];

  return new Node(buildTree(left), middle, buildTree(right));
}
let nTree = new Tree([5]);
nTree.insert(5);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
prettyPrint(nTree.root);

/**
 * might create find() first
 *
 * start with insert()
 *  if value already in there, don't insert
 *  it's always gonna be a leaf, cause no duplicates
 *  testing:
 *    *must be backwards compatible(arr0,arr1)
 *    i can start with empty array and just insert all numbers
 *    do 2 values in arr, insert 1.
 *        number higher than value, then less
 *      then 5 values in arr, insert 1.
 *        number higher than value, then less
 *      etc. till it works for good
 * then do del()
 *  no rebalancing, leave as is
 *  count # of children
 *  if it's a leaf, you could just delete it
 *    set full node to = null
 *  if it has one child,
 *    point the father to the one child
 *      set father's (left or right) = child's node
 *  if it has 2 children,
 *    find next biggest number in over all tree
 *    remove it and replace
 *    might have to do some recursion here
 *
 * build rest of functions inside of Tree class
 */
