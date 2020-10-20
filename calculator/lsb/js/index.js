
// selectors
const calculator = document.querySelector(".js-calculator"),
    resetBtn = calculator.querySelector(".js-reset"),
    numBtns = calculator.querySelectorAll(".js-number"),
    operBtns = calculator.querySelectorAll(".js-operator"),
    equalBtn = calculator.querySelector(".js-equal"),
    resultText = calculator.querySelector(".js-result span")


// variables
let operand = 0,
    result = 0;
let afterOper = false;
let operator = "";
let count = 0;

//promise
let p = new Promise((resolve, reject) => {
    let a = 1 + 3
    if (a == 2) {
        resolve('Success')
    } else {
        reject('Failed')
    }
})

p.then((message) => {
    console.log('This is in the then ' + message)
}).catch(message => {
    console.log('This is in the catch ' + message)
})


// functions
// paint the result
function paintNum(num) {
    resultText.innerText = num;
}

// calculate inputs
function calculateNum(x, y) {
    if (operator === "plus") {
        result = (x + y).toString();
    } else if (operator === "minus") {
        result = (x - y).toString();
    } else if (operator === "multiply") {
        result = (x * y).toString();
    } else if (operator === "div") {
        result = (x / y).toString();
    } else if (operator === "sin") {
        result = ((Math.sin(x))).toString();
    } else if (operator === "cos") {
        result = ((Math.cos(x))).toString();
    } else if (operator === "tan") {
        result = ((Math.tan(x))).toString();
    } else if (operator === "exp") {
        result = ((Math.exp(x))).toString();
    } else if (operator === "root") {
        result = ((Math.sqrt(x))).toString();
    } else if (operator === "square") {
        result = ((Math.pow(x, y))).toString();
    } else if (operator === "log") {
        result = ((Math.log(x))).toString();
    } else if (operator === "log10") {
        result = ((Math.log10(x))).toString();
    }
}

// calculate the result and paint it
// initalize operand, count, afterOper
function handleEqual(event) {
    event.preventDefault();

    let resultInt, operandInt = "";

    // parseFloat
    if (result.toString().indexOf(".") > -1 || operand.toString().indexOf(".") > -1) {
        resultInt = parseFloat(result);
        operandInt = parseFloat(operand);
    } else {
        resultInt = parseInt(result);
        operandInt = parseInt(operand);
    }

    console.log(resultInt, operator, operandInt);

    calculateNum(resultInt, operandInt);
    paintNum(result);

    operand = 0;
    count = 0;
    afterOper = false;
}

// save operator that you click
function handleOper(event) {
    event.preventDefault();
    afterOper = true;

    if (count > 0) {
        // parseFloat
        if (result.toString().indexOf(".") > -1 || operand.toString().indexOf(".") > -1) {
            result = parseFloat(result);
            operand = parseFloat(operand);
        } else {
            result = parseInt(result);
            operand = parseInt(operand);
        }
        calculateNum(result, operand);
        paintNum(result);
    }

    operator = event.target.parentNode.id;
    operand = 0;
    count += 1;

    console.log("Oper Btn :", operator);
}

// initilaize all variables
function handleReset(event) {
    event.preventDefault();
    console.log("Reset");
    operand = 0;
    result = 0;
    count = 0;
    afterOper = false;
    operator = "";

    paintNum(0);
}

// stack the number input
function stackNum(num, currentValue) {
    let numStr = num.toString();
    if (numStr === "0") {
        numStr = currentValue;
    } else {
        numStr = numStr + currentValue;
    }

    paintNum(numStr);
    return numStr;
}

// get number by input
function handleNumber(event) {
    event.preventDefault();
    const currentValue = event.target.parentNode.id;
    console.log("Num Btn :", currentValue);

    if (!afterOper) {
        result = stackNum(result, currentValue);
    } else {
        operand = stackNum(operand, currentValue);
    }
}

function init() {
    resetBtn.addEventListener("click", handleReset);
    numBtns.forEach(function (numBtn) {
        numBtn.addEventListener("click", handleNumber);
    });
    operBtns.forEach(function (operBtn) {
        operBtn.addEventListener("click", handleOper);
    });
    equalBtn.addEventListener("click", handleEqual);
}

init();
