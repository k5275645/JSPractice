// Function
// - fundamental building block in the program
// - subprogram can be used multiple times
// - performs a task or calculates a value

// 1. function declaration
// function name(param1, param2){body--- return;}
// on function === one thing
// naming: doSomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint
// function is object in JS

function printHello() {
    console.log('Hello');
}
printHello();

function log(message) {
    console.log(message)
}
log('Hello@');
log(1234);

// 2. Parameters
// premitive parameters: passed by value
// object parameters: passed by reference
function changeName(obj) {
    obj.name = 'coder';
}
const ellie = {
    name: 'ellie'
};
changeName(ellie);
console.log(ellie); // {name: "coder"}

// 3. Default parameters (added in ES6)
function showMessage(message, from = 'unknown') {
    console.log(`${message} by ${from}`)
}
showMessage('Hi!') // Hi! by unknown, 만약 from에 값을 할당 안했다면 undefined

// 4. Rest parameters (added in ES6)
function printAll(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
    for (const arg of args) {
        console.log(arg);
    }
    args.forEach((arg) => console.log(arg));
    //위 셋의 결과는 같음
}
printAll('dream', 'coding', 'ellie');

// 5. Local scope
let globalMessage = 'global' // global variable
function printMessage() {
    let message = 'hello';
    console.log(message); // local variable
    console.log(globalMessage);

    function printAnother() {
        console.log(message); // local variable
        let childMassage = 'hello2';
    }
    // console.log(childMassage); // error
}
printMessage();

// 6. Return a value
function sum(a, b) {
    return a + b;
}
const result = sum(1, 2); // 3
console.log(`result: ${result}`);
console.log(`sum: ${sum(1,2)}`);

// 7. Early return, early exit
// bad
function upgradeUser(user) {
    if (user.point > 10) {
        // long upgrade logic...
    }
}

// good
function upgradeUser(user) {
    if (user.point <= 10) {
        return;
    }
    // long upgrade logic...
}

// First-class function
// function are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other functions.
// can be returned by another function

// 1. Function expression 
// a function declaration can be called ealier then it is defiend. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () {
    console.log('print');
}
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. Callback function using function expression
function randomQuiz(answer, printYes, printNo) {
    if (answer === 'love you') {
        printYes();
    } else {
        printNo();
    }
}

// anonymous function
const printYes = function () {
    console.log('yes!');
}

// named function
// better debugging in debegger's stack traces // 디버그 할 때 좋음
// recursions // 함수안에서 자신을 부름? 재귀?
const printNo = function print() {
    console.log('no!');
}
randomQuiz('wrong', printYes, printNo); // no
randomQuiz('love you', printYes, printNo); // yes

// Arrow function
// always anonymous
const simplePrint1 = function () {
    console.log('simplePrint!')
};
const simplePrint2 = () => console.log('simplePrint');

const add1 = function (a, b) {
    retunr = a + b;
};
const add = (a, b) => a + b;

const simpleMultiply = (a, b) => {
    // do something more
    return a * b;
};

// IIFE : immediately Invoked Function Expression, 함수를 바로 호출하고 싶을 때 사용
(function hello() {
    console.log('IIFE');
})();

// Fun quiz time
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder

function calculate(command, a, b) {
    switch (command) {
        case '+':
            return a + b;
        case '-':
            return a - b
        case '/':
            return a / b
        case '*':
            return a * b
        case '%':
            return a % b
        default:
            throw Error('unknown command');
    }
}

console.log(calculate('+', 1,2));