// 2-3-2 스코프, 스코프 체인, outerEnvironmentReference

// 스코프 -> 식별자에 대한 유효범위
// 스코프체인 -> '식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해 나가는 것.

// 여러 스코프에서 동일한 식별자를 선언한 경우
// -> 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하다.

// 스코프 체인
var aa = 1;
var outer = function(){
    var inner = function(){
        console.log(aa); // undefined
        var aa = 3;
    };
    inner(); 
    console.log(aa); // 1
};
outer();
console.log(aa); // 1

// 참고
var aaa = 1;
var outer2 = function(){
    var bbb = 2;
    var inner2 = function(){
        console.log(bbb); // 2
        console.dir(inner2);
        //debugger;
    };
    inner2();
};
outer2();
