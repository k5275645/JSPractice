// 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this
// 함수 내부에서의 this
// -> this가 지정되지 않으면 전역 객체를 바라본다.(설계상 오류)

// 메서드의 내부함수에서의 this
// -> 함수를 실행하는 당시의 주변 환경(메서드 내부인지, 함수 내부인지 등)은 중요 X
// -> 오직 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건.

// 내부함수에서의 this
let obj = {
    outer: function () {
        //console.log(this); // {outer: ƒ}
        let innerFunc = function () {
            //console.log(this); // window{...}
        };
        innerFunc();

        let obj2 = {
            innerMethod: innerFunc
        };
        //obj2.innerMethod(); // {innerMethod: ƒ}
    }
}
obj.outer();

// 내부함수에서 this를 우회하는 방법
let obj2 = {
    outer: function () {
        //console.log(this); // // {outer: ƒ}
        let innerFunc1 = function () {
            //console.log(this); // window{...}
        };
        innerFunc1();

        let self = this; // <- self, that 등의 변수명이 쓰임
        let innerFunc2 = function () {
            //console.log(self); // {outer: ƒ}
        };
        innerFunc2();
    }
}
obj2.outer();

// this를 바인딩 하지 않는 함수
// ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자,
// this를 바인딩하지 않는 화살표 함수를 도입. 

// 화살표 함수 -> 실행 컨텍스트를 생성할 때, this를 그대로 활용할 수 있다. 이를 통해 우회법이 불필요.
let obj3 = {
    outer: function () {
        console.log(this); // {outer: ƒ}
        let innerFunc = () => {
            console.log(this); // {outer: ƒ}
        };
        innerFunc();
    }
};
obj3.outer();
// 이 밖에도 call, apply 등의 메서드를 활용해 함수를 호출할 때 명시적으로 this를 정할 수도 있다.

// 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this
// cf) 함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우 함수 A를 콜백함수라고 한다.
// setTimeout(function (){console.log(this)}, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
    console.log(this, x)
});

document.body.innerHTML += '<button id ="a">클릭</button>';
document.body.querySelector('#a')
    .addEventListener('click', function (e) {
        console.log(this, e)
    });

// 3-1-5 생성자 함수 내부에서의 this
// 생성자 함수 -> 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수.
// '생성자' -> 구체적인 인스턴스를 만들기 위한 틀.
let Cat = function (name, age) {
    this.bark = '야옹';
    this.name = name;
    this.age = age;
}

let choco = new Cat('초코', 7);
let nabi = new Cat('나비', 5);
console.log(choco, nabi);

// 3-2-1 call 메서드
// function.prototype.call(thisArg[,arg1[,arg2[, ...]]]);
// call 메서드 -> 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령.
// 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 한다.
// 함수  그냥 실행 -> this는 전역객체를 참조, call 메서드를 사용 -> 임의이 객체를 this로 지정가능.
let func2 = function (a, b, c) {
    console.log(this, a, b, c);
}

func2(1, 2, 3);
func2.call({
    x: 1
}, 4, 5, 6);

//
let obj4 = {
    a: 1,
    method: function (x, y) {
        console.log(this.a, x, y);
    }
}

obj4.method(2, 3); // 1,2,3
obj4.method.call({
    a: 4
}, 5, 6); // 4,5,6

// 3-2-2 apply 메서드
// Function.prototype.apply(thisArg[, argsArray])
// call과 기능적으로 완전히 동일
// call 메서드 -> 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정.
// apply 메서드 -> 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정.
let func3 = function (a, b, c) {
    console.log(this, a, b, c);
};
func3.apply({
    x: 1
}, [4, 5, 6]); // {x: 1}x: 1__proto__: Object 4 5 6

let obj5 = {
    a: 1,
    method: function (x, y) {
        console.log(this.a, x, y);
    }
};
obj5.method.apply({
    a: 4
}, [5, 6]); // 4, 5, 6

// 3-2-3 call / apply 메서드의 활용

// 유사배열객체에 배열 메서드를 적용
// call / apply 메서드의 활용 1-1)
let obj6 = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
console.log(obj6); // {0: "a", 1: "b", 2: "c", length: 3}
Array.prototype.push.call(obj6, 'd');
console.log(obj6); // {0: "a", 1: "b", 2: "c", 3: "d", length: 4}

let arr = Array.prototype.slice.call(obj6);
// slice 메서드
// -> 원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞 부분까지의 배열 요소를 추출
// -> 매개변수를 아무것도 넘기지 않을 경우에는 그냥 원본 배열의 얕은 복사본을 반환한다.
console.log(arr); // ["a", "b", "c", "d"]

// arguments 객체도 유사배열객체이므로 위의 방법으로 배열로 전환하여 활용할 수 있다.
// querySelectorAll, getElementByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지

// call / apply 메서드의 활용 1-2)
function aa() {
    let argv = Array.prototype.slice.call(arguments);
    argv.forEach(function (arg) {
        console.log(arg); // 1 2 3
    });
}
aa(1, 2, 3);

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
let nodeList = document.querySelectorAll('div');
let nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
    console.log(node); // <div>a</div> <div>b</div> <div>c</div>
});

// call / apply 메서드의 활용 1-3)
// 배열처럼 인덱스와 length 프로퍼티를 지니는 문자열도 마찬가지.
// 단, 문자열의 경우 length 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드
// (push, pop, shift, unshift, splice 등)는 에러를 던지며,
// concat처럼 대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로 된 결과를 얻을 수 없다.
let str = 'abc def';

// Array.prototype.push.call(str, ', pushed string');
// Uncaught TypeError: Cannot assign to read only property 'length' of object '[object String]'

console.log(Array.prototype.concat.call(str, 'string')); // (2) [String, "string"]
console.log(Array.prototype.every.call(str, function (char) {
    //console.log(char);
    return char !== '';
})); // ture
console.log(Array.prototype.every.call(str, function (char) {
    return char === '';
})); // false

let newArr = Array.prototype.map.call(str, function (char) {
    return char + '!'
});
console.log(newArr); // (7) ["a!", "b!", "c!", " !", "d!", "e!", "f!"]

let newStr = Array.prototype.reduce.apply(str, [
    function (string, char, i) {
        
        return string + char + i;
    },
    ''
]);

console.log(newStr); // a0b1c2 3d4e5f6

// call / apply 메서드의 활용 1-4)
// call, apply를 이용해 형변환 하는 것은 'this를 원하는 값으로 지정해서 호출한다'라는 의도에 안맞는다.
// ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는
// Array.from 메서드를 도입했다.
let obj7 = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
let arr2 = Array.from(obj7);
console.log(arr2); // (3) ["a", "b", "c"]

// 생성자 내부에서 다른 생성자 호출
// 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 call 또는 apply를 이용해 반복을 줄일 수 있다.
function Person(name, gender){
    this.name = name;
    this.gender = gender;
}
function Student(name, gender, school){
    Person.call(this, name, gender);
    this.school = school;
}
function Employee(name, gender, company){
    Person.apply(this, [name, gender]);
    this.company = company;
}
let by = new Student('보영', 'femail', '단국대');
let jn = new Employee('재난', 'male', '구골');
console.log(by);
console.log(jn);

// 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용 전
let numbers = [10, 20, 3, 16, 45];
let max = min = numbers[0];
numbers.forEach(function(number){
    if(number > max){
        max = number;
    }
    if(number < min){
        min = number;
    }
});
console.log(max, min); // 45 3

// 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용 후
let max2 = Math.max.apply(null, numbers);
let min2 = Math.min.apply(null, numbers);
console.log(max2, min2); // 45 3

// ES6 펼치기 연산자 사용시
let max3 = Math.max(...numbers);
let min3 = Math.min(...numbers);
console.log(max3, min3); // 45 3

