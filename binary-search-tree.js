const treeFactory = array => {
    let root = null;
    const nodeFactory = () => {
        return {
            data: null,
            leftNode: null,
            rightNode: null,

        }
    }
    
    const buildTree = (array, start=0, end=array.length-1) => {
        if (start>end) return null;
        let mid = Math.floor((start+end)/2);
        let newRoot = nodeFactory();
        newRoot.data = array[mid];
        newRoot.leftNode = buildTree(array, start, mid-1);
        newRoot.rightNode = buildTree(array, mid+1, end);
        return newRoot
    }

    if (array) {
        let sortedArray = array.sort();
        let finalArray =  sortedArray.filter((item, index) => array.indexOf(item) === index);
        root = buildTree(finalArray)
    } 
  
        
    const prettyPrint = (node=root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };


    const insert = (data, node=root) => {
            if (data < node.data) {
                if (!node.leftNode) {
                    let newNode = nodeFactory();
                    newNode.data = data;
                    node.leftNode = newNode
                }
                else {
                    insert(data, node.leftNode)
                }
            }
            if (data > node.data) {
                if (!node.rightNode) {
                    let newNode = nodeFactory();
                    newNode.data = data;
                    node.rightNode = newNode
                }
                else {
                    insert(data, node.rightNode)
                }
            }

        }

    const remove = (data, node=root) => {
          if (!node.leftNode && !node.rightNode) return;
          let isDeleted = false;
          if (node.rightNode) {
            if (node.rightNode.data === data) {
            isDeleted = true;
            let deletedNode = node.rightNode;
            if (!deletedNode.rightNode && !deletedNode.leftNode) {
                node.rightNode = null;
            }
            else if (deletedNode.rightNode) {
                let newNode = deletedNode.rightNode;
                while (newNode.leftNode) {
                    newNode = newNode.leftNode;
                }
                node.rightNode = newNode
            }
            else if (deletedNode.leftNode) {
                node.rightNode = deletedNode.leftNode;
            }
        }
        }
        if (node.leftNode) {
            if (node.leftNode.data === data) {
                isDeleted = true;
                let deletedNode = node.leftNode;
                if (!deletedNode.rightNode && !deletedNode.leftNode) {
                    node.leftNode = null;
                }
                else if (deletedNode.rightNode) {
                    let newNode = deletedNode.rightNode;
                    while (newNode.leftNode) {
                        newNode = newNode.leftNode;
                    }
                    node.leftNode = newNode
                }
                else if (deletedNode.leftNode) {
                    node.leftNode = deletedNode.leftNode;
                }
            }
        }
        if (!isDeleted) {
            if (node.data < data) remove(data, node.rightNode,)
            else if (node.data > data) remove(data, node.leftNode)
        }
    }

    const find = (data, node=root) => {
        if (data === node.data) return node;
        else if (data > node.data) return find(data, node.rightNode)
        else if (data < node.data) return find(data, node.leftNode)
        return false;
    }

    const preOrder = (func=null, node=root, preOrderList=[]) => {
        func? func(node):preOrderList.push(node)
        if (node.leftNode) preOrder(func, node.leftNode, preOrderList)
        if (node.rightNode) preOrder(func, node.rightNode, preOrderList)

        if (preOrderList.length > 0) return preOrderList
    }

    const inOrder = (func=null, node=root, inOrderList=[]) => {
        if (node.leftNode) inOrder(func, node.leftNode, inOrderList)
        func ? func(node):inOrderList.push(node)
        if (node.rightNode) inOrder(func, node.rightNode, inOrderList)

        if (inOrderList.length > 0) return inOrderList
    }

    const postOrder = (func=null, node=root, postOrderList=[]) => {
        if (node.leftNode) postOrder(func, node.leftNode, postOrderList)
        if (node.rightNode) postOrder(func, node.rightNode, postOrderList)
        func? func(node):postOrderList.push(node)

        if (postOrderList.length > 0) return postOrderList
    }

    const height = (node, count=0) => {
        if (!node.leftNode && !node.rightNode) return count;
        let leftHeight = 0;
        let rightHeight = 0;
        if (node.leftNode) leftHeight = height(node.leftNode, count+1)
        if (node.rightNode) rightHeight = height(node.rightNode, count+1)
        return leftHeight > rightHeight ? leftHeight:rightHeight

    }

    const depth = (node, root=root, count=0) => {
        if (node === root) return count;
        if (node.data > root.data && root.rightNode) return depth(node, root.rightNode, count+1)
        else if (root.leftNode) return depth(node, root.leftNode, count+1)
    }

    const isBalanced = (node=root) => {
        if (!node || !node.leftNode && !node.rightNode) return true
        let leftHeight = node.leftNode ? height(node.leftNode):0;
        let rightHeight = node.rightNode ? height(node.rightNode):0;
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false
        }
        return isBalanced(node.leftNode) && isBalanced(node.rightNode);
    }

    const rebalance = node => {
        let rebalanceArray = inOrder(node).map(nodeObject => nodeObject.data);
        root = buildTree(rebalanceArray);
    }

    return {prettyPrint, insert, remove, find, preOrder, inOrder, postOrder, height, depth, isBalanced, rebalance, root}

}

let myTree = treeFactory([1,2,3,56,85,3,65]);
myTree.prettyPrint()
console.log('is balanced', myTree.isBalanced())
myTree.insert(7)
myTree.insert(8)
myTree.insert(9)
myTree.insert(12)
myTree.prettyPrint()
console.log('is balanced', myTree.isBalanced())
console.log(myTree.inOrder())
myTree.rebalance()
myTree.prettyPrint()
