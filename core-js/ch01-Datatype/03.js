// 객체의 깊은 복사를 수행하는 범용 함수
let copyObjectDeep = function(target){
    let result = {};
    if (typeof target === 'object' && target !== null){
        for(let prop in target){
            // console.log(prop);
            result[prop] = copyObjectDeep(target[prop]);
        }
    } else {
        result = target;
    }
    return result;
};

let obj = {
    a: 1,
    b: {
        c: null,
        d: [1,2]
    }
};

let obj2 = copyObjectDeep(obj);
obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

//console.log(obj);
//console.log(obj2);
console.log(obj === obj2); // false

// JSON을 활용한 간단한 깊은 복사 ( function은 복사하지 못함 )
// 객체를 JSON 문법으로 표현된 문자열로 전환했다가 다시 JSON 객체로 바꾸는 것.
let copyObjectViaJSON = function(target){
    return JSON.parse(JSON.stringify(target));
}

let objobj = {
    a: 1,
    b: {
        c: null,
        d: [1,2],
        func1: function(){console.log(3);},
        func2: function(){console.log(4);}
    }
};

let objobj2 = copyObjectViaJSON(objobj);

objobj2.a = 3;
objobj2.b.c = 4;
objobj.b.d[1] = 3;

// console.log(objobj);
// console.log(objobj2);
console.log(objobj === objobj2); // false