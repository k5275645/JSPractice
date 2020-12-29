const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddEven(str){
    if(str.length % 2){
        return odd;
    } else {
        return even;
    }
};

let chkStr = (str) => (str.length % 2 ? odd : even);
//console.log(chkStr('hello World!'));
console.log(checkStringOddEven('hello World!'));
console.log(checkNumber(3));