// 1. String concatenation
console.log('my' + 'cat'); // mycat
console.log('1' + 2); // 12
console.log(`string literals: 1 + 2 = ${1+2}`); // string literals: 1 + 2 = 3

// 2. Numeric operators
console.log(1 + 1); // add 2
console.log(1 - 1); // substract 0
console.log(1 / 1); // divide 1
console.log(1 * 1); // multiply 1
console.log(5 % 2); // remainder 1
console.log(2 ** 3); // exponentiation 8

// 3. Increment and decrement operators
let counter = 2;
const preIncremnet = ++counter;
// counter = count + 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncremnet}, counter: ${counter}`);
const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
console.log(`preIncrement: ${preIncremnet}, counter: ${counter}`);

const preDecremnet = --counter;
// counter = count - 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncremnet}, counter: ${counter}`);
const postDecrement = counter--;
// postIncrement = counter;
// counter = counter - 1;
console.log(`preIncrement: ${preIncremnet}, counter: ${counter}`);

// 4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y
x -= y;
x *= y;
x /= y;

// 5. Comparison operators
console.log(10 < 6) // less then
console.log(10 <= 6) // less then or equal
console.log(10 > 6) // greater then
console.log(10 >= 6) // greater then or equal

// 6. Logical operator: ||(or), %%(and), !(not)
const value1 = true;
const value2 = 4 < 2; // false

// ||(or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`)

// &&(and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`)

// often used to compress long if-statemnet
// nullableObject && nullableObject.something
// 예를 들면 아래와 같이 사용 가능
// if(nullableObject != null){
//     nullableObject.something;
// }

function check() {
    for (let i = 0; i < 10; i++) {
        //wasting time
        console.log('??');
    }
    return true;
}

// ! (not)
console.log(!value1); // false, value1 = true


// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive); // true
console.log(stringFive != numberFive); // false

// == strict equality, no type conversion
console.log(stringFive === numberFive); // false
console.log(stringFive !== numberFive); // true

// object equality by reference
const ellie1 = {
    name: 'ellie'
};
const ellie2 = {
    name: 'ellie'
};
const ellie3 = ellie1;
console.log(ellie1 == ellie2); // false
console.log(ellie1 === ellie2); // false
console.log(ellie1 === ellie3); // true

// equality - puzzler
console.log(0 == false); // true
console.log(0 === false); // false
console.log('' == false); // false
console.log('' === false); // false
console.log(null == false); // true
console.log(null === false); // false

// 8. Conditional operators: if
// if, else if, else
const name = 'ellie';
if (name === 'ellie') {
    console.log('welcome, Ellie')
} else if (name === 'coder') {
    console.log('You are amazing coder')
} else {
    console.log('unknown')
}

// 9. Ternary operator: ?
// condition ? value : value2;
console.log(name === 'ellie' ? 'yes' : 'no');

// 10. Switch statement
// use for multiple if check
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser) {
    case 'IE':
        console.log('go away');
        break;
    case 'Chrome':
        console.log('love you!');
        break;
    case 'Firefox':
        console.log('love you!');
        break;
    default:
        console.log('same all!');
        break;
}

// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
let i = 3;
while(i > 0){
    console.log(`while: ${i}`)
    i--;
}

// do while loop, body code is executed first, 
// then check the condition
do {
    console.log(`while: ${i}`)
    i--;
} while(i > 0);

// for loop, for(begin; condition; step)
for(i=3; i > 0; i-- ){
    console.log(`for: ${i}`)
}

for (let i = 3; i > 0; i--) {
    //inline variable declaretion
    console.log(`inline variable for: ${i}`)
}

// nested loops
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        console.log(`i: ${i}, j: ${j}`)
    }
}

// break, continue
// Q1. iterate from 0 to 10 and print only even numbers(use continue)
for(let i=0; i < 11; i++){
    if(i % 2 == 0){
        console.log(i)
    }
}

// Q2. iterate from 0 to 10 and print numbers until reaching 8 (not break)
for(let i=0; i < 11; i++){
    if(i > 8){
        break;
    }
    console.log(i)
}








