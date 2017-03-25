/**
 * Created by Volodya Skalskyi on 3/18/2017.
 */
'use strict';
const readline = require('readline');
let AVLThree = require('./AVLThree');

let three = new AVLThree();

const rl = readline.createInterface({
    input: process.stdin
});

rl.on('line', (input)=> {
    if(input === '') {
        three.logThree();

        three.logThree();
        rl.close();
    } else {
        three.addElement(input);
    }
});
