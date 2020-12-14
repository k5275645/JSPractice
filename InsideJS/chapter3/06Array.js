let emptyArr = []
console.log(emptyArr) // []
console.log(emptyArr.length) // 0
console.log(emptyArr[0]) // undefined

emptyArr[0] = 100;
emptyArr[3] = 'eight';
emptyArr[7] = true;
console.log(emptyArr) // (8) [100, empty × 2, "eight", empty × 3, true]
console.log(emptyArr[6]) // undefined
console.log(emptyArr.length) // 8 -> 배열의 크기는 인덱스 중 가장 큰 값을 기준으로 정하기 때문

emptyArr.length = 10
console.log(emptyArr) // (10) [100, empty × 2, "eight", empty × 3, true, empty × 2]

emptyArr.length = 5
console.log(emptyArr) // (5) [100, empty × 2, "eight", empty]

emptyArr.push(true)
console.log(emptyArr) // (6) [100, empty × 2, "eight", empty, true]

// delete 연산자는 해당 요소의 값을 undefined로 설정할 뿐 원소 자체를 삭제하지는 않는다.
delete emptyArr[3]
console.log(emptyArr) // (6) [100, empty × 4, true]

// 배열의 요소를 완전히 삭제하기 위해서는 splice를 사용한다.
emptyArr.splice(2,1)
console.log(emptyArr) // (5) [100, empty × 3, true]

// array, object
let a = []
let b = {}
console.log(a) // []
console.log(b) // {}
console.dir(a) // Array(0)
console.dir(b) // Object

// 객체 -> (proto) -> Object.prototype
// 배열 -> (proto) -> Array.prototype -> (proto) -> Object.prototype
