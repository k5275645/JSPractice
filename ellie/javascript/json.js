// JSON
// Javascript Object Notation

// 1. Object to JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json); // true

json = JSON.stringify(['apple', 'banana']);
console.log(json); // ["apple","banana"]

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    // simbol은 javascript에만 있음? json으로 전환되지 않음?
    //simbol: Symbol('id'),

    // 메소드는 json으로 변환되지 않음

    jump: function(){
        console.log(`${this.name} can jump!`);
    },
};

json = JSON.stringify(rabbit);
console.log(json); // {"name":"tori","color":"white","size":null,"birthDate":"2020-11-12T06:41:58.885Z"}

json = JSON.stringify(rabbit, ["name", "color"]); // 원하는 것만 추출도 가능
console.log(json); // {"name":"tori","color":"white"}

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'ellie' : value;
});
console.log(json); // {"name":"ellie","color":"white","size":null,"birthDate":"2020-11-12T07:00:11.179Z"}

// 2. JSON to Object
// parse(json)
console.clear();
json = JSON.stringify(rabbit);
console.log(json);
const obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj); // {name: "tori", color: "white", size: null, birthDate: "2020-11-12T07:02:26.635Z"}

// rabbit 객체에서 jump라는 메소드는 화살표 함수가 아닌 일반 함수로 선언해야 name에 접근이 가능해요!
// 객체의 메소드를 화살표 함수로 선언할 경우 this는 전역객체를 가르키기 때문에 window가 출력된대요!
// jump: function() { console.log(`${this.name} can jump!`); } 또는
// jump() { console.log(`${this.name} can jump!`); }
rabbit.jump(); // tori can jump!

// obj.jump(); -> error, stringify시에 메소드값은 변환되지 않음

console.log(rabbit.birthDate.getDate()); // 12
console.log(obj.birthDate.getDate()); // 12
//obj선언시 return에서 birthDate를 조작하지 않았다면 error, birthDate가 string으로 넘어오기때문
//console.log(obj.birthDate.getDate()); 





