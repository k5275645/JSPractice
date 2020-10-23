//선택자설정
const calculator = document.querySelector('.calculator');
const numBtns = calculator.querySelectorAll('.num');
const opBtns = calculator.querySelectorAll('.op');
const resetBtn = calculator.querySelector('.reset');
const equalBtn = calculator.querySelector('.equal');
const resultShow = calculator.querySelector('.resultShow span');
const processShow = calculator.querySelector('.process span');

//변수설정
let result = 0;
let tempResult = 0;
let nextOp = 0;
let afterOp = false;
let op = "";
let anyStr = "";

//확인용
function processStack(any) {
    anyStr = anyStr + any.toString();
    printProcess(anyStr);
}

//확인용
function printProcess(anyStr) {
    processShow.innerText = anyStr;
}

//출력
function printResult(numStr) {
    resultShow.innerText = numStr;
}

//화면에 쌓기
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

//숫자처리
function numChk(e) {
    e.preventDefault();
    let cVal = e.target.textContent;
    if(cVal === "π"){
        cVal = Math.PI;
    } else if(cVal === "e"){
        cVal = Math.E;
    }
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

//연산자처리
function opChk(e) {
    e.preventDefault();
    afterOp = true;
    console.log("afterOp : " + afterOp);
    printResult(e.target.textContent);
    if(e.target.textContent !== "+" && e.target.textContent !== "-" 
    && e.target.textContent !== "*" && e.target.textContent !== "/"
    && e.target.textContent !== "%" && e.target.textContent !== "xy"
    && e.target.textContent !== "x!"){
        afterOp = false;
        if(result !== 0){
            reset();
            printResult("문법error,reset");
        }
    }
    console.log("afterOp : " + afterOp);

    if (tempResult !== 0 && result === 0) {
        result = tempResult;
    }
    if (nextOp !== 0) {
        result = Number(result);
        nextOp = Number(nextOp);
        calBasic(result, nextOp);
        printResult(result);
        console.log("result : " + result + " tempResult : " + tempResult + " op : " + op + " next Op : " + nextOp);
        op = e.target.textContent;
        processStack(op);
        nextOp = 0;
    }
    op = e.target.textContent;
    console.log("op : " + op);
    processStack(op);
}

//"=" 처리
function equal(e){
    e.preventDefault();
    if (tempResult !== 0 && result === 0) {
        result = tempResult;
    }
    
    if (nextOp !== 0) {
        result = Number(result);
        nextOp = Number(nextOp);
        calBasic(result, nextOp);
        printResult(result);
        processStack(`=(${result})`);
        tempResult = result;
        result = 0;
        nextOp = 0;
        afterOp = false;
    }

    if(op !== "+" && op !== "-" && op !== "*"
    && op !== "/" && op !== "%"&& op !== "xy"){
        result = Number(result);
        calIntensive(result);
        printResult(result);
        processStack(`=(${result})`);
        tempResult = result;
        result = 0;
    }
    console.log("result : " + result + " tempResult : " + tempResult + " op : " + op + " next Op : " + nextOp);
}

//2개 연산
function calBasic(x, y) {
    if (op === "+") {
        result = (x + y).toString();
    } else if (op === "-") {
        result = (x - y).toString();
    } else if (op === "*") {
        result = (x * y).toString();
    } else if (op === "/") {
        result = (x / y).toString();
    } else if (op === "%") {
        result = (x % y).toString();
    } else if (op === "xy") {
        result = ((Math.pow(x,y))).toString();
    }
}

//1개 연산
//Math.log는 밑이 e, Math.log10은 밑이 10, 너무깊게 생각x
function calIntensive(x){
    if (op === "sin"){
        result = ((Math.sin(x))).toString();
    } else if (op === "cos"){
        result = ((Math.cos(x))).toString();
    } else if (op === "tan"){
        result = ((Math.tan(x))).toString();
    } else if (op === "√"){
        result = ((Math.sqrt(x))).toString();
    } else if (op === "log"){
        result = ((Math.log10(x))).toString();
    } else if (op === "ln"){
        result = ((Math.log(x))).toString();
    } else if (op === "exp"){
        result = ((Math.exp(x))).toString();
    } else if (op === "x!"){
        result = (factorial(x)).toString();
    }
}

//펙토리얼 계산(cf..if(0)=false이다?)
function factorial(n){
    console.log(Number.isInteger(n));
    if(Number.isInteger(n)){
        return n ? n * factorial(n-1) : 1;
    } else {
        reset();
        printResult("문법 error, reset");
    }
}

//초기화
function reset(e) {
    //e.preventDefault();
    console.log("리셋");
    result = 0;
    tempResult = 0;
    nextOp = 0;
    afterOp = false;
    op = "";
    anyStr = "";
    printResult(0);
    printProcess(0);
}

//시작
function init() {
    numBtns.forEach(function (e) {
        e.addEventListener('click', numChk);
    });
    opBtns.forEach(function (opBtn) {
        opBtn.addEventListener('click', opChk);
    });
    resetBtn.addEventListener('click', reset);
    equalBtn.addEventListener('click', equal);
}

init();




