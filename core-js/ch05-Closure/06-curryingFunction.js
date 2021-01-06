// 5-3-4 커링함수
// -> 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서
// 순차적으로 호출될 수 있게 체인 형태로 구성한 것.
// 한 번에 하나의 인자만 전달하는 것을 원칙으로 함.

// 커링 함수 (1)
let curry3 = function (func) {
    return function (a) {
        return function (b) {
            console.log('a: ' + a);
            console.log('b: ' + b);
            return func(a, b);
        }
    }
}

// Math.max -> 입력값 중 가장 큰 값을 반환
let getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

// Math.min -> 입력값 중 가장 작은 값을 반환
let getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8)); // 8
console.log(getMinWith10(25)); // 10

// 커링 함수(2) - 인자가 많아진 경우
// let curry5 = function (func) {
//     return function (a) {
//         return function (b) {
//             return function (c) {
//                 return function (d) {
//                     return function (e) {
//                         return func(a, b, c, d, e);
//                     }
//                 }
//             }
//         }
//     }
// }

let curry5 = (func) => a => b => c => d => e => func(a,b,c,d,e);

let getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5)); // 5
// 결국 마지막 인자가 넘어갈 때까지 함수 실행을 미루는 셈이 된다
// 함수형 프로그래밍에서는 이를 지연실행(lazy execution)이라고 칭한다.

// 다른 ex
// let getInformation = function(baseUrl){ // 서버에 요청할 주소의 기본 Url
//     return function(path){ // path 값
//         return function(id){ // id 값
//             return fetch(baseUrl + path + '/' + id); // 실제 서버에 정보를 요청
//         }
//     }
// }

let getInformation = baseUrl => path => id => fetch(baseUrl + path + '/' + id);