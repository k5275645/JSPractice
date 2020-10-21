var store = {snack:1000, flower:5000, beverage:2000};

for (const key in store) {
    if (!store.hasOwnProperty(key)) continue;
    console.log(key + "가격이 " + store[key] + " 입니다.")
}