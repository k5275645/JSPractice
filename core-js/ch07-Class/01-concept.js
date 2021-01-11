// 08 클래스

// js는 프로토타입 기반 언어라서 '상속'개념이 존재하지 않는다.
// 하지만 class기반의 다른 언어에 익숙한 개발자들이 혼란스러워했고,
// ES6문법에는 클래스 문법이 추가 됐다.
// 다만 ES6의 클래스에서도 일정 부분은 프로토타입을 활용하고 있기 때문에,
// ES5 체제 하에서 클래스를 흉내내기 위한 구현 방식을 학습하는 것도 의미가 있다.

// 01 클래스와 인스턴스의 개념 이해

// 02 자바스크립트의 클래스

// 스태틱 메서드, 프로토타입 메서드
// 생성자
let Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
}
// (프로토타입) 메서드 -> 인스턴스에서 접근 가능
Rectangle.prototype.getArea = function(){
    return this.width * this.height;
};
// 스태틱 메서드 -> 인스턴스에서 접근 불가능
Rectangle.isRectangle = function (instance) {
    return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
}

let rect1 = new Rectangle(3,4);
console.log(rect1.getArea()); // 12
//console.log(rect1.isRectangle(rect1)); // Uncaught TypeError: rect1.isRectangle is not a function
console.log(Rectangle.isRectangle(rect1)); // true

// 03 클래스 상속
// 7-3-1 기본구현
// js에서 클래스 상속을 구현했다는 것은 결국 프로토타입 체이닝을 잘 연결한 것으로 이해하면 됨.

// 7-3-2 클래스가 구체적인 데이터를 지니지 않게 하는 방법

// 7-3-3 constructor 복구하기
// 7-3-4 상위 클래스에의 접근 수단 제공

// 04 ES6의 클래스 및 클래스 상속
// ES5와 ES6의 클래스 문법 비교
let ES5 = function (name) {
    this.name = name;
}
ES5.staticMethod = function () {
    return this.name + ' staticMethod';
}
ES5.prototype.method = function () {
    return this.name + ' method';
}
let es5Instance = new ES5('es5');
console.log(ES5.staticMethod()); // ES5 staticMethod
console.log(es5Instance.method()); // es5 method
console.dir(ES5);

let ES6 = class {
    constructor (name) {
        this.name = name;
    }
    static staticMethod () {
        return this.name + ' staticMethod';
    }
    method () {
        return this.name + ' method';
    }
};
let es6Instance = new ES6('es6');
console.log(ES6.staticMethod()); // ES6 staticMethod
console.log(es6Instance.method()); // es6 method
console.dir(ES6);

// ES6의 클래스 상속
let Rectangle2 = class {
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }
    getArea () {
        return this.width * this.height;
    }
};

let Square = class extends Rectangle2  {
    constructor (width){
        super(width, width);
    }
    getArea () {
        console.log('size is : ' , super.getArea());
    }
};

let ss = new Square(5);
console.log(ss);
console.log(ss.getArea()); // size is :  25