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

if(user !== user2){
    console.log('유저 정보가 변경되었습니다.')
}

console.log(user.name, user2.name); // Jung Jung
console.log(user === user2); // true

// 객체의 가변성에 따른 문제점 해결방법
let changeName2 = function(user, newName){
    return{
        name: newName,
        gender : user.gender
    };
};

let user3 = changeName2(user, 'Jung2')

if(user !== user3){
    console.log('유저 정보가 변경되었습니다.')
}

console.log(user.name, user3.name); // Jung Jung2
console.log(user === user3); // false

// 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)
let copyObject = function(target){
    let result = {};
    for(let prop in target){
        result[prop] = target[prop];
        console.log(prop);
    }
    return result;
};

let user4 = copyObject(user);
user4.name = 'Jung3';

if(user !== user4){
    console.log('유저 정보가 변경되었습니다.');
}

console.log(user.name, user4.name); // Jung Jung3
console.log(user === user4); // false

// 1-5-2 얕은 복사와 깊은 복사
// 중첩된 객체에 대한 얕은 복사
let useruser = {
    name: 'Jaenam',
    urls:{
        portfolio: 'http://github.com/abc',
        blog: 'http://blog.com',
        facebook: 'http://facebook.com/abc'
    }
};

let useruser2 = copyObject(useruser);
useruser2.name = 'Jung'
console.log(useruser.name === useruser2.name); // false

useruser.urls.portfolio = 'http://portfolio.com';
console.log(useruser.urls.portfolio === useruser2.urls.portfolio); // true

useruser2.urls.blog = '123';
console.log(useruser.urls.blog === useruser2.urls.blog); // true
// useruser객체에 직접속한 프로퍼티에 대해서는 복사해서 완전히 새로운 데이터가 만들어지는 반면,
// 한 단계 더 들어간 urls의 내부 프로퍼티들은 기존 데이터를 그대로 참조함
// 이를 방지하려면 useruser.urls프로퍼티에 대해서도 불변 객체로 만들 필요가 있다.

// 중첩된 객체에 대한 깊은 복사
let useruser3 = copyObject(useruser);
useruser3.urls = copyObject(useruser.urls);

useruser.urls.portfolio = 'http://protfolio2.com';
console.log(useruser.urls.portfolio); // http://protfolio2.com
console.log(useruser3.urls.portfolio); // http://portfolio.com
console.log(useruser.urls.portfolio === useruser3.urls.portfolio); // false

useruser3.urls.blog = 'abc';
console.log(useruser.urls.blog); // 123
console.log(useruser3.urls.blog); // abc
console.log(useruser.urls.blog === useruser3.urls.blog); // false

// 객체의 깊은 복사를 수행하는 범용 함수
let copyObjectDeep = function(target){
    let result = {};
    if (typeof target === 'object' && target !== null){
        for(let prop in target){
            console.log(prop);
            result[prop] = copyObjectDeep(target[prop]);
        }
    } else {
        result = target;
    }
    return result;
};

let obj = {
    a: 1,
    b: {
        c: null,
        d: [1,2]
    }
};
let obj2 = copyObjectDeep(obj);
obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj);
console.log(obj2);

// JSON을 활용한 간단한 깊은 복사
let copyObjectViaJSON = function(target){
    return JSON.parse(JSON.stringify(target));
}

let objobj = {
    a: 1,
    b: {
        c: null,
        d: [1,2],
        func1: function(){console.log(3);},
        func2: function(){console.log(4);}
    }
};

let objobj2 = copyObjectViaJSON(objobj);

objobj2.a = 3;
objobj2.b.c = 4;
objobj.b.d[1] = 3;

console.log(objobj);
console.log(objobj2);

// 06 undefined와 null
// js엔진이 undefined를 반환하는 경우

// [1] 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때
let a;
console.log(a); // undefined

// [2] 객체 내부의 존재하지 않는 프로퍼티에 접근하려고 할 때
let objjj = { a: 1};
console.log(objjj.a); // 1
console.log(objjj.b); // undefined

// [3] return문이 없거나 호출되지 않는 함수의 실행 결과
let func = function(){};
let c = func(); // return값이 없으면 undefined를 반환한 것으로 간주.
console.log(c); // undefined

// undefined와 배열
// '비어있는 요소'와 'undefined를 할당한 요소'는 출력결과부터 다르다.
// 비어있는 요소는 순회와 관련된 많은 배열 메서드들의 순회 대상에서 제외된다.

// undefined와 null 비교
let n = null;
console.log(typeof n); // object

console.log(n == undefined); // true
console.log(n == null); // true
console.log(n === undefined); // false
console.log(n === null); // true



