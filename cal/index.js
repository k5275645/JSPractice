class EMP {
    constructor(SAL, JOB, EMPNO) {
        this.SAL = SAL;
        this.JOB = JOB;
        this.EMPNO = EMPNO;
    }
}

const varAppendBtn = document.querySelector('.var-append');
const opAppendBtn = document.querySelector('.op-append');
const calBtn = document.querySelector('.cal');

const varForm = document.querySelector('.var-form');
const opForm = document.querySelector('.op-form');

let varName = varForm.querySelector('input[name=var-name]');
let varValue = varForm.querySelector('input[name=var-value]');

let opCondition = opForm.querySelector('input[name=op-condition]');
let opFormula = opForm.querySelector('input[name=op-formula]');

const varTable = document.querySelector('.var-table');
const varBody = varTable.querySelector('tbody');
const opTable = document.querySelector('.op-table');
const opBody = opTable.querySelector('tbody');
const resultTable = document.querySelector('.result-table');
const resultBody = resultTable.querySelector('tbody');

let vars = [];
let ops = [];
let empArr = [];

const VAR_LS = 'vars';
const OP_LS = 'ops';
const EMP_LS = 'emps';

function save(listName) {
    if (listName === OP_LS) {
        localStorage.setItem(OP_LS, JSON.stringify(ops));
    } else if (listName === VAR_LS) {
        localStorage.setItem(VAR_LS, JSON.stringify(vars));
    }
}

function appendOp(condition, formula) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const newId = ops.length + 1;
    tr.id = newId;
    td1.innerText = condition;
    td2.innerText = formula;
    tr.appendChild(td1);
    tr.appendChild(td2);
    opBody.appendChild(tr);
    opObj = {
        id: newId,
        condition: condition,
        formula: formula,
    }
    ops.push(opObj);
    save(OP_LS);
    opCondition.value = "";
    opFormula.value = "";
}

function appendVar(name, value) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const newId = vars.length + 1;
    tr.id = newId;
    td1.innerText = name;
    td2.innerText = value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    varBody.appendChild(tr);
    varObj = {
        id: newId,
        name: name,
        value: value,
    }
    vars.push(varObj);
    save(VAR_LS);
    varName.value = "";
    varValue.value = "";
}

function getSal(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function getJob() {
    let jobs = ['SALESMAN', 'ACCOUNTANT', 'DESIGNER', 'DEVELOPER', 'PLANNER'];
    return jobs[Math.floor(Math.random() * jobs.length)]
}

function createMember() {
    for (let i = 1; i < 101; i++) {
        empArr.push(new EMP(getSal(500, 2000), getJob(), i));
    }
    if(localStorage.getItem(EMP_LS) === null){
        localStorage.setItem(EMP_LS, JSON.stringify(empArr));
    }
    //console.log(empArr);
}

function loadVarsAndOps() {
    const loadedVars = localStorage.getItem(VAR_LS);
    const loadedOps = localStorage.getItem(OP_LS);

    if (loadedVars !== null) {
        const parsedVars = JSON.parse(loadedVars);
        parsedVars.forEach(function (e) {
            console.log(e);
            appendVar(e.name, e.value);
        });
    }

    if (loadedOps !== null) {
        const parsedOps = JSON.parse(loadedOps);
        parsedOps.forEach(function (e) {
            console.log(e);
            appendOp(e.condition, e.formula);
        });
    }
}

function handleSubmit(e) {
    e.preventDefault();
    //console.log(e.target.classList.value);
    if (e.target.classList.value === 'var-append') {
        const name = varName.value;
        const value = varValue.value;
        appendVar(name, value);
    } else if (e.target.classList.value === 'op-append') {
        const condition = opCondition.value;
        const formula = opFormula.value;
        appendOp(condition, formula);
    }
}

function conditionChk(condition){

}

function load() {
    const loadedEMPs = localStorage.getItem(EMP_LS);
    const loadedVars = localStorage.getItem(VAR_LS);
    const loadedOps = localStorage.getItem(OP_LS);

    if (loadedOps !== null) {
        const parsedOps = JSON.parse(loadedOps);
        parsedOps.forEach(function (e) {
            //console.log(e);
            //appendOp(e.condition, e.formula);
            conditionChk(e.condition);
        });
    }

    if(loadedEMPs !== null) {
        const parsedEMPs = JSON.parse(loadedEMPs);
        console.log(parsedEMPs);

    }

    if (loadedVars !== null) {
        const parsedVars = JSON.parse(loadedVars);
        parsedVars.forEach(function (e) {
            //console.log(e);
            //appendVar(e.name, e.value);
        });
    }

    
}

function handleResult(e) {
    e.preventDefault();
    load();
}

function init() {
    createMember();
    loadVarsAndOps();
    varAppendBtn.addEventListener('click', handleSubmit);
    opAppendBtn.addEventListener('click', handleSubmit);
    calBtn.addEventListener('click', handleResult);
}

init();