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
    if (this.find(value) === null) return null;
    let isValue = false;
    let nodeChecking = [this.root];
    let childrenCount = 0;
    let leftCount;
    let rightCount;
    let turns = [];
    while (true) {
      if (nodeChecking === null) {
        break;
      } else if (value < nodeChecking[nodeChecking.length - 1].data) {
        nodeChecking.push(nodeChecking[nodeChecking.length - 1].left);
        turns.push('left');
      } else if (value > nodeChecking[nodeChecking.length - 1].data) {
        nodeChecking.push(nodeChecking[nodeChecking.length - 1].right);
        turns.push('right');
      } else if (nodeChecking[nodeChecking.length - 1].data === value) {
        isValue = true;
        leftCount = nodeChecking[nodeChecking.length - 1].left === null ? 0 : 1;
        rightCount =
          nodeChecking[nodeChecking.length - 1].right === null ? 0 : 1;
        childrenCount += leftCount + rightCount;

        // impletmentation for each type of children
        if (childrenCount === 0) {
          console.log(0);
          if (turns[turns.length - 1] === 'left') {
            nodeChecking[nodeChecking.length - 2].left = null;
          } else if (turns[turns.length - 1] === 'right') {
            nodeChecking[nodeChecking.length - 2].right = null;
          } else if (turns.length === 0) {
            this.root = null;
          }
        } else if (childrenCount === 1) {
          console.log(1);
          let deletionNode = nodeChecking[nodeChecking.length - 1];
          let parentNode = nodeChecking[nodeChecking.length - 2];
          let childNode;
          let parentToDelDirection = turns[turns.length - 1];
          if (deletionNode.right === null) {
            childNode = deletionNode['left'];
          } else if (deletionNode.left === null) {
            childNode = deletionNode['right'];
          }
          parentNode[parentToDelDirection] = childNode;
        } else if (childrenCount === 2) {
          console.log(2);
          /**
           * get right tree
           * go all the way left
           */

          let deletionNode = nodeChecking[nodeChecking.length - 1];
          let queue = [deletionNode.right];
          // let rightNode = deletionNode.right;
          // let leftNode = rightNode.left;
          // let
          while (true) {
            if (queue[queue.length - 1].left === null) {
              break;
            }
            queue.push(queue[queue.length - 1].left);
          }
          console.log(deletionNode, 'deletionNode');
          // console.log(rightNode, 'rightNode');
          console.log(queue[queue.length - 1], 'leftNode');
          console.log(queue, 'queue');
        }

        break;
      }
    }

    return childrenCount;
  }

  find(value) {
    let nodeChecking = this.root;
    while (true) {
      if (nodeChecking === null) {
        break;
      } else if (value < nodeChecking.data) {
        nodeChecking = nodeChecking.left;
      } else if (value > nodeChecking.data) {
        nodeChecking = nodeChecking.right;
      } else if (nodeChecking.data === value) {
        break;
      }
    }

    return nodeChecking;
  }

  leverOrder(func) {
    let fullArr = [];
    let queue = [this.root];
    function enqueueChildren(node) {
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    while (queue.length !== 0) {
      enqueueChildren(queue[0]);
      fullArr.push(func(queue.shift()));
    }
  }

  height(node) {
    let nodeChecking = node;
    let heightCount = 0;
    while (true) {
      if (nodeChecking === null) {
        break;
      } else {
        nodeChecking = nodeChecking.right;
        heightCount += 1;
      }
    }

    return heightCount - 1;
  }

  depth(node) {
    if (node === null) return null;
    node = node.data;
    let nodeChecking = this.root;
    let depthCount = 0;
    while (true) {
      if (nodeChecking === null) {
        break;
      } else if (node < nodeChecking.data) {
        nodeChecking = nodeChecking.left;
        depthCount += 1;
      } else if (node > nodeChecking.data) {
        nodeChecking = nodeChecking.right;
        depthCount += 1;
      } else if (nodeChecking.data === node) {
        break;
      }
    }

    return depthCount;
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

function randomNumberInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function randomNodesArr() {
  let arr = [];
  for (let i = 0; i < randomNumberInRange(10, 100); i++) {
    arr.push(Math.round(randomNumberInRange(1, 100)));
  }
  return arr;
}
let nTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
// let nTree = new Tree(randomNodesArr());

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
nTree.del(8);
// prettyPrint(nTree.root);

/**
 * 1. is the value there? true/false[done]
 * 2. how many children? 0, 1, or 2[done]
 * 3. implement for 0 children[done]
 * 4. implement for 1 child[done]
 * 5. implement for 2 children
 *
 * work on inorder()
 * start with small tree [1,2,3]
 * then [1,2,3,4,5,6,7]
 * then up to 15, etc.
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
 *
 * Assignments left = [4,7,10,11]
 * tie it all together = [1,2,3,4,5,6,7,8]
 */

// Testing, getting the father
// let childObj = { left: null, data: 6, right: null };
// let rootObj = { left: childObj, data: 8, right: 9 };
// console.log(childObj);
// console.log(this.parent, 'test test');
