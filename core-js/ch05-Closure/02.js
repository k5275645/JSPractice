// 02 클로저와 메모리 관리
// (1) return에 의한 클로저의 메모리 해제
let outer = (function () {
    let a = 1;
    let inner = function () {
        return ++a;
    };
    return inner;
})();
console.log(outer()); // 2
console.log(outer()); // 3
outer = null; // outer 식별자의 inner 함수 참조를 끊음

// (2) setInterval에 의한 클로저의 메모리 해제
(function () {
    let a = 0;
    let intervalId = null;
    let inner = function () {
        if (++a >= 10) {
            clearInterval(intervalId);
            inner = null; // inner 식별자의 함수 참조를 끊음
        }
        console.log(a);
    };
    intervalId = setInterval(inner, 100);
})();

// (3) eventListener에 의한 클로저의 메모리 해제
(function () {
    let count = 0;
    let button = document.createElement("button");
    button.innerText = 'click';

    let clickHandler = function () {
        console.log(++count, 'thimes clicked');
        if (count >= 10) {
            button.removeEventListener('click', clickHandler);
            clickHandler = null; // clickHandler 식별자 함수 참조를 끊음
        }
    };
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
})();