// 4.4.2 호출 패턴과 this 바인딩
// 함수를 호출할 때 인자값에 더해, 'arguments객체' 및 'this 인자'가 함수 내부로 전달 된다.
// this를 이해하기 어려운 이뉴는 함수가 호출되는 방식에 따라 this가 다른 객체를 참조하기 때문이다.(this 바인딩)

// 4.4.2.1 객체의 메서드 호출할 때 this 바인딩
// 객체의 프로퍼티가 함수일 경우, 메서드라고 부른다.
// 메서드를 호출할 때, 메서드 내부 코드에서 사용된 this는 '해당 메서드를 호출한 객체로 바인딩'된다.
let myObject = {
    name: 'foo',
    sayName: function () {
        console.log(this.name);
    }
}

let otherObject = {
    name: 'bar'
}

otherObject.sayName = myObject.sayName;

myObject.sayName(); // foo
otherObject.sayName(); // bar

// 4.4.2.2 함수를 호출할 때 this 바인딩
// js에서 함수를 호출하면, 해당 함수 내부 코드에 사용된 'this는 전역 객체에 바인딩' 된다.
// 브라우저에서 js를 실행하는 경우 전역 객체는 'window 객체'가 된다.
// Node.js와 같은 런타임 환경에서 전역 객체는 global 객체가 된다.

let foo = "I'm foo"; // 전역 변수 선언
console.dir(foo); // I'm foo
console.log(window.foo); // undefined, let이 아니라 var로 바꾸면 I'm foo 출력.

let test = 'This is test';
console.log(window.test); // undefined, let이 아니라 var로 바꾸면 This is test 출력.

let sayFoo = function () {
    console.log(this.test); // sayFoo() 함수 호출 시 this는 전역 객체에 바인딩 된다.
}

sayFoo(); // undefined, let이 아니라 var로 바꾸면 This is test 출력.
// sayFoo()함수가 호출된 시점에 this는 전역객체인 window에 바인딩 된다.
// 따라서, this.test는 window.test를 의미

// this바인딩 특성은 내부함수를 호출했을 경우에도 그대로 적용된다.
var value = 100;

let myObject1 = {
    value: 1,
    func1: function () {
        this.value += 1;
        console.log('func1() called, this.value : ' + this.value);

        func2 = function () {
            this.value += 1;
            console.log('func2() called, this.value : ' + this.value);

            func3 =  function () {
                this.value += 1;
                console.log('func3() called, this.value : ' + this.value);
            }
            func3();
        }
        func2();
    }
};
myObject1.func1();
//func1() called, this.value : 2
//func2() called, this.value : value가 let이면 NaN, var면 101
//func3() called, this.value : value가 let이면 NaN, var면 102

// 101, 102가 되는 이유는 js는 내부 함수 호출 패턴을 정의해 놓지 않기 때문이다.
// 결국 내부함수도 호출시 this는 전역객체(window)에 바인딩 된다.
// 이러한 한계를 극복하려면, 부모함수의 this를 내부 함수가 접근 가능한 다른 변수에 저장하는 방법이 있다.
// var value1 = 100;

let myObject2 = {
    value: 1,
    func1: function () {
        let that = this;

        this.value += 1;
        console.log('func1() called, this.value : ' + this.value);

        func2 = function () {
            that.value += 1;
            console.log('func2() called, this.value : ' + that.value);

            func3 =  function () {
                that.value += 1;
                console.log('func3() called, this.value : ' + that.value);
            }
            func3();
        }
        func2();
    }
};
myObject2.func1();
//func1() called, this.value : 2
//func2() called, this.value : 3
//func3() called, this.value : 4

