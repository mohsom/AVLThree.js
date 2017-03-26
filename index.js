/**
 * Created by Volodya Skalskyi on 3/18/2017.
 */
'use strict';
const readline = require('readline');
let AVLTree = require('./avl-tree');

let tree = new AVLTree();

const rl = readline.createInterface({
    input: process.stdin
});

let array =[];

rl.on('line', (input)=> {
     if(input === '') {
         rl.close();
     } else {
         array.push(Number(input));
     }
});

rl.on('close', ()=>{
    array.forEach((key) => {
        tree.insert(key);
    });
    tree.logTree();

    let sortedArr = [];
    while(!tree.isEmpty()) {
        let number = tree.findMaximum();
        sortedArr.push(number);
        tree.delete(number);
    }
    console.log(sortedArr);
});
