class ERP {
    constructor(SAL, JOB, EMPNO){
        this.SAL = SAL;
        this.JOB = JOB;
        this.EMPNO = EMPNO;
    } 
}
const varAppendBtn = document.querySelector('.var-append');
const opAppendBtn = document.querySelector('.op-append');

const varForm = document.querySelector('.var-form');
const opForm = document.querySelector('.op-form');

let varName = varForm.querySelector('input[name=var-name]');
let varValue = varForm.querySelector('input[name=var-value]');

function appendFormula(event){
    event.preventDefault();
    console.log(event);
}

function appendVar(event){
    event.preventDefault();
    let name = varName.value;
    let value = varValue.value;
    const td = document.createElement('td');
    const tr = document.createElement('tr');
    console.log('varName.value : ' + varName.value);
    console.log('varValue.value : ' + varValue.value);
    varName.value = "";
    varValue.value = "";
}

function createMember(){
    const no1 = new ERP('1000', 'SALESMAN', 1);
    //console.log(no1.SAL);
    //console.log(no1.JOB);
    //console.log(no1.EMPNO);
}

function init () {
    createMember();
    varAppendBtn.addEventListener('click',appendVar);
    opAppendBtn.addEventListener('click',appendFormula);
}

init();

