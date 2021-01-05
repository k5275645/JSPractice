const express = require('express');

const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log("1 모든 요청에 실행하고 싶어요");
    next();
}, (req, res, next) => {
    console.log("2 모든 요청에 실행하고 싶어요");
    next();
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
    //res.setHeader('Content-Type', 'text/html');
    //res.status(200).send('안녕하세요');
    next('route');
}, (req, res) => {
    console.log('실행되나요?')
});

app.get('/', (req, res) => {
    console.log('실행됩니다!')
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

// 와일드 카드(route parameter, 라우트 매개변수) - 반복을 줄이기 위해 사용?& 겹치는 주소면 아래둬야함?
app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name} wildcard`);
});

app.get('/about', (req, res) => {
    res.send('hello express!!');
});

app.use((req, res, next) => {
    res.status(404).send('404입니당'); // 위의 모든 라우터를 찾았는데 없으면 404
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러가 발생했습니당.')
});

// // 모든 요청에 대해 처리하겠다.
// app.get('*', (req, res) => {
//     res.send(`hello everyone`);
// });

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});