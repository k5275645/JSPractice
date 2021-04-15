const container = document.querySelector(".container");
const marketBtn = document.querySelector(".market");

const marketTable = document.querySelector(".market-table");
const marketTableBody = marketTable.querySelector("tbody");

const options = { method: "GET" };

let all = [];

let marketFlag = true;

marketTable.style.display = "none";

marketBtn.addEventListener("click", function (e) {
  if (marketFlag) {
    marketTable.style.display = "block";
    marketFlag = false;
  } else {
    marketTable.style.display = "none";
    marketFlag = true;
  }
});

function marketInfoAppend() {
  all.forEach((item) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const infoBtn = document.createElement("button");
    td1.innerHTML = item.market;
    td2.innerHTML = item.korean_name;
    td3.innerHTML = item.english_name;
    infoBtn.innerHTML = "정보보기";
    infoBtn.addEventListener("click", getTickerInfo);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(infoBtn);
    marketTableBody.appendChild(tr);
  });
}

function getTickerInfo(e) {
  let market = e.target.parentNode.childNodes[0].innerText;
  fetch(`https://api.upbit.com/v1/ticker?markets=${market}`, options)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const li3 = document.createElement("li");
        const li4 = document.createElement("li");
        li1.innerHTML = item.opening_price;
        li2.innerHTML = item.trade_price;
        li3.innerHTML = item.high_price;
        li4.innerHTML = item.low_price;
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
      });
    })
    .catch((err) => console.error(err));
}

function marketInfoLoad() {
  fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        all.push(item);
      });
      marketInfoAppend();
    })
    .catch((err) => console.error(err));
}

function init() {
  marketInfoLoad();
}

init();
