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
    let isNull = false;
    let nodeChecking = this.root;
    if (this.root === null) {
      this.root;
    }
    while (isNull === false) {
      if (this.root === null) {
        isNull = true;
        this.root = new Node(null, value, null);
      } else if (value < nodeChecking.data && nodeChecking.left === null) {
        isNull = true;
        nodeChecking.left = new Node(null, value, null);
      } else if (value > nodeChecking.data && nodeChecking.right === null) {
        isNull = true;
        nodeChecking.right = new Node(null, value, null);
      } else if (value < nodeChecking.data) {
        nodeChecking = nodeChecking.left;
      } else if (value > nodeChecking.data) {
        nodeChecking = nodeChecking.right;
      } else {
        isNull = true;
      }
    }
  }

  del(value) {
    let isValue = false;
    let nodeChecking = this.root;
    let childrenCount = 0;
    while (true) {
      if (nodeChecking === null) {
        break;
      } else if (value < nodeChecking.data) {
        nodeChecking = nodeChecking.left;
      } else if (value > nodeChecking.data) {
        nodeChecking = nodeChecking.right;
      } else if (nodeChecking.data === value) {
        isValue = true;
        let leftCount = nodeChecking.left === null ? 0 : 1;
        let rightCount = nodeChecking.right === null ? 0 : 1;
        childrenCount += leftCount + rightCount;
        break;
      }
    }

    return childrenCount;
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
let nTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
console.log(nTree.del(8));

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
 * 1. is the value there? true/false[done]
 * 2. how many children? 0, 1, or 2
 * 3. implement for 0 children
 * 4. implement for 1 child
 * 5. implement for 2 children
 *
 * do del()
 *  no rebalancing, leave as is
 * first just find the node
 *  if I reach null, node isn't there, exit
 * once found calculate children
 *  if children == 0
 *    just delete, go to father and set to null
 *  if children == 1
 *    point father's (left or right) = child's node
 *  if children == 2
 *    find next biggest number in over all tree, remove it and replace
 */
