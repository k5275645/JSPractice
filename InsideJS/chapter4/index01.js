// add() 함수 선언문
function add(x, y) {
    return x + y;
}

console.log(add(3, 4)); // 7

// add1() 함수 표현식
// js에서 이름이 없는 함수를 익명함수(annonymous function)이라 함.
let add1 = function (x, y) {
    return x + y;
}

let plus = add;
let plus1 = add1; // 익명 함수를 이용한 함수 표현식 방법(익명 함수 표현식)

console.log(add1(1, 2)) // 3
console.log(plus(2, 3)); // 5
console.log(plus1(3, 4)); // 7

// 기명 함수 표현식의 함수 호출 방법.
// 함수 이름이 포함된 함수 표현식을 기명 함수 표현식이라 한다.
let add2 = function sum(x, y) {
    return x + y;
}

console.log(add2(1,2)); // 3
//console.log(sum(3,4)); // Uncaught ReferenceError: sum is not defined
// 함수 표현식에서 사용된 함수 이름이 외부 코드에서 접근 불가능하다.
// 함수 내부에서 해당 함수를 재귀적으로 호출하거나, 디버거 등에서 함수를 구분할 때 사용한다.

// 함수 표현식 방식으로 구현한 팩토리얼 함수
let factorialLet = function factorial(n){
    if(n <= 1){
        return 1;
    }
    return n * factorial(n-1);
}

console.log(factorialLet(3)); // 6
//console.log(factorial(6)); // Uncaught ReferenceError: factorial is not defined
// 함수 내부에서 이뤄지는 재귀호출은 factorial()함수 이름으로 처리한다.

