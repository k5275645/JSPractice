let foo = {
    name: 'foo',
    age : 30
}

console.log(foo.toString()) // [object Object]
console.log(foo)
// {name: "foo", age: 30}
// age: 30
// name: "foo"
// __proto__: -> foo객체의 부모인 프로토 타입객체를 가르킨다.
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString() -> foo객체의 프로토타입에 toString() 메서드가 이미 정의되어 있다.
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()