// 콜백 함수 -> 다른 코드의 인자로 넘겨주는 함수
// 제어권과 관련이 깊다.
// ex) 함수X를 호출하면서 '특정 조건일 때 함수Y를 실행해서 나에게 알려달라'는 요청을 함께 보내는 것.
// 콜백 함수 -> 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수.

// 4-2-1 호출 시점
// 콜백 함수 예제(1-1) setInterval
// let count = 0;
// let timer = setInterval(() => {
//     console.log(count);
//     if(++count > 4) clearInterval(timer);
// }, 300);

// 콜백 함수 예제(1-2) setInterval
// let count = 0;
// let cbFunc = () => {
//     console.log(count);
//     if(++count > 4) clearInterval(timer);
// };
// let timer = setInterval(cbFunc, 300);

// 4-2-2 인자
// 콜백 함수 예제(2-1) Array.prototype.map
let newArr = [10, 20, 30].map((currentValue, index, array) => {
    console.log(currentValue, index, array);
    return currentValue + 5;
});
console.log(newArr);
// cf) map의 구조
//arr.map(callback(currentValue[, index[, array]])[, thisArg])
//Array.prototype.map(callback[, thisArg])
//callback: function(currentValue, index, array)
// map은 대상이 되는 배열의 모든 요소들을 처음부터 끝까지 꺼내어 콜백 함수를 반복 호출하고,
// 콜백 함수의 실행 결과들을 모아 새로운 배열을 만든다.

// 4-2-3 this
// 콜백 함수 예제(2-3) Array.prototype.map - 직접구현
Array.prototype.map = function (callback, thisArg) {
    let mappedArr = [];
    for (let i = 0; this.length; i++) {
        let mappedValue = callback.call(thisArg || window, this[i], i, this);
        mappedArr[i] = mappedValue;
    }
    return mappedArr;
};

// 03 콜백 함수는 함수다
// 콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출된다.
let obj = {
    vals: [1, 2, 3],
    logValues: function (v, i) {
        console.log(this, v, i);
    }
};
obj.logValues(1, 2); // {vals: Array(3), logValues: ƒ} 1 2 -> this가 obj를 바라봄
[4, 5, 6].forEach(obj.logValues);
// Window {...} 4 0 -> obj.logValues라는 메서드를 forEach 함수의 콜백 함수로서 전달
// Window {...} 5 1 -> obj를 this로 하는 메서드를 전달X, obj.logValues가 가리키는 함수만 전달O
// Window {...} 6 2 -> 별도로 this를 지정하지 않았으므로, this는 전역객체를 바라봄
// 어떤 함수의 인자의 객체의 메서드를 전달하더라도, 이는 결국 메서드가 아닌 함수일 뿐이다.

// 04 콜백 함수 내부의 this에 다른 값 바인딩하기
// 콜백 함수 내부의 this에 다른 값을 바인딩 하는 방법(1) - 전통적인 방식
let obj1 = {
    name: 'obj1',
    func: function () {
        let self = this;
        return function () {
            console.log(self.name);
        };
    }
};
let callback = obj1.func();
//setTimeout(callback, 1000); // obj1
// 이 방식은 this를 사용하지 않을뿐더러 번거롭다.

// 콜백 함수 내부에서 this를 사용하지 않은 경우
let obj2 = {
    name: 'obj2',
    func: function () {
        console.log(obj2.name);
    }
};
//setTimeout(obj2.func, 1100); // obj2
// this를 사용하지 않아 직관적이지만, this를 이용해 재활용할 수 없게 됐음.

// 예제 func 함수 재활용
let obj3 = {
    name: 'obj3',
    func: obj1.func
};
let callback2 = obj3.func();
//setTimeout(callback2, 1500); // obj3
let obj4 = {
    name: 'obj4'
};
let callback3 = obj1.func.call(obj4);
//setTimeout(callback3, 2000); // obj4

// 05 콜백 지옥과 비동기 제어
// 콜백 지옥 -> 콜백 함수를 익명 함수로 전달하는 과정이 반복되어져, 들여쓰기가 깊어지는 문제
// 가독성이 떨어지고, 코드의 수정이 힘들다.

// 콜백 지옥 예시(1-1)
setTimeout(function (name) {
    let coffeeList = name;
    console.log(coffeeList);

    setTimeout(function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList)

        setTimeout(function (name) {
            coffeeList += ', ' + name;
            console.log(coffeeList);

            setTimeout(function (name) {
                coffeeList += ', ' + name;
                console.log(coffeeList);
            }, 500, '카페라떼4');
        }, 500, '카페모카3');
    }, 500, '아메리카노2');
}, 500, '에스프레소1');
// 간단한 해결방법은 익명의 콜백 함수를 모두 기명함수로 전환하는 것

// 콜백 지옥 해결 - 기명함수로 변환
let coffeeList = '';

let addEspresso = function(name){
    coffeeList = name;
    console.log(coffeeList);
    setTimeout(addAmericano, 500, '아메리카노');
}

let addAmericano = function(name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addMoca, 500, '카페모카');
}

let addMoca = function(name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addLatte, 500, '카페라떼');
}

let addLatte = function(name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
}

setTimeout(addEspresso, 500, '에스프레소');