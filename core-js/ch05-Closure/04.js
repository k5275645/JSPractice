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
// 값을 변경하려는 시도는 실패하게 했지만, run 메서드를 다른 내용으로 덮어씌우는 어뷰징은 가능하다.
// 어뷰징을 막기 위해서는 객체를 return하기 전에 미리 변경할 수 없게끔 조치를 취해야 합니다.

