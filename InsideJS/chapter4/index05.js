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
inner(); // 100