// 06 undefined와 null
// js엔진이 undefined를 반환하는 경우

// [1] 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때
let a;
console.log(a); // undefined

// [2] 객체 내부의 존재하지 않는 프로퍼티에 접근하려고 할 때
let objjj = { a: 1};
console.log(objjj.a); // 1
console.log(objjj.b); // undefined

// [3] return문이 없거나 호출되지 않는 함수의 실행 결과
let func = function(){};
let c = func(); // return값이 없으면 undefined를 반환한 것으로 간주.
console.log(c); // undefined

// undefined와 배열
// '비어있는 요소'와 'undefined를 할당한 요소'는 출력결과부터 다르다.
// 비어있는 요소는 순회와 관련된 많은 배열 메서드들의 순회 대상에서 제외된다.

// undefined와 null 비교
let n = null;
console.log(typeof n); // object, js의 버그?

console.log(n == undefined); // true
console.log(n == null); // true
console.log(n === undefined); // false
console.log(n === null); // true