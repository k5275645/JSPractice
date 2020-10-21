const calculator = document.querySelector('.calculator');
const numBtns = calculator.querySelectorAll('.num');
const opBtns = calculator.querySelectorAll('.op');
const resetBtn = calculator.querySelector('.reset');
const equalBtn = calculator.querySelector('.equal');
const resultShow = calculator.querySelector('.resultShow span');
const processShow = calculator.querySelector('.process span');

//
let result = 0;
let nextOp = 0;
let afterOp = false;
let isFirst = false;
let op = "";
let anyStr = "";


//
function processStack(any) {
    anyStr = anyStr + any.toString();
    printProcess(anyStr);
}

//
function printProcess(anyStr) {
    processShow.innerText = anyStr;
}

//
function printResult(numStr) {
    resultShow.innerText = numStr;
}

//
function stack(num, cVal) {
    let numStr = num.toString();
    if (numStr === "0") {
        numStr = cVal;
    } else {
        numStr = numStr + cVal;
    }
    printResult(numStr);
    return numStr;
}

//
function numChk(e) {
    e.preventDefault();
    const cVal = e.target.textContent;
    console.log("Num : " + cVal);

    processStack(cVal);

    if (cVal != ".") {
        if (!afterOp) {
            result = stack(result, cVal);
        } else {
            nextOp = stack(nextOp, cVal);
        }
    } else {
        if (resultShow.textContent.indexOf(".") != -1) {
            console.log('이미 .이 있습니다')
        } else {
            if (!afterOp) {
                result = stack(result, cVal);
            } else {
                nextOp = stack(nextOp, cVal);
            }
        }
    }
}

//
function opChk(e) {
    e.preventDefault();
    afterOp = true;

    if(nextOp !== 0){
        result = Number(result);
        nextOp = Number(nextOp);
        cal(result, nextOp);
        printResult(result);
        op = e.target.textContent;
        processStack(op);
        nextOp = 0;
    } else {
        op = e.target.textContent;
        console.log("op : " + op);
        processStack(op);
    }

    
    
    //console.log("result, op, nextOp : " +result + op + nextOp);
}

//
function cal(x, y) {
    if (op === "+") {
        result = (x + y).toString();
    } else if (op === "-") {
        result = (x - y).toString();
    } else if (op === "*") {
        result = (x * y).toString();
    } else if (op === "/") {
        result = (x / y).toString();
    }
}

//
function reset(e) {
    e.preventDefault();
    console.log("리셋");
    result = 0;
    nextOp = 0;
    afterOp = false;
    //count?
    op = "";
    anyStr = "";
    printResult(0);
    printProcess(0);
}

//
function init() {
    numBtns.forEach(function (e) {
        e.addEventListener('click', numChk);
    });
    opBtns.forEach(function (opBtn) {
        opBtn.addEventListener('click', opChk);
    });
    resetBtn.addEventListener('click', reset);
}

init();




