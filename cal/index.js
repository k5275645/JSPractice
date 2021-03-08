class EMP {
    constructor(SAL, JOB, EMPNO) {
        this.SAL = SAL;
        this.JOB = JOB;
        this.EMPNO = EMPNO;
    }   
}

const VAR_LS = 'vars';
const OP_LS = 'ops';
const EMP_LS = 'emps';

const varAppendBtn = document.querySelector('.var-append');
const opAppendBtn = document.querySelector('.op-append');
const calBtn = document.querySelector('.cal');

const varForm = document.querySelector('.var-form');
const opForm = document.querySelector('.op-form');

let varName = varForm.querySelector('input[name=var-name]');
let varValue = varForm.querySelector('input[name=var-value]');

let opCondition = opForm.querySelector('input[name=op-condition]');
let opFormula = opForm.querySelector('input[name=op-formula]');

const varTable = document.querySelector('.var-table tbody');
const opTable = document.querySelector('.op-table tbody');
const resultTable = document.querySelector('.result-table tbody');

let vars = [];
let ops = [];
let empArr = [];

function del(event) {

}

function save(listName) {
    if (listName === OP_LS) {
        localStorage.setItem(OP_LS, JSON.stringify(ops));
    } else if (listName === VAR_LS) {
        localStorage.setItem(VAR_LS, JSON.stringify(vars));
    } else if (listName === EMP_LS) {
        localStorage.setItem(EMP_LS, JSON.stringify(empArr));
    }
}

function cal() {
    //console.log(vars);
    //console.log(ops);
    //console.log(empArr);
    //let test = '1100';
    //console.log(test > 1000);
    ops.forEach(function (e) {
        console.log(e);
        console.log(e.condition);
        console.log(typeof (e.condition));
        let condition = e.condition;
        Number(condition);
        console.log(typeof (condition));
        if (condition) {

        }
    });
}

function appendOp(condition, formula) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const modifyBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = ops.length + 1;
    tr.id = newId;
    td1.innerText = condition;
    td2.innerText = formula;
    modifyBtn.innerText = "🔺";
    delBtn.innerText = "❌";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(modifyBtn);
    tr.appendChild(delBtn);
    opTable.appendChild(tr);
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
    const modifyBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = vars.length + 1;
    tr.id = newId;
    td1.innerText = name;
    td2.innerText = value;
    modifyBtn.innerText = "🔺";
    delBtn.innerText = "❌";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(modifyBtn);
    tr.appendChild(delBtn);
    varTable.appendChild(tr);
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

function loadAndCreate() {
    const loadedEMPs = localStorage.getItem(EMP_LS);
    const loadedVars = localStorage.getItem(VAR_LS);
    const loadedOps = localStorage.getItem(OP_LS);

    if (loadedEMPs !== null) {
        const parsedEMPs = JSON.parse(loadedEMPs);
        parsedEMPs.forEach(function (e) {
            empArr.push(new EMP(e.SAL, e.JOB, e.EMPNO));
        });
    } else {
        for (let i = 1; i < 101; i++) {
            empArr.push(new EMP(getSal(500, 2000), getJob(), i));
        }
        save(EMP_LS);
    }

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

function getSal(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function getJob() {
    let jobs = ['SALESMAN', 'ACCOUNTANT', 'DESIGNER', 'DEVELOPER', 'PLANNER'];
    return jobs[Math.floor(Math.random() * jobs.length)]
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
    } else if (e.target.classList.value === 'cal') {
        // something to do for calculate
        cal();
    }
}

function init() {
    loadAndCreate();
    varAppendBtn.addEventListener('click', handleSubmit);
    opAppendBtn.addEventListener('click', handleSubmit);
    calBtn.addEventListener('click', handleSubmit);
}

init();