'use strict';
// Object-oriented programing
// class: template
// object: instance of a class
// Javascript classes
// - introduced in ES6
// - syntactical sugar over prototype-based inheritance

// 1. Class declaration
class Person {
    //constructor
    constructor(name, age) {
        //fields
        this.name = name;
        this.age = age;
    }

    //methods
    speak() {
        console.log(`${this.name}: hello!`)
    }
}

const ellie = new Person('ellie', 20);
console.log(ellie.name); // ellie
console.log(ellie.age); // 20
ellie.speak();

// 2. Getter and Setter
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        // if(value < 0){
        //     throw Error('age can not be negative');
        // }
        this._age = value < 0 ? value : 0;
    }
}

const user1 = new User('Steve', 'Job', -1);
console.log(user1.age);

// 3. Fields (public, private)
// Too soon! 최신기술이니 깊게 X
class Experiment{
    publicFieds = 2;
    #privateFieds = 0; // JS에서 private선언하는 방법
}
const experiment = new Experiment();
console.log(experiment.publicFieds);
//console.log(experiment.privateFieds); // 접근 불가


// 4. Static properties and methods
// Too soon! 최신기술이니 깊게 X
class Article{
    static publisher = 'Dream Coding';
    constructor(articleNum){
        this.articleNum = articleNum;
    }

    static printPublisher(){
        console.log(Article.publisher)
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding
Article.printPublisher(); // Dream Coding

// 6. Inheritance
// a way for one class to extend another class.
class Shape{
    constructor(width, height, color){
        this.width = width
        this.height = height
        this.color = color
    }

    draw(){
        console.log(`drawing ${this.color} color of`)
    }

    getArea(){
        return this.width * this.height;
    }
}

class Rectangle extends Shape{}
class Triangle extends Shape{
    draw(){
        super.draw();
        console.log('👌');
    }

    getArea(){
        return (this.width * this.height) / 2;
    }

    toString(){
        return `Triangle: color: ${this.color}`
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());

const triangle = new Triangle(25, 30, 'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(triangle instanceof Shape); // true
console.log(triangle instanceof Object); // true
console.log(triangle.toString()); // 원래는 [object Object]가 나오지만 재정의 했기 때문에 해당 리턴값이 출력됨







