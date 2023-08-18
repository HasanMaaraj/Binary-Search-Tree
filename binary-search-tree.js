const treeFactory = array => {
    let root = null;
    const nodeFactory = () => {
        return {
            data: null,
            leftNode: null,
            rightNode: null,

        }
    }
    
    const builTree = (array => {
        let sortedArray = array.sort();
    
        let finalArray =  sortedArray.filter((item, index) => array.indexOf(item) === index);
        
        const setRoot =(array, start=0, end=array.length-1) => {
        if (start>end) return null;
        let mid = Math.floor((start+end)/2);
        let newRoot = nodeFactory();
        newRoot.data = array[mid]
        newRoot.leftNode = setRoot(array, start, mid-1)
        newRoot.rightNode = setRoot(array, mid+1, end)
        return newRoot
        }

        root = setRoot(finalArray);
        
    })(array);
        
    const prettyPrint = (node, prefix = "", isLeft = true) => {
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


    const insert = (data) => {
        const appendChild = (node, data) => {
            if (data < node.data) {
                if (!node.leftNode) {
                    let newNode = nodeFactory();
                    newNode.data = data;
                    node.leftNode = newNode
                }
                else {
                    appendChild(node.leftNode, data)
                }
            }
            if (data > node.data) {
                if (!node.rightNode) {
                    let newNode = nodeFactory();
                    newNode.data = data;
                    node.rightNode = newNode
                }
                else {
                    appendChild(node.rightNode, data)
                }
            }

        }
        appendChild(root, data);
    }

    const remove = (data) => {
        const removeChild = (node, data) => {
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
            if (node.data < data) removeChild(node.rightNode, data)
            else if (node.data > data) removeChild(node.leftNode, data)
        }
    }
    removeChild(root, data);
    }

    const find = (data, node=root) => {
        if (data === node.data) return node;
        else if (data > node.data) return find(data, node.rightNode)
        else if (data < node.data) return find(data, node.leftNode)
        return false;
    }

    const preOrder = (func=null, node=root, preOrderList=[]) => {
        func? func(node):preOrderList.push(node)
        if (node.leftNode) preOrder(func, node.leftNode)
        if (node.rightNode) preOrder(func, node.rightNode)

        if (preOrderList.length > 0) return preOrderList
    }

    const inOrder = (func=null, node=root, inOrderList=[]) => {
        if (node.leftNode) inOrder(func, node.leftNode)
        func? func(node):inOrderList.push(node)
        if (node.rightNode) inOrder(func, node.rightNode)

        if (inOrderList.length > 0) return inOrderList
    }

    const postOrder = (func=null, node=root, postOrderList=[]) => {
        if (node.leftNode) postOrder(func, node.leftNode)
        if (node.rightNode) postOrder(func, node.rightNode)
        func? func(node):postOrderList.push(node)

        if (postOrderList.length > 0) return postOrderList
    }

    return {prettyPrint, insert, remove, find, preOrder, inOrder, postOrder, root}

}

let myTree = treeFactory([1,2,3,56,85,3,65]);
myTree.prettyPrint(myTree.root)
myTree.insert(7)
myTree.prettyPrint(myTree.root)
console.log(myTree.find(65))