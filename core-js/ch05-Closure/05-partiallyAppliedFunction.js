// 5-3-3 부분 적용 함수
// 부분 적용 함수 -> n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가,
// 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수.?
// this를 바인딩해야 하는 점을 제외하면 앞서 살펴본 bind메서드의 실행 결과가 바로 부분 적용 함수다. ?

// bind 메서드를 활용한 부분 적용 함수
let add = function () {
    let result = 0;
    console.log(arguments); // Arguments(10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...]
    for (let i = 0; i < arguments.length; i++) {
        //console.log(arguments[i]);
        result += arguments[i];
    }
    return result;
};
let addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10)); // 55
// addPartial함수는 인자 5개를 미리 적용하고,
// 추후 추가적으로 인자들을 전달하면 모든 인자들을 모아 원래의 함수가 실행되는 부분 적용 함수이다.

// add 함수는 this를 사용하지 않으므로 bind메서드만드로 문제 없이 구현됐으나,
// this의 값을 변경할 수밖에 없기 때문에 메서드에서는 사용할 수 없다.
// this에 관여하지 않는 변도의 부분 적용 함수가 있다면 범용성이 있을 것.

// 부분 적용 함수 구현(1)
let partial = function () {
    let originalPartialArgs = arguments;
    //console.log(originalPartialArgs);
    //console.log(originalPartialArgs[0]);
    let func = originalPartialArgs[0];
    if (typeof func !== 'function') {
        throw new Error('첫 번째 인자가 함수가 아니당');
    }
    return function () {
        let partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
        //console.log(originalPartialArgs); // Arguments(2) [ƒ, "왈왈, ", callee: ƒ, ...]
        //console.log(partialArgs); // ["왈왈, "]

        let restArgs = Array.prototype.slice.call(arguments);
        //console.log(arguments); // Arguments ["입니다!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
        //console.log(restArgs); // ["입니다!"]

        return func.apply(this, partialArgs.concat(restArgs));
        //console.log(this) // {name: "강아지", greet: ƒ}

        //concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
    };
};

let dog = {
    name: '강아지',
    greet: partial(function (prefix, suffix) {
        // console.log(this); // {name: "강아지", greet: ƒ}
        return prefix + this.name + suffix;
    }, '왈왈, ')
};
console.log(dog.greet('입니다!')); // 왈왈, 강아지입니다!

// 부분 적용 함수 구현 (2) 생략

// 디바운스 -> 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고
// 처음 도는 마지막에 발생한 이벤트에 대해 한 번만 처리하는 것으로,
// 프론트엔드 성능 최적화에 도움을 주는 기능이다.
// scroll, wheel, mousemove, resize 등에 적용하기 좋다.

// 부분 적용 함수 - 디바운스 ..?
let debounce = function (eventName, func, wait) {
    let timeoutId = null;
    //console.log(eventName, func, wait);
    return function (event) {
        let self = this;
        console.log(eventName, 'event 발생');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(self, event), wait);
    }
}

let moveHandler = function (e) {
    console.log('move event 처리');
}

let wheelHandler = function (e) {
    console.log('wheel event 처리')
}

document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));

