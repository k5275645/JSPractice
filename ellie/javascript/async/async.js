// async & await
// clear style of using promise :)

// 1. async
async function fetchUser(){
    // async를 함수 앞에 쓰면 코드 블럭이 promise로 바뀐다.
    // do network request in 10 secs...., 백엔드에서 데이터를 받아오는데 10초 정도 걸리는 코드가 있다고 가정
    return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await : 
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getApple(){
    await delay(1000);
    return '🍎';
}

async function getBanana(){
    await delay(1000);
    return '🍌';
}

// 위를 풀어쓰면 다음과 같다.
// function getBanana(){
//     return delay(3000)
//     .then(()=> '🍌');
// }

// then을 이용한 방법
// function pickFruits(){
//     return getApple().then(apple => {
//         return getBanana().then(banana => `${apple} + ${banana}`);
//     })
// }

// 위 코드를 간략히
// async function pickFruits(){
//     const apple = await getApple();
//     const banana = await getBanana();
//     return `${apple} + ${banana}`
// }

// 서로를 호출할 일이 없다면, 병렬처리가 가능하다.(무식한 방법)
async function pickFruits(){
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`
}

pickFruits().then(console.log);

// 3. useful Promise APIs
// Promise.all: 각 promise를 병렬로 리턴함?
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' + '));
}

pickAllFruits().then(console.log);

// Promise.race: 배열중 가장 먼저 반환되는 애를 리턴함?
function pickOnlyOne(){
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
