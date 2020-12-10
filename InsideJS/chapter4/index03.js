// 4.2 함수 객체 : 함수도 객체다
// 4.2.1 자바스크립트에서는 함수도 객체다.
// 기본 코드 실행뿐 아니라, 함수 자체가 일반 객체처럼 프로퍼티들을 가질 수 있다.

// 함수 선언 방식으로 add()함수 정의
function add(x, y) {
    return x + y;
}

// add() 함수 객체에 result, status프로퍼티 추가
add.result = add(3, 2);
add.status = 'ok';

console.log(add.result); // 5
console.log(add.status); // ok

// add() 함수 객체는 [[code]] 프로퍼티와,
// 일반 객체처럼 result와 status 프로퍼티를 가지는 것을 확인할 수 있다.

// 4.2.2 자바스크립트에서 함수는 값으로 취급된다.
// 일급객체, javascript에서는 함수를 일급객체라고 부른다.
// - 리터럴에 의해 생성
// - 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
// - 함수의 인자로 전달 가능
// - 함수의 리턴값으로 리턴 가능
// - 동적으로 프로퍼티를 생성 및 할당 가능

// 4.2.2.1 변수나 프로퍼티의 값으로 할당
// 변수나 프로퍼티에 함수값을 할당하는 코드
// 변수에 함수 할당
let foo = 100;
let bar = function () {
    return 100;
};
console.log(bar()); // 100
// foo와 bar 할당문의 차이는 bar는 함수의 참조값을 저장하고 있으므로, bar()라고 했을 때 호출 가능하다는 것.

// 프로퍼티에 함수 할당(배열의 원소 등에도 할당 가능)
let obj = {};
obj.baz = function () {
    return 200;
};
console.log(obj.baz()); // 200


// 4.2.2.2 함수 인자로 전달
// 함수를 다른 함수의 인자로 넘긴 코드
// 함수 표현식으로 foo() 함수 생성
let foo1 = function (func) {
    func(); // 인자로 받은 func()함수 호출
};

// foo() 함수 실행
foo1(function () {
    console.log('Function can be used as the argument.');
    // Function can be used as the argument.
});
// foo() 함수를 호출할 때, 리터럴 방식으로 생성한 익명 함수를 func인자로 넘겼다.
// 따라서, foo() 함수 내부에서는 func 매개변수로 인자에 넘겨진 함수를 호출 할 수 있다.

// 4.2.2.3 리턴값으로 활용
// 함수를 리턴하는 foo() 함수 정의
let foo2 = function () {
    return function () {
        console.log('this function is the return value');
    };
};

let bar1 = foo2();
bar1(); // this function is the return value
// foo2() 함수가 호출되면, 리턴값으로 전달되는 함수가 bar1 변수에 저장된다.
// () 함수 호출 연산자를 이용해 bar()로 리턴된 함수를 실행하는 것이 가능하다.