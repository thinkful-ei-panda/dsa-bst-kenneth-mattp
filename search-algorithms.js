const BST = require('./binary-search-tree');
/**
 *          35
 *       /     \
 *      25     89
 *     /  \   /  \
 *    15  27 79   90
 *  /  \           \
 * 14  19          91
 *    L   N   R
 * [ 14, 15, 19, 25, 27, 35, 79, 89, 90, 91 ]
 * [35 25 15 14 19 27 89 79 91 90]
 */

const travBST = () => {
	const array = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
	const node = new BST();
	array.forEach((item) => node.insert(item));
	return node;
};
const inOrderTrav = (node) => {
	// inorder(node)
	// if node == null then return
	// inorder(node.left)
	// visit(node)
	// inorder(node.right)
	if (!node) {
		return null;
	}

	if (node !== null) {
		node.left = inOrderTrav(node.left);
		console.log(node.key);
		node.right = inOrderTrav(node.right);
	}
};
console.log(' ');
console.log('In Order traversal');
inOrderTrav(travBST());

const preOrderTrav = (node) => {
	// preOrder(node)
	// if node == null then return
	// visit(node);
	// inorder(node.left)
	// inorder(node.right)
	if (!node) {
		return null;
	}
	if (node !== null) {
		console.log(node.key);
		node.left = preOrderTrav(node.left);
		node.right = preOrderTrav(node.right);
	}
};
console.log(' ');
console.log('Pre Order traversal');
preOrderTrav(travBST());
const postOrderTrav = (node) => {
	// post(node)
	// if node == null then return
	// inorder(node.left)
	// inorder(node.right)
	// visit(node)

	if (!node) {
		return null;
	}
	if (node !== null) {
		node.left = postOrderTrav(node.left);
		node.right = postOrderTrav(node.right);
		console.log(node.key);
	}
};
console.log(' ');
console.log('Post Order traversal');
postOrderTrav(travBST());

const ussEnterprise = () => {
	const node = new BST();
	node.insert(10, 'Captain Piccard');
	node.insert(8, 'Commander Riker');
	node.insert(9, 'Lt. Cmdr. LaForge');
	node.insert(7, 'Lt. Cmdr. Worf');
	node.insert(6, 'Lt. security-officer');
	node.insert(12, 'Commander Data');
	node.insert(15, 'Lt. Cmdr. Crusher');
	node.insert(13, 'Lt. Selar');
	return node;
};
console.log(' ');
console.log(ussEnterprise());

const nextUp = (node, values = []) => {
	const queue = [];
	queue.push(node);
	while (queue.length) {
		let currNode = queue.pop();
		values.push(currNode.value);
		if (currNode.right) {
			queue.push(currNode.right);
		}
		if (currNode.left) {
			queue.push(currNode.left);
		}
	}
	return values;
};
console.log(' ');
console.log(nextUp(ussEnterprise()));
console.log(' ');
