// 4.2.3 함수 객체의 기본 프로퍼티
function add(x, y) {
    return x + y;
};

console.dir(add);
// caller 프로퍼티 : 자신을 호출한 함수를 나타낸다.
// arguments 프로퍼티 : 함수를 호출할 때 전달된 인자값을 나타낸다.
// __proto__ : 함수 객체의 부모 역할을 하는 프로토 타입 객체
// -> Function.prototype 객체라고 명명, 이것도 '함수 객체'라고 정의

// 4.2.3.1 length 프로퍼티
// 함수가 정의한 인자 개수를 나타냄.
function func0(){}

function func1(x){ return x; }

function func2(x,y){ return x+y; }

function func3(x,y,z){ return x+y+z; }

console.log(func0.length); // 0
console.log(func1.length); // 1
console.log(func2.length); // 2
console.log(func3.length); // 3

// 4.2.3.2 prototype 프로퍼티
function myFunction(){
    return true;
}

console.log(myFunction.prototype);
console.log(myFunction.prototype.constructor);