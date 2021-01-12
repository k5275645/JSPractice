let user = {
    name: 'Jaenam',
    gender : 'mail'
};

// 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)
let copyObject = function(target){
    let result = {};
    for(let prop in target){ // for( let property in object)
        // console.log(prop); // name gender
        // console.log(target[prop]); // Jung mail
        result[prop] = target[prop];
    }
    return result;
};

let user4 = copyObject(user);
user4.name = 'Jung3';

console.log(user.name, user4.name); // Jung Jung3
console.log(user === user4); // false

if(user !== user4){
    console.log('유저 정보가 변경되었습니다.'); // 유저 정보가 변경되었습니다.
}

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