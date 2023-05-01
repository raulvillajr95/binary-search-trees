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
          if (turns[turns.length - 1] === 'left') {
            nodeChecking[nodeChecking.length - 2].left = null;
          } else if (turns[turns.length - 1] === 'right') {
            nodeChecking[nodeChecking.length - 2].right = null;
          } else if (turns.length === 0) {
            this.root = null;
          }
        } else if (childrenCount === 1) {
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
          let deletionNode = this.find(value);
          let queue = [deletionNode, deletionNode.right];
          let directions = ['right'];
          let nextHighestNode;
          while (queue[queue.length - 1].left != null) {
            queue.push(queue[queue.length - 1].left);
            directions.push('left');
          }

          nextHighestNode = queue[queue.length - 1];
          deletionNode.data = nextHighestNode.data;
          let parentOfNextHighestNode = queue[queue.length - 2];
          let lastDirection = directions[directions.length - 1];

          if (nextHighestNode.right === null) {
            parentOfNextHighestNode[lastDirection] = null;
          } else {
            let rightChild = nextHighestNode.right;
            parentOfNextHighestNode[lastDirection] = rightChild;
          }
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

  levelOrder(func) {
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

  inorder(func, root = this.root) {
    // lnr (left, data, right)
    if (root == null) return;
    this.inorder(func, root.left);
    func(root);
    this.inorder(func, root.right);
  }

  preorder(func, root = this.root) {
    // nlr (data, left, right)
    if (root === null) return;
    func(root);
    this.preorder(func, root.left);
    this.preorder(func, root.right);
  }

  postorder(func, root = this.root) {
    // lrn (left, right, data)
    if (root === null) return;
    this.postorder(func, root.left);
    this.postorder(func, root.right);
    func(root);
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

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    let leftTreeHeight = this.height(root.left);
    let rightTreeHeight = this.height(root.right);

    if (Math.abs(leftTreeHeight - rightTreeHeight) > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    let newArr = [];
    this.levelOrder((e) => {
      newArr.push(e.data);
    });
    this.arr = newArr;
    this.root = buildTree(this.arr);
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
  for (let i = 0; i < randomNumberInRange(10, 50); i++) {
    arr.push(Math.round(randomNumberInRange(1, 100)));
  }
  return arr;
}

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
let nTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
// prettyPrint(nTree.root);

function driverScript() {
  // 1
  let randomArr = randomNodesArr();
  let tree1 = new Tree(randomArr);

  // 2
  console.log(tree1.isBalanced());

  // 3
  let arrLevel = [];
  tree1.levelOrder((e) => {
    arrLevel.push(e.data);
  });
  console.log(arrLevel);
  let arrPre = [];
  tree1.preorder((e) => {
    arrPre.push(e.data);
  });
  console.log(arrPre);
  let arrPost = [];
  tree1.postorder((e) => {
    arrPost.push(e.data);
  });
  console.log(arrPost);
  let arrIn = [];
  tree1.inorder((e) => {
    arrIn.push(e.data);
  });
  console.log(arrIn);

  // 4
  for (let i = 101; i <= 201; i++) {
    tree1.insert(i);
  }

  // 5
  console.log(tree1.isBalanced());

  // 6
  tree1.rebalance();

  // 7
  console.log(tree1.isBalanced());

  // 8
  let arrLevel2 = [];
  tree1.levelOrder((e) => {
    arrLevel2.push(e.data);
  });
  console.log(arrLevel2);
  let arrPre2 = [];
  tree1.preorder((e) => {
    arrPre2.push(e.data);
  });
  console.log(arrPre2);
  let arrPost2 = [];
  tree1.postorder((e) => {
    arrPost2.push(e.data);
  });
  console.log(arrPost2);
  let arrIn2 = [];
  tree1.inorder((e) => {
    arrIn2.push(e.data);
  });
  console.log(arrIn2);

  prettyPrint(tree1.root);
}
// driverScript();

// for (let i = 0; i < 10; i++) {
//   let randomArR = randomNodesArr();
//   let nTree = new Tree(randomArR);

//   console.log(nTree.isBalanced());

//   prettyPrint(nTree.root);
// }

/**
 * work on 'Tie it all together'
 *
 *
 * Assignments left = []
 * tie it all together = []
 *
 * ideas:
 */
