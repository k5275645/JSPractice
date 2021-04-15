const nameTable = document.querySelector(".name-table tbody");
const options = { method: "GET" };

let arr = [];

let aa = fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    json.forEach(function (e) {
      arr.push(e);
    });
  })
  .catch((err) => console.error(err));

//console.log(arr);

arr.forEach(function (ee) {
  console.log(ee);
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  //tr1.innerText = e.market;
  //tr2.innerText = e.korean_name;
  //tr3.innerText = e.english_name;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  nameTable.appendChild(tr);
});
