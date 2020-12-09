

let foo = {
    name : 'foo',
    major : 'computer science'
}

// 객체 프로퍼티 읽기
console.log(foo.name) // foo
console.log(foo['name']) // foo
console.log(foo.major) // computer science
console.log(foo.nickname) // undefined

// 객체 프로퍼티 갱신
foo.major = 'electronics engineering'
console.log(foo.major) // electronics engineering
console.log(foo['major']) // electronics engineering

// 객체 프로퍼티 동적 생성
foo.age = 30
console.log(foo.age) // 30
console.log(foo['age']) // 30

// 대괄호 표기법을 사용해야 할 경우
foo['full-name'] = 'foo let'
console.log(foo['full-name']) // foo let
//연산자('-')가 있어서 []를 통해 접근해야함, foo.full - name 으로 인식
console.log(foo.full-name) // NaN(Not a Number)

// for in 문을 이용한 객체 프로퍼티 출력
for(let prop in foo){
    console.log(prop, foo[prop]);
}
// name foo
// major electronics engineering
// age 30
// full-name foo let

