// 함수 호이스팅.
// 함수 선언문 형태로 정의한 함수의 유효 범위는 코드의 맨 처음부터 시작한다.
console.log(add(2, 3)); // 5 , 선언되지 않았음에도 호출했음.

function add(x, y) {
    return x + y;
}

console.log(add(3, 4)); // 7

// 함수 표현식으로 정의되었다면 호이스팅이 일어나지 않는다.

//console.log(add1(1,2)); // Uncaught ReferenceError: Cannot access 'add1' before initialization

let add1 = function (x, y){
    return x+y;
}

console.log(add1(3,4)); // 7