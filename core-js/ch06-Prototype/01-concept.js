// ch06 프로토타입
// js는 프로토타입 기반 언어.
// 클래스 기반 언어에서는 '상속'을 사용하지만,
// 프로토타입 기반 언어에서는 어떤 객체를 원형(prototype)으로 삼고
// 이를 복제(참조)함으로써, 상속과 비슷한 효과를 얻는다.

// 01 프로토타입의 개념 이해
// 6-1-1 constructor, prototype, instance
// let instance = new Constructor();

// Person.prototype
let Person = function(name){
    this._name = name;
}
Person.prototype.getName = function(){
    return this._name;
};
// Person의 인스턴스는 __proto__프로퍼티를 통해 getName을 호출할 수 있다.

let suzi = new Person('Suzi'); // suzi는 Person의 인스턴스

console.log(Person.prototype === suzi.__proto__); // true
// instance의 __proto__ 가 Constructor의 prototype 프로퍼티를 참조하므로
// 결국 둘은 같은 객체를 바라본다.

console.log(suzi.__proto__.getName()); // undefined 
// -> 'Suzi'가 안나온 것보다 에러가 발생하지 않았다는 것에 주목.
// 만약 실행할 수 없는 함수였다면, TypeError가 발생했을 것. -> getName은 함수임
// 문제는 this에 바인딩 된 대상이 잘못 지정됐다는 것.

// 어떤 함수를 '메서드로서'호출할 때는 메서드명 바로 앞에 객체가 곧 this가 된다.
// 위에서 this는 suzi가 아니라 suzi.__proto__라는 개체가 된다.
// 이 객체 내부에는 name 프로퍼티가 없으므로,
// '찾고자 하는 식별자가 정의돼 있지 않을 때는 Error대신 undefined를 반환한다'라는
// 자바스크립트 규약에 의해 undefined가 반환된 것.

// 만약 __proto__객체에 name 프로퍼티가 있다면?
suzi.__proto__._name = 'SUZI__proto__';
console.log(suzi.__proto__.getName()); // SUZI__proto__
// 관건은 this다.
// this를인스턴스로 할 수 있으려면, __proto__없이 인스턴스에서 곧바로 메서드를 쓰는 것.
let suzi2 = new Person('Suzi2', 28);
console.log(suzi2.getName()); // Suzi2
let iu = new Person('Jieun', 28);
console.log(iu.getName()); // Jieun
// 가능한 이유는 js에서 __proto__가 생략 가능한 프로퍼티이기 때문이다.
// js를 설계한 사람의 아이디어이므로 받아들일 수밖에 없다.
/*
suzi.__proto__.getName();
-> suzi(.__proto__).getName();
-> suzi.getName();
*/

// 한문장으로 요약하면,
// "new 연산자로 Constructor를 호출하면 intance가 만들어지는데,
// 이 instance의 생략 가능한 프로퍼티인 __proto__는 Constructor의 prototype을 참조한다!"

// 생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면,
// 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.

let Constructor = function(name){
    this.name = name;
}
Constructor.prototype.method1 = function(){};
Constructor.prototype.property1 = 'Constructor Prototype Property';

let instance = new Constructor('Instance');
console.dir(Constructor);
console.dir(instance);

let arr = [1,2];
console.dir(arr);
console.dir(Array);

arr.forEach(function(){});
console.log(Array.isArray(arr)); // true
// arr.isArray(); // Uncaught TypeError: arr.isArray is not a function











