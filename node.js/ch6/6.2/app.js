const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const {
    connect
} = require('tls');

const app = express();

app.set('port', process.env.PORT || 3000);

// morgan
app.use(morgan('dev'));
//app.use(morgan('combined')); // 더 자세히 알려줌

// 경로 처리 -> 상단에 배치되는 것이 좋다.(다른 미들웨어를 모두 실행하면서 갈 필요가 없다?)
// app.use('요청 경로', express.static(path.join('실제경로')));
// localhost:3000/index.html                    6.2/public-3030/index.html
// localhost:3000/hello.css                     6.2/public-3030/hello.css
app.use('/', express.static(path.join(__dirname, 'public')));

//
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'nock',
    cookie: {
        httpOnly: true,

    },
    name: 'connect.sid',
}));

// 미들웨어 확장법
app.use('/', (req, res, next) => {
    if(req.session.id){
        express.static(__dirname, 'public')(req,res,next)
    } else {
        next();
    }
});

//
app.use(multer().array());

// cookieParser
app.use(cookieParser());

// bodyParser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
})); // form처리할 때? true면 qs, false면 querystring인 모듈을 씀?

app.use((req, res, next) => {
    console.log("1 모든 요청에 실행하고 싶어요");
    next();
}, (req, res, next) => {
    console.log("2 모든 요청에 실행하고 싶어요");
    next();
});

app.use((req, res, next) => {
    req.session.data = 'nock비번';

})

app.get('/', (req, res) => {
    req.session.data // nock비번
    res.sendFile(path.join(__dirname, './index.html'));
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