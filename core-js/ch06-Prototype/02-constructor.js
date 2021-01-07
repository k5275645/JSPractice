// 6-1-2 constructor 프로퍼티
// constructor 프로퍼티
let arr = [1, 2];
console.log(Array.prototype.constructor === Array); // true
console.log(arr.__proto__.constructor === Array); // true
console.log(arr.constructor === Array); // true

let arr2 = new arr.constructor(3, 4)
console.log(arr2); // (2) [3, 4]

// constructor 변경
// constructor는 읽기 전용 속성이 부여된 예외적인 경우
// (기본 리터럴 변수 - number, string, boolean)를
// 제외하고는 값을 바꿀 수 있다.
let NewConstructor = function () {
    console.log('this is new constructor');
}
let dataTypes = [
    1, // Number & false (읽기 전용 속성이 부여된 경우?)
    'test', // String & false (읽기 전용 속성이 부여된 경우?)
    true, // Boolean & false (읽기 전용 속성이 부여된 경우?)

    {}, // NewConstructor & false
    [], // NewConstructor & false
    function(){}, // NewConstructor & false
    /test/, // NewConstructor & false
    new Number(), // NewConstructor & false
    new String(), // NewConstructor & false
    new Boolean, // NewConstructor & false
    new Object(), // NewConstructor & false
    new Array(), // NewConstructor & false
    new Function(), // NewConstructor & false
    new RegExp(), // NewConstructor & false
    new Date(), // NewConstructor & false
    new Error() // NewConstructor & false
];

dataTypes.forEach(function(d){
    d.constructor = NewConstructor;
    console.log(d.constructor.name, '&', d instanceof NewConstructor);
})
// instanceof 연산자 ->
// 생성자의 prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별한다.

// 모든 데이터가 d instanceof NewConstructor 명령에 대해 false를 반환한다.
// constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 
// 원형이 바뀐다거나 데이터 타입이 변하는 것은 아니라는 것을 알 수 있다.
// 어떤 인스턴스의 생성자 정보를 알아내기 위해
// constructor 프로퍼티에 의존하는 게 항상 안전하지 않는 것.

// 다양한 constructor 접근 방법
let Person = function(name){
    this.name = name;
}
let p1 = new Person('사람1'); // Person {name: "사람1"} true
let p1Proto = Object.getPrototypeOf(p1);
let p2 = new Person.prototype.constructor('사람2'); // Person {name: "사람2"} true
let p3 = new p1Proto.constructor('사람3'); // Person {name: "사람3"} true
let p4 = new p1.__proto__.constructor('사람4'); // Person {name: "사람4"} true
let p5 = new p1.constructor('사람5'); // Person {name: "사람5"} true

[p1,p2,p3,p4,p5].forEach(function(p){
    console.log(p, p instanceof Person);
});