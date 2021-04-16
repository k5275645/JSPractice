const container = document.querySelector(".container");
const marketBtn = document.querySelector(".market");
const krwBtn = document.querySelector(".KRW");
const btcBtn = document.querySelector(".BTC");
const usdtBtn = document.querySelector(".USDT");
const marketInfo = document.querySelector(".market-info");

const marketTable = document.querySelector(".market-table");
const marketTableBody = marketTable.querySelector("tbody");

const options = { method: "GET" };

let all = [];
let marketFlag = true;
marketTable.style.display = "none";

function appendTr(item) {
  const allTr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const infoBtn = document.createElement("button");
  td1.innerHTML = item.market;
  td2.innerHTML = item.korean_name;
  td3.innerHTML = item.english_name;
  infoBtn.innerHTML = "가격";
  infoBtn.addEventListener("click", getTickerInfo);

  allTr.appendChild(td1);
  allTr.appendChild(td2);
  allTr.appendChild(td3);
  allTr.appendChild(infoBtn);
  marketTableBody.appendChild(allTr);
}

function click(e) {
  if (e.target.classList.value === "market") {
    all.forEach((item) => {
      appendTr(item);
    });
  } else if (e.target.classList.value === "KRW") {
    all.forEach((item) => {
      const allTr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const infoBtn = document.createElement("button");
      td1.innerHTML = item.market;
      td2.innerHTML = item.korean_name;
      td3.innerHTML = item.english_name;
      infoBtn.innerHTML = "가격";
      infoBtn.addEventListener("click", getTickerInfo);

      let splitMarket = item.market.split("-");

      if (splitMarket[0] === "KRW") {
        allTr.appendChild(td1);
        allTr.appendChild(td2);
        allTr.appendChild(td3);
        allTr.appendChild(infoBtn);
        marketTableBody.appendChild(allTr);
      }
    });
  } else if (e.target.classList.value === "BTC") {
    all.forEach((item) => {
      const allTr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const infoBtn = document.createElement("button");
      td1.innerHTML = item.market;
      td2.innerHTML = item.korean_name;
      td3.innerHTML = item.english_name;
      infoBtn.innerHTML = "가격";
      infoBtn.addEventListener("click", getTickerInfo);

      let splitMarket = item.market.split("-");

      if (splitMarket[0] === "BTC") {
        allTr.appendChild(td1);
        allTr.appendChild(td2);
        allTr.appendChild(td3);
        allTr.appendChild(infoBtn);
        marketTableBody.appendChild(allTr);
      }
    });
  } else if (e.target.classList.value === "USDT") {
    all.forEach((item) => {
      const allTr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const infoBtn = document.createElement("button");
      td1.innerHTML = item.market;
      td2.innerHTML = item.korean_name;
      td3.innerHTML = item.english_name;
      infoBtn.innerHTML = "가격";
      infoBtn.addEventListener("click", getTickerInfo);

      let splitMarket = item.market.split("-");

      if (splitMarket[0] === "USDT") {
        allTr.appendChild(td1);
        allTr.appendChild(td2);
        allTr.appendChild(td3);
        allTr.appendChild(infoBtn);
        marketTableBody.appendChild(allTr);
      }
    });
  }

  if (marketFlag) {
    marketTable.style.display = "block";
    marketFlag = false;
  } else {
    marketTable.style.display = "none";
    marketFlag = true;
  }
}

marketBtn.addEventListener("click", click);
krwBtn.addEventListener("click", click);
btcBtn.addEventListener("click", click);
usdtBtn.addEventListener("click", click);

function getTickerInfo(e) {
  let market = e.target.parentNode.childNodes[0].innerText;
  let korean_name = e.target.parentNode.childNodes[1].innerText;
  let english_name = e.target.parentNode.childNodes[2].innerText;
  fetch(`https://api.upbit.com/v1/ticker?markets=${market}`, options)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const li3 = document.createElement("li");
        const li4 = document.createElement("li");
        li1.innerHTML = "시가 : " + item.opening_price;
        li2.innerHTML = "종가 : " + item.trade_price;
        li3.innerHTML = "고가 : " + item.high_price;
        li4.innerHTML = "저가 : " + item.low_price;
        p.innerHTML = `${market} ${korean_name} ${english_name}`;
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        div.appendChild(p);
        div.appendChild(ul);
        marketInfo.appendChild(div);
      });
    })
    .catch((err) => console.error(err));
}

function marketInfoLoad() {
  fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        all.push(item);
      });
    })
    .catch((err) => console.error(err));
}

function init() {
  marketInfoLoad();
}

init();
