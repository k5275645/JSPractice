//Math
function add(a, b) {
    if (a % 1 === 0 && b % 1 === 0) {
        return (a + b);
    } else {
        return parseFloat(a + b).toFixed(1);
    }
}

function subtract(a, b) {
    if (a % 1 === 0 && b % 1 === 0) {
        return (a - b);
    } else {
        return parseFloat(a - b).toFixed(1);
    }
}

function multiply(a, b) {
    if (a % 1 === 0 && b % 1 === 0) {
        return (a * b)
    } else {
        return parseFloat(a * b).toFixed(1);
    }
}

function divide(a, b) {
    if (a % 1 === 0 && b % 1 === 0) {
        return (a / b)
    } else {
        return parseFloat(a / b).toFixed(1);
    }
}

let num1 = null;
let oper1 = null;
let num2 = null;

function operate() {
    if (num2 == null) {
        document.getElementById('topInput').innerHTML = num1;
    } else if (oper1 == ' + ') {
        document.getElementById('topInput').innerHTML = add(num1, num2);
        num1 = Number(document.getElementById('topInput').innerHTML);
    } else if (oper1 == ' - ') {
        document.getElementById('topInput').innerHTML = subtract(num1, num2);
        num1 = Number(document.getElementById('topInput').innerHTML);
    } else if (oper1 == ' * ') {
        document.getElementById('topInput').innerHTML = multiply(num1, num2);
        num1 = Number(document.getElementById('topInput').innerHTML);
    } else if (oper1 == ' / ') {
        if (num1 == 0 && num2 == 0) {
            document.getElementById('topInput').innerHTML = 0;
        } else {
            document.getElementById('topInput').innerHTML = divide(num1, num2);
            num1 = Number(document.getElementById('topInput').innerHTML);
        }
    } else if (oper1 == null) {
        num1 = Number(document.getElementById('topInput').innerHTML);
    } else {
        return document.getElementById('topInput').innerHTML = 'Clear and try again.';
    }
}

function doNumber(object) {
    document.getElementById('topInput').innerHTML += object;
    if (num1 == null) {
        num1 = Number(document.getElementById('topInput').innerHTML);
    } else {
        num2 = Number(document.getElementById('topInput').innerHTML.split(" ")[2]);
    }
}

function doOperator(operator) {
    document.getElementById('topInput').innerHTML += operator;
    oper1 = operator;
}

function clearMath() {
    document.getElementById('topInput').innerHTML = '';
    num1 = null;
    num2 = null;
    oper1 = null;
}