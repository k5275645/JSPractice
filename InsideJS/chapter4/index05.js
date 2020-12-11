// 4.3 함수의 다양한 형태

// 4.3.1 콜백 함수
// 익명함수의 대표적인 용도가 콜백 함수이다.
// 대표적인 예는 이벤트 핸들러 처리이다.
// 웹 페이지가 로드되거나 키보드가 입력되는 등의 DOM 이벤트가 발생할 경우,
// 브라우저는 정의된 DOM 이벤트에 해당하는 이벤트 핸들러를 실행시킨다.

// window.onload 이벤트 핸들러 예제 코드
// window.onload = function(){
//     alert('This is the callback function');
// }

// 4.3.2 즉시 실행 함수
// 선언되자마자 실행된다. 같은 함수를 다시 호출 할 수 없다.
// 이런 특징으로, 최초 한 번의 실행만을 필요로 하는 초기화 코드 부분 등에 사용할 수 있다.
(function (name) {
    console.log('This is the immediate function -> ' + name)
})('foo');

// 4.3.3 내부 함수
// js에서는 함수 코드 내부에서도 다시 함수 정의가 가능하다.
// 이렇게 함수 내부에서 정의된 함수를 '내부 함수' 라고 부른다.
function parent() {
    let a = 100;
    let b = 200;

    function child() {
        let b = 300;
        console.log(a);
        console.log(b);
    }
    child();
}

parent();
//child(); // Uncaught ReferenceError: child is not defined
// 내부 함수는 자신을 둘러싼 외부 함수의 변수에 접근 가능하다.

// 부모 함수에서 내부 함수를 외부로 리턴하면, 부모 함수 밖에서도 내부 함수를 호출하는 것이 가능하다.
function parent1(){
    let a = 100;
    let child = function(){
        console.log(a);
    }
    return child;
}

let inner = parent1();
inner(); // 10
// parent1()과 같은 부모 함수 스코프의 변수를 참조하는 inner()와 같은 함수를 '클로저'라고 한다.

// 4.3.4 함수를 리턴하는 함수
let self = function(){
    console.log('a');
    return function(){
        console.log('b');
    }
}
self();        // a
self = self(); // a
self();        // b

// 4.4 함수 호출과 this
// 4.4.1 arguments 객체
function func(arg1, arg2){
    console.log(arg1, arg2);
}

func(); // undefined undefined
func(1); // 1 undefined
func(1,2); // 1 2
func(1,2); // 1 2
// 적게 호출된 인수는 undefined처리, 초과된 인수는 무시

// arguments는 객체이지 배열이 아니다.
function add(a,b){
    console.dir(arguments);
    return a+b;
}

console.log(add(1)); // NaN
console.log(add(1,2)); // 3
console.log(add(1,2,3)); // 3

// argumnets 객체는 매개변수가 정해지지 않은 함수를 구현하거나,
// 전달된 인자의 개수에 따라 다른 처리를 해야하는 함수를 개발할 때 유용함.
function sum(){
    let result = 0;
    for(let i=0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
}

console.log(sum(1,2,3)); // 6
console.log(sum(1,2,3,4,5,6)); // 21



