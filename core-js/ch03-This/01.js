// ch03 this
// this -> 실행 컨텍스트가 생성될 때 함께 결정된다.
// this -> 함수를 호출할 때 결정된다.
//console.log(this); // Window {window: Window,…}
//console.log(window); // Window {window: Window,…}
console.log(this === window); // true

// 전역변수를 선언하면 js 엔진은 이를 전역객체의 프로퍼티에도 할당한다.
var a = 1;
// console.log(a); // 1
// console.log(this.a); // 1, a가 let으로 선언되면 undefined
// console.log(window.a); // 1, a가 let으로 선언되면 undefined

// 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this
// 함수 vs 메서드 -> 유일한 차이는 독립성 
// 함수 -> 그 자체로 독립적인 기능 수행
// 메서드 -> 자신을 호출한 대상 객체에 관한 동작 수행

// js는 상화렵로 this 키워드에 다른 값을 부여하게 함으로써 이를 구현했다.?

// 메서드를 흔히 '객체의 프로퍼티에 할당된 함수'로 이해
// 객체의 프로퍼티에 할당한다고해서 그 자체로서 무조건 메서드가 되는 것이 아니라,
// 객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 아니면 함수로 동작한다.

// 함수앞에 점(.)이 있는지 여부로 간단히 구분 가능.
// 점(.)을 찍으면 메서드로서 호출한 것.(대괄효 표기법도 마찬가지)
// 함수 호출시 그 함수 이름(프로퍼티명) 앞에 객체가 명시돼 이쓴ㄴ 경우에는 메서드로 호출된 것,
// 그렇지 않은 모든 경우에는 함수로 호출된 것.
let func = function (x) {
    console.log(this, x);
};
// func(1); // window{...} 1 -> 함수로 호출시 this

let obj = {
    method: func
};
// obj.method(2); // {method: ƒ} 2, 점 표기법
// obj['method'](2); // {method: ƒ} 2, 대괄호 표기법

// this에는 호출한 주체에 대한 정보가 담긴다.
// 어떤 함수를 메서드로서 호출하는 경우, 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체입니다.
// 점 표기법의 마지막 점 앞에 명시된 객체가 곧 this가 되는 것.
