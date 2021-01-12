// 데이터 할당
// let a; // 변수 a 선언
// a = 'abc' // 변수 a에 데이터 할당
// let aa = 'abc' // 변수 선언과 할당을 한 문장으로

//객체의 가변성에 따른 문제점
let user = {
    name: 'Jaenam',
    gender : 'mail'
};

let changeName = function (user, newName){
    let newUser = user;
    newUser.name = newName;
    return newUser;
};

let user2 = changeName(user, 'Jung');

console.log(user.name, user2.name); // Jung Jung
console.log(user === user2); // true

if(user !== user2){ 
    console.log('유저 정보가 변경되었습니다.') // 출력X (user === user2)
}

// 객체의 가변성에 따른 문제점 해결방법
let changeName2 = function(user, newName){
    return{
        name: newName,
        gender : user.gender
    };
};

let user3 = changeName2(user, 'Jung2')

console.log(user.name, user3.name); // Jung Jung2
console.log(user === user3); // false

if(user !== user3){
    console.log('유저 정보가 변경되었습니다.') // 유저 정보가 변경되었습니다.
}