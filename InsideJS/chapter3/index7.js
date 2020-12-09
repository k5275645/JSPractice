// 배열 생성
let arr = ['zero', 'one', 'two']
console.log(arr.length) // 3

// 프로퍼티 동적 추가
arr.color = 'blue'
arr.name = 'number_array'
console.log(arr.length) // 3
console.log(arr) // (3) ["zero", "one", "two", color: "blue", name: "number_array"]

// 배열 원소 추가
arr[3] = 'red'
console.log(arr.length) // 4
console.log(arr) // (4) ["zero", "one", "two", "red", color: "blue", name: "number_array"]
console.dir(arr) // Array(4)

//
for(let prop in arr){
    console.log(prop, arr[prop])
}

for(let i=0; i < arr.length; i++){
    console.log(i, arr[i])
}