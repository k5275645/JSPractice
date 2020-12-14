// call by value 와 call by reference의 차이
let a = 100
let objA = { value : 100 }

function changeArg(num, obj){
    num = 200
    obj.value = 200

    console.log(num)
    console.log(obj.value)
}

changeArg(a, objA)
// 200
// 200

console.log(a) // 100
console.log(objA.value) // 200

// 값에 의한 호출방식 -> 함수를 호출할 때 인자로 기본 타입의 값을 넘길 경우, 복사된 값이 전달된다.
// 때문에 함수 내부에서 매개변수를 이용해 값을 변경해도, 실제로 호출된 변수의 값이 변하지는 않는다.

// 참조에 의한 호출방식 -> 함수를 호출할 때는 복사되지 않고, 넘긴 객체의 참조값이 그대로 전달된다.
// 때문에 함수 내부에서 참조값을 이요해서 인자로 넘긴 실제 객체의 값을 변경할 수 있다.



