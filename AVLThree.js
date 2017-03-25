/**
 * Created by Volodya Skalskyi on 3/18/2017.
 */
'use strict';
const three = Symbol('three');
class AVLThree {
    constructor() {
        this[three] = {
            isRoot: true,
            key: null,
            height: null,
            left: null,
            right: null
        }
    }

    static weightOfElement(key) {
        //z === 122
        //a === 97
        if(key) {
            let keyCopy = key.toLowerCase();
            return keyCopy.split('').reduce((weight, curr) => {
                    return weight += 122 - curr.charCodeAt(0);
                }, 0) * keyCopy.length;
        }
        return -1;
    }

    addElement(key) {
        let weight = BinaryThree.weightOfElement(key);
        let currentSubThree = this[three];
        if (this[three].key === null) {
            this[three].key = key;
        } else {
            while (currentSubThree.key !== null) {
                let currKeyWeight = BinaryThree.weightOfElement(currentSubThree.key);
                if (currKeyWeight < weight) {
                    currentSubThree = currentSubThree.right || (currentSubThree.right = {key: null, left: null, right: null});
                } else if (currKeyWeight > weight) {
                    currentSubThree = currentSubThree.left || (currentSubThree.left = {key: null, left: null, right: null});
                } else {
                    return false;
                }

            }
            currentSubThree.key = key;
        }
        this.fixHeight(currentSubThree);
    }

    balanceFactor(node) {

    }

    fixHeight(node) {
        node.height = node.right.height - node.left.height;
    }

    balanceNode(node) {

    }

    rotateRight() {

    }

    rotateLeft() {

    }

    deleteElement(key) {
        let elementToDelete = this.searchForElement(key);
        if(elementToDelete !== null) {
            elementToDelete.key = null;
            elementToDelete.right = null;
            elementToDelete.left = null;
            return true;
        } else {
            return null;
        }
    }

    searchForElement(key) {
        let weight = BinaryThree.weightOfElement(key);
        let currentSubThree = this[three];
        while (currentSubThree && (currentSubThree.key !== key)) {
            let currWeight = BinaryThree.weightOfElement(currentSubThree.key);
            if(weight > currWeight) {
                currentSubThree = currentSubThree.right;
            } else if(weight < currWeight) {
                currentSubThree = currentSubThree.left;
            } else {
                return null;
            }
        }
        return currentSubThree;
    }

    logThree() {
        console.log(JSON.stringify(this[three], null, 4));
    }
}

module.exports = AVLThree;