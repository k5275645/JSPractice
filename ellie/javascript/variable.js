// Whole-script strict mode syntax
// Javascript is very flexible
// flexible == dangerous
// added ECMAScript 5

'use strict';
//a= 6; 와같은 선언은 오류로 취급함, let a = 6; 가능

console.log('hello world');

// 2. Variable
// let (added in ES6)
let globalName = 'global name'
{
    let name = 'ellie'
    console.log(name)
    name = 'hello'
    console.log(name)
}
console.log(name)
console.log(globalName)

//var (don't ever use this)
//var hoisting (move declaration from bottom to top)
//has no block scope
console.log(age);
age = 4;
console.log(age)
var age;


// 3. Constants
// immutable(변경될 수 없는)
// favor immulable data type always for a few reasons;
// - security
// - thread safety
// - reduce human mistakes
const daysInWeek = 7;
const maxNumber = 5;

// Note!
// Immutable data types: primitive types, frozen object(i.e. object.freeze())
// Mutable data types: all objects by default are mutable in JS
// favor immutable data type always for a few reasons:
// - security
// - thread safty
// - reduce human mistakes

// 4. Variable Types
// primitive, single item: number, string, boolean, null, undefined, symbol
// object, box container
// function, first-class function

const count = 17; // integer
const size = 17.1 // decimal number
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

// number - special numberic values: infinity, -infinity, NaN
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

// bigInt (fairly new, don't use it yet)
const bigInt = 12345678901234567890123456789012345678901234567890; // over (-2*53) ~ (2*53)
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);
Number.MAX_SAFE_INTEGER;

// string
const char = 'a';
const brenden = 'brenden';
const greeting = 'hello' + brenden;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brenden}`;
console.log(`value: ${helloBob}, type: ${typeof helloBob}`)

// boolean
// false : 0, null, undefined, NaN, ''
// true : any other value
const canRead = true;
const test = 1 > 3; // false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// undefined
let x;
console.log(`value: ${x}, type: ${typeof x}`);

// symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 == symbol2); // false
console.log(`value: ${symbol1.description}, type: ${typeof symbol1.description}`)
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 == gSymbol2); // true

// object, real-life object, data structure
const ellie = {name: 'ellie', age: 20};
ellie.age = 21; // 변경가능

// 5. Dynamic typing : dynamically typed language
let text = 'hello';
console.log(text.charAt(0));
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
console.log(text.charAt(0)); // variable.js:107 Uncaught TypeError: text.charAt is not a function at variable.js:107




