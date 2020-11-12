// Q1. make a string out of an array
{
    const fruits = ['apple', 'banana', 'orange'];
    const result1 = fruits.join();
    console.log(result1); // apple,banana,orange
    const result2 = fruits.join(', and ');
    console.log(result2); // apple, and banana, and orange
}

// Q2. make an array out of a string
{
    const fruits = '🍎, 🥝, 🍌, 🍒';
    const result1 = fruits.split();
    console.log(result1); // ["🍎, 🥝, 🍌, 🍒"]
    const result2 = fruits.split(',');
    console.log(result2); // ["🍎", " 🥝", " 🍌", " 🍒"]
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    console.log(result); // [5, 4, 3, 2, 1]
    //배열 자체를 변환시킴
    console.log(array); // [5, 4, 3, 2, 1]
}

// Q4. make new array without the first two elements
{
    const array = [1, 2, 3, 4, 5];
    //const result = array.splice(0, 2);
    //console.log(array); // [3, 4, 5]
    //console.log(result); // [1, 2]
    const result = array.slice(2, 5);
    console.log(result); // [3, 4, 5]
    console.log(array); // [1, 2, 3, 4, 5]

}

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];

//[find와 filter의 차이점]
// - find 함수는 배열의 각 요소에 콜백함수의 연산을 순차적으로 하나씩 수행하다가,
// 콜백함수가 true를 반환하면 다음 요소에는 콜백함수를 수행하지 않고 바로 종료된다.

// - filter 함수는 배열의 모든 요소에 콜백함수의 연산을 수행한 후,
// 콜백함수가 true를 반환한 요소들만 모아 배열로 반환한다.

// Q5. find a student with the score 90
{
    // const result = students.find(function(student){
    //     //console.log(student);
    //     return student.score === 90;
    // });
    const result = students.find(student => student.score === 90);
    console.log(result); // Student {name: "C", age: 30, enrolled: true, score: 90}
}

// Q6. make an array of enrolled students
{
    const result = students.filter(student => student.enrolled === true);
    console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
    const result = students.map((student) => student.score);
    console.log(result); // [45, 80, 90, 66, 88]
}

// Q8. check if there is a student with the score lower than 50
{
    // 하나라도
    const result1 = students.some((student) => student.score < 50);
    console.log(result1); // true

    // 모든
    const result2 = students.every((student) => student.score >= 50);
    console.log(result2); // false
}

// Q9. compute students' average score
// reduce: 우리가 원하는 시작점부터, 배열을 모두 돌면서 어떤 값을 누적할 때 사용한다.
// reduceRight: 같은 기능이나 배열의 뒤부터 앞으로 옴(E->D->C...)
// prev: 이전에 콜백함수에서 return된 값이 전달되고
// curr: 배열의 아이템을 순차적으로 전달 받는다.
{
    // const result = students.reduce((prev, curr) => {
    //     console.log('----------')
    //     console.log(prev);
    //     console.log(curr);
    //     return prev + curr.score;
    // }, 0);
    const result = students.reduce((prev, curr) => prev + curr.score, 0);
    console.log(result); // 369
    console.log(result / students.length); // 73.8
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
    // const result1 = students.map((student) => student.score);
    // console.log(result1); // [45, 80, 90, 66, 88]
    // const result2 = result1.join();
    // console.log(result2); // 45,80,90,66,88

    // 50점이상이라는 초건 추가해서 api엮기
    const result = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
    console.log(result); // 0,90,66,88
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
    const result = students.map((student) => student.score)
    .sort((a,b) => a - b) // a -b 값이 음수면 앞에 위치..? 작은값 ~ 큰값으로 정렬하는 api?
    .join();
    console.log(result); // 45,66,80,88,90
}