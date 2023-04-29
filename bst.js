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

  inorder(func) {
    // lnr (left, data, right)
    if (this.root === null) return null;

    /**
     * left until null
     * up 1
     *   if has right
     *     if has left
     *       left until null
     *
     * grab number of times visited
     * if visited 2 times add to an array
     */
  }

  preorder(func) {
    // nlr (data, left, right)
    if (this.root === null) return null;
    let fullArr = [];

    let stack = [];
    let nodeOn = this.root;

    function visitNode() {
      fullArr.push(nodeOn.data);
      stack.push(nodeOn);
    }
    function visitLeft() {
      if (nodeOn.left !== null) {
        nodeOn = nodeOn.left;
      }
    }
    function visitRight() {
      if (nodeOn.right !== null) {
        nodeOn = nodeOn.right;
      }
    }
    function goUp() {
      stack.pop();
      nodeOn = stack[stack.length - 1];
    }

    visitNode();
    visitLeft();
    visitNode();
    visitLeft();
    visitRight();
    goUp();
    visitRight();
    visitNode();
    visitLeft();
    visitRight();
    goUp();

    console.log(nodeOn, 'nodeOn');
    console.log(stack, 'stack');
    console.log(fullArr, 'fullArr');
  }

  postorder(func) {
    // lrn (left, right, data)
    if (this.root === null) return null;

    let stack = [this.root];

    while (stack[stack.length - 1].left !== null) {
      stack.push(stack[stack.length - 1].left);
    }

    console.log(stack);
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

  isBalanced() {
    /**
     * ideas:
     */
    let lvlArr = [];
    nTree.levelOrder((e) => {
      lvlArr.push(nTree.height(e));
    });
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
  for (let i = 0; i < randomNumberInRange(10, 100); i++) {
    arr.push(Math.round(randomNumberInRange(1, 100)));
  }
  return arr;
}
let nTree = new Tree([1, 2, 3]);

// nTree.preorder();
// nTree.inorder();
nTree.postorder();
// let randomArR = randomNodesArr();
// let nTree = new Tree(randomArR);

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

// for (let i = 0; i < 10; i++) {
//   let randomArR = randomNodesArr();
//   let nTree = new Tree(randomArR);

//   let arr = [];
//   nTree.levelOrder((e) => {
//     arr.push(nTree.height(e));
//   });
//   console.log(arr);
//   prettyPrint(nTree.root);
//   // console.log(randomArR[0], '1st num in randomArr');
//   // prettyPrint(nTree.root);
// }

/**
 * work on inorder()
 * start with small tree [1,2,3]
 * then [1,2,3,4,5,6,7]
 * then up to 15, etc.
 *
 * work on isBalanced()
 *
 * Assignments left = [7,10]
 * tie it all together = [1,2,3,4,5,6,7,8]
 *
 * ideas:
 * i may not be able to solve the 'order' functions, but
 *  i can add a lil something everytime and little by little solve em
 * when we move down in the tree we add to stack
 *  when we move up in tree, we remove from stack
 * everytime I visit a new node,
 *  add it's type to the stack? (nlr, lnr, lrn)
 *  so it would be array with arrays inside
 *    if (one of them is null, don't add that part)
 */
