import { useState } from 'react'

import './styling.css'

class BinaryTreeNode {
  constructor(value, id) {
    this.value = value;
    this.id = id;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.idCounter = 0;
  }

  addNode(value, parentId, isLeftChild) {
    const node = new BinaryTreeNode(value, this.idCounter);
    this.idCounter++;

    if (!this.root) {
      this.root = node;
      return;
    }

    const parent = this.findNodeById(parentId, this.root);

    if (!parent) {
      console.log(`Parent node with id ${parentId} not found`);
      return;
    }

    if (isLeftChild) {
      if (!parent.left) {
        parent.left = node;
        return;
      }
      console.log(`Parent node with id ${parentId} already has a left child`);
    } else {
      if (!parent.right) {
        parent.right = node;
        return;
      }
      console.log(`Parent node with id ${parentId} already has a right child`);
    }
  }

  findNodeById(id, node = this.root) {
    if (!node) {
      return null;
    }

    if (node.id === id) {
      return node;
    }

    return this.findNodeById(id, node.left) || this.findNodeById(id, node.right);
  }
  
  getHeight(node = this.root) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  
   countChildless(node = this.root) {
    if (!node) {
      return 0;
    }

    if (!node.left && !node.right) {
      return 1;
    }

    return (
      this.countChildless(node.left) +
      this.countChildless(node.right)
    );
  }
  
   isEqual(otherTree) {
    const stack1 = [this.root];
    const stack2 = [otherTree.root];

    while (stack1.length > 0 && stack2.length > 0) {
      const node1 = stack1.pop();
      const node2 = stack2.pop();

      if (!node1 && !node2) {
        continue;
      }

      if (!node1 || !node2 || node1.value !== node2.value || node1.id !== node2.id) {
        return false;
      }

      stack1.push(node1.left);
      stack1.push(node1.right);
      stack2.push(node2.left);
      stack2.push(node2.right);
    }

    return true;
  }
  deleteNodeById(id) {
    if (!this.root) {
      console.log('Tree is empty');
      return false;
    }
  
    if (this.root.id === id) {
      this.root = null;
      return true;
    }
  
    const parent = this.findParentNodeById(id, this.root);
    if (!parent) {
      console.log(`Node with id ${id} not found`);
      return false;
    }
  
    const nodeToDelete = parent.left && parent.left.id === id ? parent.left : parent.right;
    if (!nodeToDelete) {
      console.log(`Node with id ${id} not found`);
      return false;
    }
  
    if (nodeToDelete.left) {
      this.deleteNodeById(nodeToDelete.left.id);
    }
  
    if (nodeToDelete.right) {
      this.deleteNodeById(nodeToDelete.right.id);
    }
  
    if (parent.left && parent.left.id === id) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  
    return true;
  }
  
  findParentNodeById(id, node = this.root) {
    if (!node) {
      return null;
    }
  
    if ((node.left && node.left.id === id) || (node.right && node.right.id === id)) {
      return node;
    }
  
    return this.findParentNodeById(id, node.left) || this.findParentNodeById(id, node.right);
  }


}

const App=()=>{
  
  const [treeHeight, setTreeHeight] = useState(0);
  const [childless,setChildless]=useState(0);
  const [tree, setTree] = useState(new BinaryTree());
  const [val1,setVal1]=useState('');
   const [val2,setVal2]=useState('');
     const [val3,setVal3]=useState('');
     const [val4,setVal4]=useState('');
   const [activeTreeIndex, setActiveTreeIndex] = useState(0);
   const [trees, setTrees] = useState([new BinaryTree()]);
   const [equal,setEqual]=useState('');
  const addNode = (value, parentId, isLeftChild) => {
     const newTrees = [...trees];
    const newTree = new BinaryTree();
    Object.assign(newTree, newTrees[activeTreeIndex]);
    newTree.addNode(value, parentId, isLeftChild);
    newTrees[activeTreeIndex] = newTree;
    setTrees(newTrees);
    setTreeHeight(newTree.getHeight());
    setChildless(newTree.countChildless());
  };
  const deleteNode = (ids) => {
    const newTrees = [...trees];
   const newTree = new BinaryTree();
   Object.assign(newTree, newTrees[activeTreeIndex]);
   newTree.deleteNodeById(ids);
   newTrees[activeTreeIndex] = newTree;
   setTrees(newTrees);
   setTreeHeight(newTree.getHeight());
   setChildless(newTree.countChildless());
   
 };
const handlechange1=(event)=>{
  setVal1(Number(event.target.value));
}
const handlechange2=(event)=>{
  setVal2(Number(event.target.value));
}
const handlechange3=(event)=>{
  setVal3(Number(event.target.value));
}
const handlechange4=(event)=>{
  setVal4(Number(event.target.value));
}
  const renderNode = (node) => {
    if (!node) {
      return null;
    }
    const leftNode = renderNode(node.left);
    const rightNode = renderNode(node.right);
    return (
      
      <div className="node" key={node.id}>
        <h3><div className="value">  value:{node.value} id:{node.id}
       <br></br> value to add<input  type="number" value={val1} onChange={handlechange1} />
        <button onClick={()=>deleteNode(node.id)}>delete node</button>
        <button onClick={() => addNode(val1, node.id, true)}>Add Left Children</button>
      <button onClick={() => addNode(val1, node.id, false)}>Add Right Children</button>
        </div></h3>
        <div className="children">
          <h3> {leftNode && <div className="left-child">{leftNode}</div>} </h3>
         <h3>  {rightNode && <div className="right-child">{rightNode}</div>}</h3> 
        </div>
      </div>
    );
  };
   const handleAddTree = () => {
    const newTrees = [...trees, new BinaryTree()];
    setTrees(newTrees);
    setActiveTreeIndex(newTrees.length - 1);
  };
  
const testOfEquality=(index,index2)=>{
  const tree1=trees[index];
  const tree2=trees[index2];
  if (!areTreesEqual(tree1, tree2)) {
 setEqual(false);
  }else{
    setEqual(true);
  }
}

  const handleSwitchTree = (index) => {
      const newTree = trees[index];
  const activeTree = trees[activeTreeIndex];

  if (!areTreesEqual(newTree, activeTree)) {
    console.log('The two trees are not equal');
  }else{
    console.log("trees are equal");
  }
    
    setActiveTreeIndex(index);
    setTreeHeight(trees[index].getHeight());
    
    
  };

  const areTreesEqual = (tree1, tree2) => {
  const compareNodes = (node1, node2) => {
    if (!node1 && !node2) {
      return true;
    }
    if (!node1 || !node2) {
      return false;
    }
    if (node1.value !== node2.value) {
      return false;
    }
    return compareNodes(node1.left, node2.left) && compareNodes(node1.right, node2.right);
  };

  return compareNodes(tree1.root, tree2.root);
};
  return (
    <div className="tree">
      
      <h2><label for="val1s">node to add to tree </label><input id="val1s" type="number" value={val1} onChange={handlechange1} /></h2>
      <br></br>
      <h2><label for="val2idds">id of node you want to add children to </label><input  id="val2idds" title="val2id" type="number" value={val2} onChange={handlechange2} />  </h2>
      <button onClick={() => addNode(val1, null)}>Add Root Node</button>
      <button onClick={() => addNode(val1, val2, true)}>Add Left Child</button>
      <button onClick={() => addNode(val1, val2, false)}>Add Right Child</button>
       <button onClick={handleAddTree}>Add Tree</button>
      <div className="tree-list">
        {trees.map((tree, index) => (
          <button key={index} onClick={() => handleSwitchTree(index)}>Tree {index }</button>
        ))}
      </div>
      
      {renderNode(trees[activeTreeIndex].root)}
      <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
     
    </div>
      {console.log(trees)}
      
      
      <h2> {treeHeight==0 ?(
        <h3>Height of tree:0</h3>):(<h3>Height of tree:{treeHeight-1}</h3>
        )}</h2>
      <h3>number of leafes:{childless}</h3>
      <div className="compare">
        <h1>test equality of trees</h1>
        <h3><label for="val3s">number of first tree </label><input id="val3s" value={val3} onChange={handlechange3}/> </h3>
         <h3><label for="val4s">number of second tree</label> <input id="val4s" value={val4} onChange={handlechange4}/></h3>
        <button onClick={()=>{testOfEquality(val3,val4)}}>test equality</button>
        {equal===true?(<h1>trees are equal</h1>):equal===false?(<h1>trees are not equal</h1>):<h1>test trees</h1>}
      </div>
    </div>
  );
}

export default App
