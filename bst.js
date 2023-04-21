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
let nTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.log(nTree.root);

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
 * start with insert()
 *  if value already in there, don't insert
 *  testing:
 *    i can start with empty array and just insert all numbers
 *    i can start with 0, insert 1.
 *      then 1 value in arr, insert 1.
 *        number higher than value, then less
 *      then 2 values in arr, insert 1.
 *        number higher than value, then less
 *      then 5 values in arr, insert 1.
 *        number higher than value, then less
 *      etc. till it works for good
 * then do del()
 *
 * build rest of functions inside of Tree class
 */
