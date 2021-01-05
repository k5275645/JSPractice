// ch05 클로저
// 클로저 -> 프로그래밍 언어에서 등장하는 보편적 특성, 이를 설명하는 다양한 문장이 있다.

// 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수.
// 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것.
// 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수.
// 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수.
// 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합.
// 로컬 변수를 참조하고 있는 함수 내의 함수.
// 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중,
// 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수.

// 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상.

// 외부 함수의 변수를 참조하는 내부 함수(1)
let outer = function (){
    let a = 1;
    let inner = function (){
        console.log(++a);
    };
    inner();
};
outer(); // 2

// 외부 함수의 변수를 참조하는 내부 함수(2)
let outer2 = function(){
    let a = 1;
    let inner = function(){
        return ++a;
    };
    return inner(); // 함수의 실행 결과를 리턴
}
let outer3 = outer2();
console.log(outer3); // 2
console.log(outer3); // 2
// 예제 1,2는 outer 함수의 실행 컨텍스트가 종료되기 이전에 inner 함수의 실행 컨텍스트가 종료됨,
// 이후 별도로 inner 함수를 호출할 수 없다.

// outer실행 컨텍스트가 종료된 후에도 inner함수를 호출 할 수 있게 하려면 아래와 같다

// 외부 함수의 변수를 참조하는 내부 함수(3)
let outer4 = function(){
    let a = 1;
    let inner = function(){
        return ++a;
    }
    return inner; // 함수 자체를 리턴
}
let outer5 = outer4();
console.log(outer5()); // 2
console.log(outer5()); // 3, p120에 설명이 있는데 이해하기 어렵다.
// outer 함수는 이미 실행 종료 상태인데, 어떻게 가능한가? 가비지 컬렉터의 동작 방식때문이다.(?)

// 클로저 -> 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우,
// A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상.

// 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수.

// 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수.

// 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중,
// 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수.

// 주의할 점은 '외부로 전달'이 곧 return 만을 의미하는 것은 아니라는 것.
// return 없이도 클로저가 발생하는 다양한 경우
// (1) setInterval/setTimeout
// 별도의 외부객체인 window의 메서드에 전달할 콜백 함수 내부에서 지역변수를 참조한다.
(function(){
    let a = 0;
    let intervalId = null;
    let inner = function(){
        if(++a >= 10){
            clearInterval(intervalId)
        }
        console.log(a);
    };
    intervalId = setInterval(inner, 100);
})();
// (2) eventListener
// 별도의 외부객체인 DOM의 메서드에 등록할 handler 함수 내부에서 지역변수를 참조한다.
(function (){
    let count = 0;
    let button = document.createElement("button");
    button.innerText = 'click';
    button.addEventListener('click', function(){
        console.log(++count, 'thimes clicked');
    });
    document.body.appendChild(button);
})();