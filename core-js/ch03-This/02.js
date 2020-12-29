// 3-2-4 bind 메서드
// Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
// call과 비슷하지만 즉시 호출하지는 않고
// 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드.
// 다시 새로운 함수를 호출할 때 인수를 넘기면
// 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록된다.
// 즉 bind 메서드는 함수에 this를 미리 적용하는 것과
// 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닌다.

// bind메서드 - this 지정과 부분 적용 함수 구현
let func = function(a,b,c,d){
    console.log(this,a,b,c,d);
}
func(1,2,3,4); // Window {...} 1 2 3 4

let bindFunc1 = func.bind({x:1});
bindFunc1(5,6,7,8); // {x: 1} 5 6 7 8

let bindFunc2 = func.bind({x:1}, 4,5);
bindFunc2(6,7); // {x: 1} 4 5 6 7 -> 최초 func함수에 4,5,6,7을 넘긴것과 같은 동작을 함.
bindFunc2(8,9); // {x: 1} 4 5 8 9

// name 프로퍼티
// bind 메서드를 적용해서 새로 만든 함수는 독특한 성질을 갖는다.
// name프로퍼티에 동사 bind의 수동태인 'bound'라는 접두어가 붙는다는 점.
// call이나 apply보다 코드를 추적하기 더 수월.
console.log(func.name); // func
console.log(bindFunc1.name); // bound func

// 상위 컨텍스트의 this를 내부함수나 콜백함수에 전달하기
// 내부함수에 this 전달 - call vs. bind
let obj = {
    outer : function(){
        console.log(this); // {outer: ƒ}
        let innerFunc = function(){
            console.log(this); // {outer: ƒ}
        }
        innerFunc.call(this);
    }
};
obj.outer();

let obj2 = {
    outer : function(){
        console.log(this); // {outer: ƒ}
        let innerFunc = function(){
            console.log(this); // {outer: ƒ}
        }.bind(this);
        innerFunc();
    }
};
obj2.outer();

// bind 메서드 - 내부함수에 this 전달
let obj3 = {
    logThis: function (){
        console.log(this);
    },
    logThisLater1: function(){
        setTimeout(this.logThis, 500);
    },
    logThisLater2: function(){
        setTimeout(this.logThis.bind(this), 1000);
    }
};
//obj3.logThisLater1(); // Window {...}
//obj3.logThisLater2(); // {logThis: ƒ, logThisLater1: ƒ, logThisLater2: ƒ}

// 3-2-5 화살표 함수의 예외사항
// ES6에 새로 도입된 화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외됐다.
// 즉, 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근한다.
let obj4 = {
    outer: function(){
        console.log(this); // {outer: ƒ}
        let innerFunc = () => {
            console.log(this); // {outer: ƒ}
        };
        innerFunc();
    }
};
obj4.outer();

// 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)
// 콜백 함수는 다음장에서 자세히
let report = {
    sum: 0,
    count: 0,
    add: function(){
        let args = Array.prototype.slice.call(arguments);
        args.forEach(function(entry){
            this.sum += entry;
            ++this.count;
        }, this);
    },
    average: function(){
        return this.sum / this.count;
    }
}
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average()); // 240 3 80

