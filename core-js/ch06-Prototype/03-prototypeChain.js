// 02 프로토타입 체인

// 6-2-1 메서드 오버라이드
// protytype객체를 참조하는 __proto__를 생략하면 인스턴스는 prototpe에 정의된
// 프로퍼티나 메서드를 마치 자신의 것처럼 사용할 수 있다.
// 하지만 만약 인스턴스가 동일한 이름의 프로퍼티 또는 메서드를 가지고 있는 상황이라면?

// 메서드 오버라이드
let Person = function (name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
}

let iu = new Person('지금');
console.log(iu.getName()); // 지금

iu.getName = function () {
    return '바로 ' + this.name;
}
console.log(iu.getName()); // 바로 지금 (오버라이드)
// 원본을 다른 대상으로 교체하는 것이 아니라,
// 메서드 위에 메서드를 얹는다.

// 오버라이딩이 이뤄져 있는 상황에서 prototype에 있는 메서드에 접근하려면?
console.log(iu.__proto__.getName()); // undefined
// this가 prototype객체(iu.__proto__)를 가리키는데 prototype상에는 name프로퍼티가 없기 때문.

Person.prototype.name = '이지금';
console.log(iu.__proto__.getName()); // 이지금
// 원하는 메서드가 호출되었지만, this가 prototype을 바라보고 있다.
// 이를 인스턴스를 바라보도록 call이나 apply로 바꿔주면 된다.
console.log(iu.__proto__.getName.call(iu)); // 지금
// 일반적인 메서드가 오버라이드된 경우에는 자신으로부터 가장 가까운 메서드에만 접근할 수 있지만,
// 그 다음으로 가까운 __proto__의 메서드도 우회적인 방법을 통해서긴 하지만 접근 가능하다.

// 6-2-2 프로토타입 체인
console.dir({
    a: 1
});
console.dir([1, 2]);

// 배열에서 배열 메서드 및 객체 메서드 실행
let arr = [1, 2];
arr.push(3);
console.log(arr.hasOwnProperty(2)); // true
// cf) hasOwnProperty() 메소드 -> 객체가 특정 프로퍼티를 가지고 있는지를  나타내는 불리언 값을 반환한다.

// 프로토타입 체인 : 어떤 데이터의 __proto__프로퍼티내부에서 다시 __proto__프로퍼티가 연쇄적으로 이어진 것.
// 프로토타입 체이닝 : 프로토타입 체인을 따라가며 검색하는 것.

// 메서드 오버라이드와 프로토타입 체이닝
console.log(Array.prototype.toString.call(arr)); // 1,2,3
console.log(Object.prototype.toString.call(arr)); // [object Array]
console.log(arr.toString()); // 1,2,3

arr.toString = function () {
    return this.join('_');
};
console.log(arr.toString()); // 1_2_3

// 6-2-3 객체 전용 메서드의 예외사항

// Object.prototype에 추가한 메서드에서의 접근
Object.prototype.getEntries = function () {
    let res = [];
    for (let prop in this) {
        //console.log(this);
        //console.log(this.hasOwnProperty(prop));
        //console.log(prop);
        if (this.hasOwnProperty(prop)) {
            res.push([prop, this[prop]]);
        }
    }
    return res;
};

let data = [
    ['object', {
        a: 1,
        b: 2,
        c: 3
    }], // (3) [Array(2), Array(2), Array(2)], [["a", 1], ["b", 2], ["c", 3]]
    ['number', 345], // []
    ['string', 'abc'], // (3) [Array(2), Array(2), Array(2)], [["0", "a"], ["1", "b"], ["2", "c"]]
    ['boolean', false], // []
    ['func', function () {}], // []
    ['array', [1, 2, 3]], // (3) [Array(2), Array(2), Array(2)], [["0", 1], ["1", 2], ["2", 3]]
];

data.forEach(function (datum) {
    console.log(datum[1].getEntries());
});
// 원래 라면, 객체가 아닌 다른 데이터 타입에 대해서는 오류를 던지게끔 돼야 할 텐데, 
// 어느 데이터 타입이건 거의 무조건 프로토타입 체이닝을 통해 getEntries메서드에 접근 할 수 있으니 오류가 나진않는다.

// 6-2-4 다중 프로토타입 체인
// Grade 생성자 함수와 인스턴스
let Grade = function () {
    let args = Array.prototype.slice.call(arguments);
    // console.log(arguments); // Arguments(2) [100, 80, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    // console.log(args); // (2) [100, 80]
    // console.log(this); // Grade {}
    for (let i = 0; i < args.length; i++) {
        // console.log(args[i]); // 100 80
        this[i] = args[i];
        // console.log(this[i]); // 100 80
    }
    this.length = args.length;
};
let g = new Grade(100, 80);
// 변수 g는 Grade의 인스턴스를 바란본다.
// Grade의 인스턴스는 여러 개의 인자를 받아 각각 순서대로 인덱싱해서 저장하고 length 프로퍼티가 존재하는 등,
// 배열의 형태를 지니지만, 배열의 메서드를 사용할 수는 없는 유사배열객체다.
// 기왕 생성자 함수를 직접 만든 김에 배열 메서드를 직접 쓸 수 있게끔 하려면,
// g.__proto__, 즉 Grade.prototype이 배열의 인스턴스를 바라보게 하면된다.
console.log(g);
// let test = [];
Grade.prototype = [];

console.log(g); // Grade {0: 100, 1: 80, length: 2}
// g.pop(); // Uncaught TypeError: g.pop is not a function ??? 다중 프로토 타입 체인이 일어나지 않는다??
console.log(g); // Grade {0: 100, 1: 80, length: 2}