// 02 프로토타입 체인

// 6-2-1 메서드 오버라이드
// protytype객체를 참조하는 __proto__를 생략하면 인스턴스는 prototpe에 정의된
// 프로퍼티나 메서드를 마치 자신의 것처럼 사용할 수 있다.
// 하지만 만약 인스턴스가 동일한 이름의 프로퍼티 또는 메서드를 가지고 있는 상황이라면?

// 메서드 오버라이드
let Person = function (name) {
    this.name = name;
}

Person.prototype.getName = function (){
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

console.log(iu.__proto__.getName()); // undefined
