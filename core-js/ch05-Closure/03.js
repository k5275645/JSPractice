// 클로저 활용 사례

// 5-3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

// 콜백 함수와 클로저 (1) - 내부함수
let fruits = ['apple', 'banana', 'peach'];
let fruits2 = ['apple2', 'banana2', 'peach2'];
let fruits3 = ['apple3', 'banana3', 'peach3'];
let fruits4 = ['apple4', 'banana4', 'peach4'];
let $ul = document.createElement('ul'); // 공통 코드

fruits.forEach(function (fruit) { // (A)
    let $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', function () { // (B)
        alert('your choice is ' + fruit);
    });
    $ul.appendChild($li);
});
document.body.appendChild($ul);
// (B) 함수의 쓰임새가 콜백 함수에 국한되지 않는 경우라면 반복을 줄이기 위해
// (B) 를 오부로 분리하는 편이 나을 수도 있다. fruit를 인자로 받아서 출력하는 형태로.

// 콜백 함수와 클로저 (2) - 내부함수 
let alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};

fruits2.forEach(function (fruit) {
    let $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruit);
    $ul.appendChild($li);
});
// alertFruit(fruits2[1]); // your choice is banana2
// 위는 정상 출력되지만, 클릭하면 대상 과일이 아니라 [object MouseEvent]가 출려된다.
// 콜백 함수의 인자에 대한 제어권을 addEventListener가 가진 상태이며,
// addEnevtListener는 콜백 함수를 호출할 때 첫 번째 인자에 '이벤트 객체'를 주입하기 때문.
// 이 문제는 bind메서드를 활용하면 해결 가능하다.

// 콜백 함수와 클로저 (3) - bind
fruits3.forEach(function (fruit) {
    let $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruit.bind(null, fruit));
    $ul.appendChild($li);
});
// bind를 사용하면 이벤트 객체가 인자로 넘어오는 순서가 바뀌는 점,
// 함수 내부에서의 this가 원래의 그것과 달라지는 점은 감안해야 한다.
// 위와 같은 이슈를 해결하기 위해 고차함수를 활용하는 방법이 있다. 함수형 프로그래밍에서 자주쓰는 방식.
// cf) 고차함수 -> 함수를 인자로 받거나 함수를 리턴하는 함수

// 콜백 함수와 클로저 (4) - 고차함수
let alertFruitBuilder = function (fruit) {
    return function () {
        alert('your choice is ' + fruit);
    }
};
fruits4.forEach(function (fruit) {
    let $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruitBuilder(fruit));
    $ul.appendChild($li);
});
