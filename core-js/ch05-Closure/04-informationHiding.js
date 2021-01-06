// 5-3-2 접근 권한 제어(정보은닉)

// 게임을 만들며 접근 권한 배우기
// 각 턴마다 주사위를 굴려 나온 숫자(km)만큼 이동한다.
// 차량별로 연료량(fuel)과 연비(power)는 무작위로 생성된다.
// 남은 연료가 이동할 거리에 필요한 연료보다 부족하면 이동하지 못한다.
// 모든 유저가 이동할 수 없는 턴에 게임이 종료된다.
// 게임 종료 시점에 가장 멀리 이동해 있는 사람이 승리.

// 간단한 자동차 객체
let car = {
    fuel: Math.ceil(Math.random() * 10 + 10), // 연료(L)
    power: Math.ceil(Math.random() * 3 + 2), // 연비(km/L)
    moved: 0, // 총 이동거리
    run: function () {
        let km = Math.ceil(Math.random() * 6);
        let wasteFuel = km / this.power;
        if (this.fuel < wasteFuel) {
            console.log('이동불가');
            return;
        }
        this.fuel -= wasteFuel;
        this.moved += km;
        console.log(km + 'km 이동 (총 ' + this.moved + 'km)');
    }
};
car.fuel = 100000;
car.power = 1000;
car.moved = 10000000;
// 다음과 같이 마음대로 값을 바꾸면 치트키처럼 사용된다 -> 게임을 하려면 정보은닉 필요

// 객체가 아닌 함수로 만들고, 필요한 멤버만을 return하는 방밥
// 클로저로 변수를 보호한 자동차 객체 (1)
let createCar = function () {
    fuel = Math.ceil(Math.random() * 10 + 10); // 연료(L)
    power = Math.ceil(Math.random() * 3 + 2); // 연비(km/L)
    moved = 0; // 총 이동거리
    return {
        get moved() {
            return moved;
        },
        run: function () {
            let km = Math.ceil(Math.random() * 6);
            let wasteFuel = km / power;
            if (fuel < wasteFuel) {
                console.log('이동불가');
                return;
            }
            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료 : ' + fuel);
        }
    };
};
let car2 = createCar();
car2.run();
console.log(car2.moved);
console.log(car2.fuel); // undefined
console.log(car2.power); // undefined

car2.fuel = 1000;
console.log(car2.moved);
console.log(car2.fuel); // 1000
console.log(car2.power); // undefined
car2.run();

car2.power = 100;
console.log(car2.moved);
console.log(car2.fuel); // 1000
console.log(car2.power); // 100
car2.run();

car.moved = 1000;
console.log(car2.moved); // 10
console.log(car2.fuel); // 1000
console.log(car2.power); // 100
car2.run();
console.log('-------------------------');
// 값을 변경하려는 시도는 실패하게 했지만, run 메서드를 다른 내용으로 덮어씌우는 어뷰징은 가능하다.
// 어뷰징을 막기 위해서는 객체를 return하기 전에 미리 변경할 수 없게끔 조치를 취해야 한다.

// 클로저로 변수를 보호한 자동차 객체
let createCar2 = function () {
    fuel = Math.ceil(Math.random() * 10 + 10); // 연료(L)
    power = Math.ceil(Math.random() * 3 + 2); // 연비(km/L)
    moved = 0; // 총 이동거리
    let publicMembers = {
        get moved() {
            return moved;
        },
        run: function () {
            let km = Math.ceil(Math.random() * 6);
            let wasteFuel = km / power;
            if (fuel < wasteFuel) {
                console.log('이동불가');
                return;
            }
            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료 : ' + fuel);
        }
    };
    Object.freeze(publicMembers);
    return publicMembers;
}
let car3 = createCar2();
car3.run();
car3.run();
car3.run();
/*
Object.freeze() 메서드는 객체를 동결. 동결된 객체는 더 이상 변경될 수 없다.
즉, 동결된 객체는 새로운 속성을 추가하거나 존재하는 속성을 제거하는 것을 방지하며
존재하는 속성의 불변성, 설정 가능성(configurability), 작성 가능성이 변경되는 것을 방지하고,
존재하는 속성의 값이 변경되는 것도 방지. 또한, 동결 객체는 그 프로토타입이 변경되는것도 방지.
freeze()는 전달된 동일한 객체를 반환.
*/

// 클로저를 활용해 접근 권한을 제어하는 방법
// 1. 함수에서 지역변수 및 내부함수 등을 생성한다.
// 2. 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터
// (대상이 여럿일 때는 객체 또는 배열, 하나일 때는 함수)를 return한다.
// -> return한 변수들은 공개 멤버가 되고, 그렇지 않은 변수들은 비공개 멤버가 된다.