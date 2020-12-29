const value = require('./var');
console.log(value);
//const odd = value.odd;
//const even = value.even;
//console.log(odd);
//console.log(even);

// 구조 분해 할당.
const {
    odd,
    even
} = require('./var');
//console.log(odd);
//console.log(even);

function checkOddEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}
//console.log(checkOddEven(3));

// module.exports = {
//     checkOddEven,
//     // odd,
//     // even,
// };

module.exports = checkOddEven;

// let chk = (number) => (number % 2) ? odd : even;
// console.log(chk(4));