const calculator = document.querySelector('.calculator');
const numBtns = calculator.querySelectorAll('.num');
const opBtns = calculator.querySelectorAll('.op');
const resetBtn = calculator.querySelector('.reset');
const equalBtn = calculator.querySelector('.equal');
const resultShow = calculator.querySelector('.resultShow span');

//
let result = 0;
let nextOp = 0;
let afterOp = false;
let op = "";
let dotChk = false;

//
function printResult(num) {
    resultShow.innerText = num;
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
function numChk(event) {
    event.preventDefault();
    const cVal = event.target.textContent;
    console.log("Num Btn : " + cVal);

    if(cVal!="."){
        if (!afterOp) {
            result = stack(result, cVal);
        } else {
            nextOp = stack(nextOp, cVal);
        }
    }else {
        if(resultShow.textContent.indexOf(".") != -1){
            console.log('이미 .이 있습니다')
        } else {
            if (!afterOp) {
                result = stack(result, cVal);
            } else {
        
            }
        }
    }
}

function cal(x, y){

}

//
function opChk(e){
    e.preventDefault();
    afterOper = true;

    cal();
    printResult(result);

    op = e.target.textContent;
    console.log(op);
    nextOp = 0;


}

//
function init() {
    numBtns.forEach(function (numBtn) {
        numBtn.addEventListener('click', numChk);
    });
    opBtns.forEach(function (opBtn){
        opBtn.addEventListener('click', opChk);
    });
}

init();




