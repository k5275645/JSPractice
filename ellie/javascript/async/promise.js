'use strict';

// Promise is a Javascript object for Asyncronous operation.
// State: pedding -> fulfilled or rejected
// Produser vs Consumer

// 1. Produser
// when new Promise is created, the executor run automatically.(주의, 만들면 executor가 바로 실행됨)
const promise = new Promise((resolve, reject) => {
    // doing some heavy work (network, read files)
    console.log('doing something');
    setTimeout(() => {
        resolve('ellie');
        reject(new Error('no network'));
    }, 2000);
});

// 2. Consumers: then, catch, finally
promise
    //성공시
    .then((value) => {
        console.log(value);
    }) //then의 리턴이 promise임
    //실패시
    .catch(error => {
        console.log(error);
    })
    //성공과 실패에 상관없이 실행
    .finally(() => {
        console.log('finally')
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐔'), 1000)
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`${hen} => 🥚`)), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍥`), 1000);
    });


// getHen()
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(meal => console.log(meal));

// 받은 값을 다시 넣어준다면, 축약가능
getHen() //
    .then(getEgg)
    .catch(error => {
        return '🥪';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);