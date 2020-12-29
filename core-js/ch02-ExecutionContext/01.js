// 실행 컨텍스트 -> 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

// VariableEnviroment : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보,
// 선언 시점의 LexicalEnvironment의 스냅샷으로, 변경사항은 반영되지 않음.

// LexicalEnvironmonet : 처음에는 VariableEnvironment와 같지만 변경 사항이 실시간으로 반영됨.
// '사전적인' 환경
//  ex) 현재 컨텍스트의 내부에는 a,b,c와 같은 식별자들이 있고 외부 정보는 D를 참조하도록 구성되어있다.

// ThisBinding : this 식별자가 바라봐야 할 대상 객체.

// VariableEnviroment, LexicalEnvironmonet의 내부는 
// environmentRecord와 out-EnviromentReference로 구성되어 있다.
// 초기화 과정 중에는 사실상 완전히 동일하고 이후 코드 진행에 따라 서로 달라진다.
// environmentRecord에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.



// 2-3-1 environmentRecord와 호이스팅

// 함수 선언문과 함수 표현식

// 함수 선언문 -> function 정의부만 존재하고 별도의 할당 명령이 없는 것.
function a() {
    /*...*/ }; // 함수선언문. 함수명 a가 곧 변수명
a(); // 실행 OK.

// 함수 표현식 -> 정의한 function을 별도의 변수에 할당하는 것.
let b = function () {
    /*...*/ } // (익명)함수 표현식. 변수명 b가 곧 함수명
b(); // 실행 OK.

let c = function d() {
    /*...*/ } // (기명)함수 표현식. 변수명은 c, 함수명은 d
c(); // 실행 OK.
//d(); // 에러!
// 기명함수 표현식에서 주의할 점 -> 외부에서는 함수명으로 함수를 호출할 수 없다.

console.log(sum(1,2)); // 3
//console.log(multiply(3,4)); // Uncaught ReferenceError: Cannot access 'multiply' before initialization

function sum(a, b) { // 함수 선언문, 전체를 호이스팅 한다.
    return a + b;
};

let multiply = function (a,b){ // 함수 표현식, 변수는 선언부만 끌어올림(let multiply;)
    return a * b;
}

console.log(sum(1,2)); // 3
console.log(multiply(3,4)); //12
// -> 상대적으로 함수 표현식이 안전하다.

// 2-3-2 스코프, 스코프 체인, outerEnvironmentReference
// 스코프 -> 식별자에 대한 유효범위
// 여러 스코프에서 동일한 식별자를 선언한 경우
// -> 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하다.

// 스코프 체인
var aa = 1;
var outer = function(){
    var inner = function(){
        console.log(aa); // undefined
        var aa = 3;
    };
    inner(); 
    console.log(aa); // 1
};
outer();
console.log(aa); // 1

// 참고
var aaa = 1;
var outer2 = function(){
    var bbb = 2;
    var inner2 = function(){
        console.log(bbb); // 2
        console.dir(inner2);
        //debugger;
    };
    inner2();
};
outer2();





