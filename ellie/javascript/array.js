'use strict';

// Array🎉🎉

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]); // 🍎
console.log(fruits[1]); // 🍌
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]) // 🍌

// 3. Looping over an array
// print all fruit
// a. for
console.clear();
for(let i = 0;  i < fruits.length; i++){
    console.log(fruits[i]);
}

// b. for of
for(let fruit of fruits){
    console.log(fruit);
}

// c. for Each
// fruits.forEach(function(fruit, index, array){
//     console.log(fruit);
//     console.log(index);
//     console.log(array);
// });
fruits.forEach((fruit) => console.log(fruit));

// 4. Addition, deletion, copy

// push : add ad item to the end
fruits.push('🍓','🍑');
console.log(fruits); // ["🍎", "🍌", "🍓", "🍑"]
// pop : remove an item from the end
fruits.pop();
fruits.pop(); // ["🍎", "🍌", "🍓"]
console.log(fruits); // ["🍎", "🍌"]

// unshift: add an item to the beginning
fruits.unshift('🍓','🍋')
console.log(fruits); // ["🍓", "🍋", "🍎", "🍌"]
// shift: remove an item from the beginning
fruits.shift();
fruits.shift();
console.log(fruits); // ["🍎", "🍌"]

// note!! shift, unshift are slower than pop, push
// shift, unshift는 배열전체를 찾고 넣거나 빼고, 옮겨야하기 때문에 오래걸림

// splice: remove an item by index position
fruits.push('🍓','🍑','🍋');
console.log(fruits); // ["🍎", "🍌", "🍓", "🍑", "🍋"]
fruits.splice(1, 1); // 1번 index부터 1칸 삭제
console.log(fruits); // ["🍎", "🍓", "🍑", "🍋"]
fruits.splice(1, 1, '🍏', '🍉');
console.log(fruits); // ["🍎", "🍏", "🍉", "🍑", "🍋"]

// combine two arrays
const fruits2 = ['🍒','🍆'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits); // ["🍎", "🍏", "🍉", "🍑", "🍋", "🍒", "🍆"]

// 5. Searching
// indexOf: find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('🍎')); // 0
console.log(fruits.indexOf('🍏')); // 1
console.log(fruits.indexOf('🥗')); // -1

// includes
console.log(fruits.includes('🍏')); // true
console.log(fruits.includes('🥗')); // false

// lastIndexOf, 중복되는 value존재시, indexOf는 제일 앞, lastIndexOf는 제일 마지막을 찾음
console.clear();
console.log(fruits); // ["🍎", "🍏", "🍉", "🍑", "🍋"]
fruits.push('🍎');
console.log(fruits.indexOf('🍎')); // 0
console.log(fruits.lastIndexOf('🍎')); // 5











