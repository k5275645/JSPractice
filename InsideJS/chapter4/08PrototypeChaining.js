// 4.5 프로토타입 체이닝
// 4.5.1 프로토타입의 두 가지 의미
// js는 프로토타입 기반의 객체지향 프로그래밍을 지원한다.
// js에는 생성자 함수로 객체를 생성한다.
// 이렇게 생성된 객체의 부모 객체가 바로 '프로토타입'이다.
// 상속 개념과 같이 자식 객체는 부모 객체의 프로퍼티 접근이나 메서드를 상속받아 호출하는 것이 가능하다.

// js에서 모든 객체는 자신을 생성한 생성자 함수의 'prototype 프로퍼티'가 가르키는
// '프로토타입 객체'를 자신의 부모 객체로 설정하는 [[Prototyp]] 링크로 연결한다.

function Person(name){
    this.name = name;
};

let foo = new Person('foo');

console.dir(Person);
console.dir(foo);
// prototype 프로퍼티는 함수의 입장에서 자신과 링크된 프로토타입 객체를 가르키고 있으며,
// 이에 반해 [[Prototype]] 링크는 객체의 입장에서 자신의 부모 객체인 프로토타입 객체를
// 내부의 숨겨진 링크로 가치키고 있다.

// js에서 객체를 생성하는건 생성자 함수의 역할이지만, 생성된 객체의 실제 부모 역할을 하는 건,
// 생성자 자신이 아닌 생성자의 prototype 프로퍼티가 가르키는 프로토타입 객체다.

// 크롬과 같은 브라우저에서는 __proto__ 프로퍼티나 [[Prototype]] 프로퍼티는 같다고 간주하면 된다.

// 4.5.2 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
// js에서 객체는 자신의 프로퍼티뿐 아니라, 부모 역할을 하는 프로토타입 객체의 프로퍼티 또한
// 자신의 것처럼 접근하는게 가능하다. 이것을 가능케 하는 것이 '프로토타입 체이닝'이다.

let myObject = {
    name: 'foo',
    sayName: function(){
        console.log('My Name is ' + this.name);
    }
};

myObject.sayName(); // My Name is foo
console.log(myObject.hasOwnProperty('name')); // true
console.log(myObject.hasOwnProperty('nickName')); // false
// myObject.sayNickName(); // Uncaught TypeError: myObject.sayNickName is not a function
// myObject.sayNickName(); -> myObject 객체에도 없고, Object.prototye객체에도 없으므로 에러가 발생.

// myObject 객체에 hasOwnProperty()메서드가 없음에도 결과가 출력됐다.
// 이는 js 표준 API함수이다.

// 객체 리터럴로 생성한 객체는 'Obeject()'라는 내장 생성자 함수로 생성된 것이다.
// Obejct()생성자 함수도 함수 객체이므로 protorype이라는 프로퍼티 속성이 있다.
// myObejct는 Obeject()함수의 prototype프로퍼티가 가르키는 Object.prototype객체를
// 자신의 프로토타입 객체로 연결한다.

// 프로토타입체이닝
// -> 해당 객체의 프로퍼티나 메서드에 접근하려고 할 때, 없다면 [[Prototype]] 링크를 따라
// 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티를 차례대로 검색하는 것.

// 4.5.3 생성자 함수로 생성된 객체의 프로토타입 체이닝
// "js에서 모든 객체는
// 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를
// 자신의 프로토타입 객체(부모 객체)로 취급한다"
function Person1(name, age, hobby){
    this.name = name;
    this.age = age;
    this.hobby = hobby;
}

let foo1 = new Person('foo', 30, 'tennis');

console.log(foo.hasOwnProperty('name')); // true
console.log(Person.prototype);
// Person.prototype역시 js객체이므로 Object.prototype을 프로토타입 객체로 가진다.
// 따라서 프로토타입 체이닝은 Object.prototype객체로 계속이어지므로 hasOwnProperty()메서드가 실행된다.

// 4.5.4 프로토타입 체이닝의 종점
// Object.prototype객체는 프로토타입 체이닝의 종점이다.

// 4.5.5 기본 데이터 타입 확장
String.prototype.testMethod = function(){
    console.log('This is the String.prototype.testMethod');
}

let str = "This is test";
str.testMethod(); // This is the String.prototype.testMethod
console.dir(String.prototype);

// 4.5.6 프로토타입도 자바스크립트 객체다.
// 함수가 생성될 때, 자신의 prototype 프로퍼티에 연결되는 프로토타입 객체는
// 디폴트로 constructor 프로퍼티만을 가진 객체다.
// 당연히 프로토타입 객체 역시 js 객체이므로 일반 객체처럼 동적으로 프로퍼티를 추가/삭제하는 것이 가능.
function Person2(name){
    this.name = name;
}

let foo2 = new Person2('foo');

//foo2.sayHello(); // Uncaught TypeError: foo2.sayHello is not a function

Person2.prototype.sayHello = function(){
    console.log('Hello');
}

foo2.sayHello(); // Hello

// 4.5.7 프로토타입 메서드와 this 바인딩
// 메서드 호출 패턴에서의 this는 그 메서드를 호출한 객체에 바인딩 된다.
function Person3(name){
    this.name = name;
}

// 프로토타입 메서드 생성
Person3.prototype.getName = function(){
    return this.name;
};

let foo3 = new Person3('foo');

console.log(foo3.getName()); // foo
// foo 객체에서 getName()메서드를 호출하면, getName()메서드는 foo 객체에서 찾을 수 없으므로
// 프로토타입체이닝이 발생. 이때 getName() 메서드를 호출한 객체는 foo이므로,
// this는 foo 객체에 바인딩 된다. 따라서 foo.getName()의 결과값으로 foo가 출력됨

console.log(Person3.prototype.getName()); // undefined

// Person.prototype 객체에 name 프로퍼티 동적추가
Person3.prototype.name = 'person';
console.log(Person3.prototype.getName()); // person
// 프로토타입 체이닝이 아니라, 바로 Person.prototype객체에 접근해서 getName() 메서드를 호출하면,
// 호출한 객체가 Person.prototype이므로 this도 여기에 바인딩 된다.
// Person.prototype 객체에 name프로퍼티를 동적으로 추가하고 'person'을 저장했으므로,
// this.name은 'person'이 출력된다.

// 4.5.8 디폴트 프로토타입은 다른 객체로 변경이 가능하다.
// 디폴트 프로토타입 객체는 함수가 생성될 때 같이 생성되며, 함수의 prototype 프로퍼티에 연결된다.
// js에서는 디폴트 프로토타입 객체를 다른 일반 객체로 변경하는 것이 가능하다.
function Person4(name){
    this.name = name;
}
console.log(Person4.prototype.constructor); 
//ƒ Person4(name){
//    this.name = name;
//}

let foo4 = new Person4('foo');
console.log(foo4.country); // undefined

Person4.prototype = {
    country: 'korea',
}
console.log(Person4.prototype.constructor); // ƒ Object() { [native code] }

let bar = new Person4('bar'); 

console.log(foo4.country); // undefined
console.log(bar.country); // korea
console.log(foo4.constructor);
// ƒ Person4(name){
//     this.name = name;
// }
console.log(bar.constructor); // Object()