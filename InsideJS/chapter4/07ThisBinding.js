// 4.4.2.3 생성자 함수를 호출할 때 this 바인딩
// Person() 생성자 함수
let Person = function(name){
    // 함수 코드 실행 전
    this.name = name;
    // 함수 리턴
}

let foo = new Person('foo')
console.log(foo.name); // foo

// 객체를 생성하는 두 가지 방법(객체 리터럴 vs 생성자 함수)
// 객체 리터럴 방식
let foo1 = {
    name: 'foo',
    age: 35,
    gender: 'man'
}

console.dir(foo1);

// 생성자 함수
function Person1(name, age, gender, position){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// Person 생성자 함수를 이용해 bar 객체, baz 객체 생성
let bar = new Person1('bar', 33, 'woman');
console.dir(bar);

let baz = new Person1('baz', 33, 'woman');
console.dir(baz);
// 둘의 방법의 차이는 프로토타입 객체에 있다.
// 객체 리터럴 방식의 경우 프로토타입이 Object이지만,
// 생성자 함수 방식은 Person이다.

// 생성자 함수를 new를 붙이지 않고 호출할 경우
let qux = Person1('qux', 20, 'man');
console.log(qux); // undefined
console.log(window.name); // qux
console.log(window.age); // 20
console.log(window.gender); // man
// new없이 호출시 this는 전역 객체인 window객체로 바인딩된다.
// 생성자 함수는 별도의 리턴값이 정해져 있지 않은 경우 새로 생성된 객체가 리턴되지만,
// 일반 함수를 호출할 때는 undefined가 리턴된다.

// 결국 new를 사용하지 않고 호출한 경우 코드의 에러가 발생할 수 있으므로 다음과 같은 패턴을 사용하기도 한다.
function A(arg){
    if(!(this instanceof A))
        return new A(arg);
        this.value = arg ? arg : 0;    
}

let a = new A(100);
let b = A(10); // new를 사용하지 않았더라도, 조건문에 따라 새 인스턴스가 생성됨
console.log(a.value); // 100
console.log(b.value); // 10
// console.log(global.value); // server side 전역변수인듯?

// 4.4.2.4 call과 apply 메서드를 이용한 명시적인 this 바인딩
// apply()와 call() 메서드들은 모든 함수의 부모 객체인 Function.prototype 객체의 메서드이므로,
// 모든 함수는 다음과 같은 형식으로 apply() 메서드를 호출하는 것이 가능하다.
// function.apply(thisArg, argArray);
function Person2(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

let foo2 = {};

Person2.apply(foo2, ['foo', 30, 'man']);
console.dir(foo2);

// call() 메서드의 경우, apply()와 기능은 같지만, 두번째 인자를 배열이 아니라, 하나씩 넘긴다.
// Person.call(foo2, 'foo', 30, 'man');

// apply(), call() 메서드는 this를 원하는 값으로 명시적으로 매핑해서 특정 함수나 메서드를 호출할 수 있다.
// 대표적인 용도가 arguments객체와 같은 유사 배열 객체에서 배열 메서드를 사용하는 경우다.
function myFunction(){
    console.dir(arguments);
// arguments.shift(); 에러발생

// arguments 객체를 배열로 전환
let args = Array.prototype.slice.apply(arguments);
console.dir(args);
args.shift();
console.dir(args);
//args.slice(0,1);
//console.dir(args);
}

myFunction(1,2,3);

// slice() 메서드 사용 예제
let arrA = [1,2,3];
console.log(arrA); // (3) [1, 2, 3]
let arrB = arrA.slice() 
console.log(arrB); // (3) [1, 2, 3]
let arrC = arrA.slice(0)
console.log(arrC); // (3) [1, 2, 3]
let arrD = arrA.slice(1)
console.log(arrD); // (2) [2, 3]
let arrE = arrA.slice(1,2)
console.log(arrE); // [2]


// 4.4.3 함수 리턴
// js에서 함수는 항상 리턴값을 반환한다. return문을 사용하지 않더라도 일정 규칙을 가지고 반환한다.

// 4.4.3.1 규칙 1) 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.
let noReturnFunc = function(){
    console.log('This function has no return statement.');
}

let result = noReturnFunc(); // This function has no return statement.
console.log(result); // undefined

// 4.4.3.2 규칙 2) 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.
// 생성자 함수에서 별도의 리턴값을 지정하지 않을 경우 this로 바인딩된 새로 생성된 객체가 리턴된다.
// 생성자 함수에서 명시적으로 객체를 리턴했을 경우
function Person3(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;

    // 명시적으로 다른 객체 반환
    return {name:'bar', age:20, gender:'woman'};
}
let foo3 = new Person3('foo', 30, 'man');
console.dir(foo3);

// 같은 경우지만 객체를 return하지 않으면 무시하고 this로 바인딩된 객체가 리턴된다.
function Person4(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;

    // 명시적으로 다른 객체 반환
    return 100;
}
let foo4 = new Person4('foo', 30, 'man');
console.dir(foo4);