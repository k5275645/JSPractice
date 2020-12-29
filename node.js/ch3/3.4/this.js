console.log(this); // {}
console.log(this === module.exports); // true

function a(){
    //console.log(this);
    console.log(this===global); // true
};

a();