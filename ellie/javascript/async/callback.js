'use strict';

// Javascript is synchronous.
// Execute the code block by order after hoisting.
// hoisting: var, function declaration // 이런 선언들이 자동적으로 제일 위로 올라가는 것
console.log('1'); // 동기
setTimeout(() => console.log('2'), 1000); // 비동기
console.log('3'); // 동기

// Syncronous callback(동기적 콜백), 함수의 선언은 hoisting됨
function printImmediatelly(print) {
    print();
}
printImmediatelly(() => console.log('hello')); // 동기

// Asynchronous callback(비동기적 콜백), 함수의 선언은 hoisting됨
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log('async callback'), 2000); // 비동기


// Callback Hell example
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, OnSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                OnSuccess({
                    name: 'ellie',
                    role: 'admin'
                });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error)
    }
);