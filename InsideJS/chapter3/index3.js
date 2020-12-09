let objA = {
    val : 40
}
let objB = objA

console.log(objA.val) // 40
console.log(objB.val) // 40

objB.val = 500

console.log(objA.val) // 500
console.log(objB.val) // 500

// objA 변수는 객체 자체를 저장하고 있는 것이 아니라,
// 생선된 객체를 가리키는 참조값을 저장하고 있다.

// objB에 objA가 할당되면, 둘다 동일한 객체를 가리키는 참조값을 가지게 된다.

// 위처럼 objA는 실제로는 객체를 참조하는 값을 저장할 뿐 실제 객체를 나타내지는 않는다.

let a = 100
let b = 100

let objC = {value: 100}
let objD = {value: 100}
let objE = objD

console.log(a == b) // true
console.log(objC == objD) //false
console.log(objD == objE) // ture

// 기본 타입의 경우네는 값 자체를 비교해서 일치여부를 판단하지만,
// 객체와 같은 참조 타입의 경우는 참조값이 같아야 true