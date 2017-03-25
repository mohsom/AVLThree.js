/**
 * Created by Volodya Skalskyi on 3/25/2017.
 */
const BalanceState = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class AvlThree {
    constructor() {
        this._root = null;
        this._size = 0;
    }

    getBalanceState(node) {
        let heightDifference = node.leftHeight() - node.rightHeight();
        switch (heightDifference) {
            case -2:
                return BalanceState.UNBALANCED_RIGHT;
            case -1:
                return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceState.UNBALANCED_LEFT;
            default:
                return BalanceState.BALANCED;
        }
    }

    _compare(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }

    insert(key) {
        this._root = this._insert(key, this._root);
        this._size++;
    };


    _insert(key, root) {
        if (root === null) {
            return new Node(key);
        }
        if (this._compare(key, root.key) < 0) {
            root.left = this._insert(key, root.left);
        } else if (this._compare(key, root.key) > 0) {
            root.right = this._insert(key, root.right);
        } else {
            this._size--;
            return root;
        }

        root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
        let balanceState = this.getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            if (this._compare(key, root.left.key) < 0) {
                root = root.rotateRight();
            } else {
                root.left = root.left.rotateLeft();
                return root.rotateRight();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            if (this._compare(key, root.right.key) > 0) {
                root = root.rotateLeft();
            } else {
                root.right = root.right.rotateRight();
                return root.rotateLeft();
            }
        }

        return root;
    }

    delete(key) {
        this._root = this._delete(key, this._root);
        this._size--;
    }

    _delete(key, root) {
        if (root === null) {
            this._size++;
            return root;
        }

        if (this._compare(key, root.key) < 0) {
            root.left = this._delete(key, root.left);
        } else if (this._compare(key, root.key) > 0) {
            root.right = this._delete(key, root.right);
        } else {
            if (!root.left && !root.right) {
                root = null;
            } else if (!root.left && root.right) {
                root = root.right;
            } else if (root.left && !root.right) {
                root = root.left;
            } else {
                let inOrderSuccessor = this.minValueNode(root.right);
                root.key = inOrderSuccessor.key;
                root.right = this._delete(inOrderSuccessor.key, root.right);
            }
        }

        if (root === null) {
            return root;
        }

        root.height = Math.max(root.leftHeight(), root.rightHeight()) + 1;
        let balanceState = this.getBalanceState(root);

        if (balanceState === BalanceState.UNBALANCED_LEFT) {
            // Left left case
            if (this.getBalanceState(root.left) === BalanceState.BALANCED ||
                this.getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                return root.rotateRight();
            }
            // Left right case
            if (this.getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                root.left = root.left.rotateLeft();
                return root.rotateRight();
            }
        }

        if (balanceState === BalanceState.UNBALANCED_RIGHT) {
            // Right right case
            if (this.getBalanceState(root.right) === BalanceState.BALANCED ||
                this.getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
                return root.rotateLeft();
            }
            // Right left case
            if (this.getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
                root.right = root.right.rotateRight();
                return root.rotateLeft();
            }
        }

        return root;
    }

    get(key) {
        if (this._root === null) {
            return null;
        }

        return this._get(key, this._root).value;
    }

    _get(key, root) {
        if (key === root.key) {
            return root;
        }

        if (this._compare(key, root.key) < 0) {
            if (!root.left) {
                return null;
            }
            return this._get(key, root.left);
        }

        if (!root.right) {
            return null;
        }
        return this._get(key, root.right);
    }

    findMinimum() {
        return this.minValueNode(this._root).key;
    }

    minValueNode(root) {
        let current = root;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    findMaximum() {
        return this.maxValueNode(this._root).key;
    }

    maxValueNode(root) {
        let current = root;
        while (current.right) {
            current = current.right;
        }
        return current;
    }

    size() {
        return this._size;
    }

    isEmpty() {
        return this._size === 0;
    }

    logTree() {
        console.log(JSON.stringify(this._root, null, 4));
    }
}

class Node {
    constructor(key) {
        this.left = null;
        this.right = null;
        this.height = null;
        this.key = key;
    }

    rotateRight() {
        let other = this.left;
        this.left = other.right;
        other.right = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        other.height = Math.max(other.leftHeight(), this.height) + 1;
        return other;
    }

    rotateLeft() {
        let other = this.right;
        this.right = other.left;
        other.left = this;
        this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
        other.height = Math.max(other.rightHeight(), this.height) + 1;
        return other;
    }

    leftHeight() {
        if (!this.left) {
            return -1;
        }
        return this.left.height;
    }

    rightHeight() {
        if (!this.right) {
            return -1;
        }
        return this.right.height;
    }
}

module.exports = AvlThree;