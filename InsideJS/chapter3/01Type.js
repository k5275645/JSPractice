let emptyLet;
console.log(typeof emptyLet); // undefined
console.log(typeof emptyLet === undefined); // false
console.log(typeof emptyLet === "undefined"); // true
console.log(emptyLet === undefined); // true

let nullLet = null;
console.log(typeof nullLet); // object
console.log(typeof nullLet === null); // false
console.log(typeof nullLet === "null"); // false
console.log(nullLet === null); // true

function test(){
}

console.log(typeof test) // function