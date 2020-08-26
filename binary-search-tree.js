class BinarySearchTree {
	constructor(key = null, value = null, parent = null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}
	insert(key, value) {
		// if tree is empty than insert as root of the tree
		if (this.key == null) {
			this.key = key;
			this.value = value;
		} else if (key < this.key) {
			/**
			 * if the tree exists, compare key with the root,
			 * if the key is less, move left, if the key is more
			 * move right
			 */
			if (this.left === null) {
				/**
				 * if there is no left, insert left of the root
				 */
				this.left = new BinarySearchTree(key, value, this);
			} else {
				/**
				 * if the left node exists, recursively call insert to check
				 * the left nodes children nodes
				 */
				this.left.insert(key, value);
			}
		} else if (key > this.key) {
			/**
			 * do the same on the right
			 */
			if (this.right == null) {
				this.right = new BinarySearchTree(key, value, this);
			} else {
				this.right.insert(key, value);
			}
		}
	}
	find(key) {
		// if the item is at the root, return the root
		if (this.key == key) {
			return this.key;
		} else if (key < this.key && this.left) {
			/**
			 * if the key is less that the root,
			 * recursively call find to search sub tree
			 */
			return this.left.find(key);
		} else if (key > this.key && this.right) {
			return this.right.find(key);
		} else {
			/**
			 * searched the entire tree, no results
			 */
			throw new Error(`Key Error`);
		}
	}
	remove(key) {
		if (this.key == key) {
			if (this.left && this.right) {
				const successor = this.right._findMin();
				this.key = successor.key;
				this.value = successor.value;
			} else if (this.left) {
				/**
				 * if the node only has a left node, replace the node with the left node
				 */
				this._replaceWith(this.left);
			} else if (this.right) {
				/**
				 * if the node only has a right node, replace the node with the right node
				 */
				this._replaceWith(this.right);
			} else {
				this._replaceWith(null);
			}
		} else if (key < this.key && this.left) {
			this.left.remove(key);
		} else if (key > this.key && this.right) {
			this.right.remove(key);
		} else {
			throw new Error(`Key Error`);
		}
	}
	_replaceWith(node) {
		if (this.parent) {
			if (this == this.parent.left) {
				this.parent.left = node;
			} else if (this == this.parent.right) {
				this.parent.right = node;
			}
			if (node) {
				node.parent = this.parent;
			}
		} else {
			if (node) {
				this.key = node.key;
				this.value = node.value;
				this.left = node.left;
				this.right = node.right;
			} else {
				this.key = null;
				this.value = null;
				this.left = null;
				this.right = null;
			}
		}
	}
	_findMin() {
		if (!this.left) {
			return this;
		}
		return this.left._findMin();
	}
}
module.exports = BinarySearchTree;
const tree = () => {
	const BST = new BinarySearchTree();
	BST.insert(5, `five`);
	BST.insert(4, `four`);
	BST.insert(9, `nine`);
	BST.insert(1, `one`);
	BST.insert(2, `two`);
	BST.insert(7, `seven`);
	// BST.insert(6, `six`);
	return BST;
};

const treeHeight = (t) => {
	return treeHeightCounter(t, 1);
};
const treeHeightCounter = (tree, count) => {
	// base case - if there is an empty tree, return 0
	if (tree === null) {
		return 0;
	}

	// terminating case - if a node doesn't have children, return the count
	if (tree.right === null && tree.left === null) {
		return count;
	}

	// find the max to get highest between two depths
	if (tree.right && tree.left) {
		return Math.max(
			treeHeightCounter(tree.right, count + 1),
			treeHeightCounter(tree.left, count + 1)
		);
	} else if (tree.right !== null) {
		return treeHeightCounter(tree.right, count + 1);
	} else {
		return treeHeightCounter(tree.left, count + 1);
	}
};

console.log(' ');
console.log('Tree Height: ');
console.log(treeHeight(tree()));
console.log(' ');
const isBinarySearchTree = (tree) => {
	// iterate through left side, if all left is lower than parent it is binary search tree, else it is not
	if (!tree) return;
	let current = tree.left;
	while (current.left) {
		if (current.left.key > current.key) {
			return false;
		}
		current = current.left;
	}
	return true;
};
console.log(' ');
console.log('Is Binary search tree: ');
console.log(isBinarySearchTree(tree()));
console.log(' ');

const createBalancedBST = (arr, start = 0, end = arr.length) => {
	if (start >= end) {
		return null;
	}

	const midIdx = Math.floor((start + end) / 2);
	const midValue = arr[midIdx];

	const node = new BinarySearchTree(midValue);

	node.left = createBalancedBST(arr, start, midIdx);
	node.right = createBalancedBST(arr, midIdx + 1, end);

	return node;
};

// console.log(createBalancedBST([1, 2, 3, 6, 7, 9, 11]));

const ifBalanced = (tree, countR = 0, countL = 0) => {
	if (!tree) {
		return 0;
	}
	if (!tree.right && !tree.left) {
		return countR, countL;
	}

	if (tree.right && tree.left) {
		countR = ifBalanced(tree.right, countR++);
		countL = ifBalanced(tree.left, countL++);
	} else if (tree.right !== null) {
		countR = treeHeightCounter(tree.right, countR + 1);
	} else if (tree.left !== null) {
		countL = treeHeightCounter(tree.left, countL + 1);
	}

	return countL > countR + 1 || countR > countL + 1 || countL === countR;
};
console.log(' ');
console.log(`If balanced: `);
console.log(ifBalanced(tree()));
console.log(' ');
/**
 * Find nth largest node
 * @param {BinarySearchTree} tree
 * @param {Array} arr
 *
 * Sort the node into an array and return the nth largest node from the end
 */
const sort = (tree, arr = []) => {
	if (!tree) return;

	sort(tree.left, arr);
	arr.push(tree.key);
	sort(tree.right, arr);
};
const nthLarget = (tree, n) => {
	if (!tree) return -1;
	// create and array and pass to helper function to sort
	let arr = [];
	sort(tree, arr);

	// count to nth largest array idx from the end
	let count = 1;
	let idx = arr.length - 1;
	while (count < n) {
		idx--;
		count++;
	}
	return arr[idx];
};
console.log(' ');
console.log('nth Largest node: ');
console.log(nthLarget(tree(), 3));

const kthLargest = (tree, k, count = 0) => {
	let current = tree;
	let nthLargest = null;
	while (current != null) {
		if (current.right === null) {
			count++;
			if (count === k) nthLargest = current;
			current = current.left;
		} else {
			let successor = current.right;
			while (successor.left != null && successor.left != current) {
				successor = successor.left;
				if (successor.left == null) {
					successor.left = current;
					current = current.right;
				} else {
					successor.left = null;
					count++;
					if (count === k) nthLargest = current;
					current = current.left;
				}
			}
		}
	}
	return nthLargest;
};
console.log(' ');
console.log('nth Largest Node, iterative: ');
console.log(kthLargest(tree(), 3));

const isSameBST = (arr1, arr2) => {
	// if sizes are different return false
	// if first index does not match, return false
	if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) {
		return false;
	}
	if (arr1.length === 0) {
		return true;
	}
	// Construct two lists from each input array. The first
	// list contains values smaller than first value, i.e.,
	// left subtree. And second list contains right subtree.
	let arr1Left = [];
	let arr1Right = [];
	let arr2Left = [];
	let arr2Right = [];
	for (let i = 1; i < arr1.length; i++) {
		if (arr1[i] < arr1[0]) {
			arr1Left.unshift(arr1[i]);
		} else {
			arr1Right.unshift(arr1[i]);
		}
		if (arr2[i] < arr2[0]) {
			arr2Left.unshift(arr2[i]);
		} else {
			arr2Right.unshift(arr2[i]);
		}
	}

	return isSameBST(arr1Left, arr2Left) && isSameBST(arr1Right, arr2Right);
};

console.log(' ');

console.log('is same BST: ');
console.log(isSameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 0, 4, 2, 6]));
