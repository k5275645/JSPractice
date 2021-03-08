// 사용되는 토큰들
var T_NONE = 0;
var T_NUMBER = 1; //숫자 (<Num>에 대응)
var T_ID = 2; //식별자 <<Id>에 대응>
var T_PLUS = 3; // +
var T_MINUS = 4; // -
var T_MUL = 5; // *
var T_DIV = 6; // /
var T_POW = 7; // ^
var T_LPAR = 8; // (
var T_RPAR = 9; // )
var T_COMMA = 10; // ,  

//먼저 토큰 오브젝트를 정의합니다.
function Token(type, v) {
    this.type = type; // 토큰의 종류가 들어갑니다.
    this.v = v; // 토큰의 실제 문자열이 들어갑니다.
}

//파싱 에러를 표현할 오브젝트를 정의!
function PNParseError(err) {
    this.err = err;
}

/*각각의 토큰 종류별로 어떤 문자열을 골라내야하는지
정규식으로 정의해줍니다. 이 정도 정규식은 어렵지 않아요!*/
var tRules = [
    [T_NUMBER, /^-?[0-9]*([0-9]|(\.[0-9]+))/],
    [T_ID, /^[a-zA-Z0-9]+/],
    [T_PLUS, /^\+/],
    [T_MINUS, /^\-/],
    [T_MUL, /^\*/],
    [T_DIV, /^\//],
    [T_POW, /^\^/],
    [T_LPAR, /^\(/],
    [T_RPAR, /^\)/],
    [T_COMMA, /^,/],
    [T_NONE, /^\s+/],
];

function tokenize(str) {
    console.log(str);
    var ret = [];
    var match;
    //위에서 정의한 정규식 규칙을 하나씩 가져와서
    //현재 문자열에서 일치하는 부분을 찾아냅니다.
    //T_NONE일 경우는 그냥 빈 공백이므로 토큰 배열에는 넣지 않습니다.
    whole: while (str.length) {
        //console.log(str.length);
        for (var i in tRules) {
            var id = tRules[i][0];
            var rule = tRules[i][1];
            if (match = str.match(rule)) {
                //console.log(id)
                //console.log(rule);
                //console.log(match);
                if (id != T_NONE) ret.push(new Token(id, match[0]));
                str = str.substr(match[0].length);
                continue whole; //다시 처음으로
            }
        }
        /*규칙 전체를 훑었는데도 일치하는게 안 나왔다는건 잘못된 문자열이 입력되었다는거죠! */
        throw new PNParseError('Unknown token "' + str.substr(0, 3) + '"');
    }
    return ret;
}

//트리들의 기본 형태가 될 오브젝트를 정의!
function Polynomy(type, a) {
    this.type = type;
    this.a = a;
}

/*
각각의 규칙함수들은 다음과 같은 인수를 가집니다.
toks : 파싱할 토큰들의 배열
s : 실제로 파싱해야할 토큰의 toks에서의 시작위치
 
반환값은 다음과 같습니다.
tree : 파싱된 트리
numtok : 규칙을 파싱하는데 사용된 토큰의 개수
*/

function ParseResult(tree, numtok) {
    //console.log(tree);
    //console.log('규칙을 파싱하는데 사용된 토큰의 개수 : '+numtok);
    this.tree = tree;
    this.numtok = numtok;
}

/*
규칙 : <AddExp> := '-' ? <MulExp> (('+'|'-') <MulExp>)*
*/
function pAdd(toks, s) {
    //console.log(arguments);
    console.log("pAdd, s = 실제로 파싱해야할 토큰의 toks에서의 시작위치?? : " + s);
    var i = s;
    var sign = -1; // -1: 부호 미설정, 0: +, 1:- 로 약속.
    var res;
    var arr = [];
    if (toks[i] && toks[i].type == T_MINUS) {
        i++;
        sign = 1;
    }
    //console.log(toks);
    //console.log(i);
    while (toks[i] && (res = pMul(toks, i))) {
        i += res.numtok;
        //console.log('res.numtok : ' + res.numtok);
        //console.log("i : " + i);
        if (sign == 1) arr.push(makeNeg(res.tree));
        else arr.push(res.tree);
        sign = -1; // 다시 부호를 미설정 상태로

        if (toks[i] && toks[i].type == T_PLUS) {
            i++;
            sign = 0;
        } else if (toks[i] && toks[i].type == T_MINUS) {
            i++;
            sign = 1;
        } else break;
    }
    //console.log(arr[0]);
    //console.log(arr);
    if (sign >= 0) throw new PNParseError('Expected a right term of "' + toks[i - 1].v + '"');
    // sign 0,1이면 + 혹은 -가 나타난건데, 뒤에 아무런 표현식이 안나온겁니다. 그러면 에러죠.
    if (arr.length == 0) throw new PNParseError('Unexpected "' + toks[i].v + '"');
    if (arr.length == 1) return new ParseResult(arr[0], i - s);
    // 덧셈할 연산식이 1개밖에 없다면 굳이 덧셈할 필요가 없으니, 트리를 그대로 리턴
    else return new ParseResult(PN.tS(arr), i - s);
    // 2개 이상일 경우 새로 덧셈 트리를 만들고, 연산식들을 넣어줍니다.
}

/*
규칙 : <MulExp> := <DotExp> (('*'|'/' <DotExp>))*
*/
function pMul(toks, s) {
    console.log("pMul, s = 실제로 파싱해야할 토큰의 toks에서의 시작위치?? : " + s);
    var i = s;
    var sign = -1; // -1: 부호 미설정, 0:곱하기, 1:나누기
    var res;
    var arrMul = [];
    var arrDiv = [];
    while (toks[i] && (res = pDot(toks, i))) {
        i += res.numtok;
        //console.log('sign : '+sign);
        if (sign == 1) arrDiv.push(res.tree);
        else arrMul.push(res.tree);
        sign = -1; // 다시 부호 미설정 상태로

        //console.log(toks[i]);
        //console.log('toks[i].type : ' + toks[i].type);
        if (toks[i] && toks[i].type == T_MUL) {
            i++;
            sign = 0;
        } else if (toks[i] && toks[i].type == T_DIV) {
            i++;
            sign = 1;
        } else break;
    }
    if (sign >= 0) throw new PNParseError('Expected a right term of "' + toks[i - 1].v + '"');
    // 위와 마찬가지 경우로, *, / 뒤에 표현식이 안 나온것이므로, 구문오류입니다.
    if (arrMul.length == 0) throw new PNParseError('Unexpected "' + toks[i].v + '"');
    if (arrMul.length == 1 && arrDiv.length == 0) return new ParseResult(arrMul[0], i - s);
    // 항이 1개일 경우 굳이 곱셈트리 만들필요가 없으므로 트리를 그대로 리턴
    else {
        //console.log('arrDiv.length : ' + arrDiv.length);
        if (arrDiv.length) {
            var t1, t2;
            if (arrMul.length == 1) t1 = arrMul[0];
            else t1 = PN.tM(arrMul);
            if (arrDiv.length == 1) t2 = arrDiv[0];
            else t2 = PN.tM(arrDiv);
            console.log(t1, t2);
            return new ParseResult(PN.tD(t1, t2), i - s);
        }
        // 나눗셈이 있을 경우 나눗셈 트리를 만들어 리턴
        else return new ParseResult(PN.tM(arrMul), i - s);
        // 나눗셈이 없으면, 곱셈만 있는것이므로 곱셈트리를 만들어 리턴
    }
}

/*
규칙 : <DotExp> := <PowExp>+
*/
function pDot(toks, s) {
    console.log("pDot, s = 실제로 파싱해야할 토큰의 toks에서의 시작위치?? : " + s);
    var i = s;
    var sign = 0;
    var res;
    var arr = [];
    while (toks[i] &&
        (toks[i].type == T_LPAR || toks[i].type == T_NUMBER || toks[i].type == T_ID) &&
        (res = pPow(toks, i))) {
        i += res.numtok;
        //console.log('pDot, i : ' + i);
        //console.log(res.tree);
        arr.push(res.tree); // arr = Polynomy(type, a) , ParseResult(tree, numtok)에서 tree형태
    }
    //console.log(i, s);
    if (arr.length == 0) throw new PNParseError('Unexpected "' + toks[i].v + '"');
    if (arr.length == 1) return new ParseResult(arr[0], i - s); // 1-0, 3-2
    // 항이 1개면 굳이 곱셈 트리 안 만들어도됨
    else return new ParseResult(PN.tM(arr), i - s);
}

/*
규칙 : <PowExp> := <LeafExp> ('^' <LeafExp>)?
*/
function pPow(toks, s) {
    console.log("pPow, s = 실제로 파싱해야할 토큰의 toks에서의 시작위치?? : " + s);
    var i = s; // 처음 숫자면 0
    //console.log(i); // 0 , 2
    var res = pLeaf(toks, i); // return은 ParseResult(tree, numtok)형태로
    //console.log(res.numtok);
    if (!res) return;
    i += res.numtok; // 1, 3
    //console.log(i); 

    //console.log(toks[i]); // Token {type: 3, v: "+"} , undefined
    //console.log(!toks[i]); // false, true
    //console.log(toks[i].type != T_POW); // true, Uncaught TypeError: Cannot read property 'numtok' of undefined
    //console.log(toks[i].type); undefined의 경우 해당 property를 찾을 수 없다.? type도 아니고 왜 nomtok을??
    if (!toks[i] || toks[i].type != T_POW) return res;
    i++;
    var res2 = pLeaf(toks, i);
    if (!res2) throw new PNParseError('Expected Expression, not "' + toks[i].v + '"');
    i += res2.numtok;
    return new ParseResult(PN.tP(res.tree, res2.tree), i - s);
}

/*
규칙 : <LeafExp> := '(' <AddExp> ')' | <ID> '(' <AddExp> (',' <AddExp>)* ')' | <ID> | <Num>
우리 규칙의 마지막 부분입니다.
*/
function pLeaf(toks, s) {
    console.log("pLeaf, s = 실제로 파싱해야할 토큰의 toks에서의 시작위치?? : " + s);
    var i = s;
    //console.log(toks);
    //console.log(toks[i]);
    // 괄호인 경우
    if (toks[i] && toks[i].type == T_LPAR) {
        i++;
        var res = pAdd(toks, i);
        if (!res) throw new PNParseError('Expected Expression, not "' + toks[i].v + '"');
        i += res.numtok;
        if (toks[i].type != T_RPAR) throw new PNParseError('Expected ")", not "' + toks[i].v + '"');
        // 오른쪽 괄호가 안 나타났으면, 아 그것은 치명적인 에러1
        i++;
        return new ParseResult(res.tree, i - s);
    }

    // 식별자 이후 바로 괄호인 경우는 함수 호출입니다.
    else if (toks[i] && toks[i].type == T_ID && toks[i + 1] && toks[i + 1].type == T_LPAR) {
        var f = toks[i].v;
        var arg = [];
        i += 2;
        var res;
        while (res = pAdd(toks, i)) {
            i += res.numtok;
            arg.push(res.tree);
            if (toks[i].type == T_COMMA) i++;
            else break;
        }
        if (toks[i].type != T_RPAR) throw new PNParseError('Expected ")", not "' + toks[i].v + '"');
        // 인수 목록 이후 오른쪽 괄호가 나타나지 않아도 치명적인 오오류
        i++;
        return new ParseResult(PN.tF(f, arg), i - s);
    }
    // 걍 식별자만 나오면, 변수 노드
    else if (toks[i] && toks[i].type == T_ID) {
        var v = toks[i].v;
        i++;
        return new ParseResult(PN.tV(v), 1);
    }
    
    // 숫자가 나오면 상수 노드
    else if (toks[i] && toks[i].type == T_NUMBER) {
        var v = toks[i].v;
        i++;
        console.log(v);
        return new ParseResult(PN.tC(v), 1);
    } else throw new PNParseError('Unexpected "' + toks[i].v + '"');
}

function makeNeg(tree) {
    //console.log(tree);
    if (tree.type == 'M') return tree.a.unshift(PN.tC(-1)), tree;
    // 기존에 이미 곱셈 트리면 제일 앞쪽에 상수 노드 (-1)을 추가
    else {
        // 나머지 경우 상수 노드와 기존 트리를 가지고 곱셈트리를 만들어 반환
        return PN.tM([PN.tC(-1), tree]);
    }
}

/*
위에 나왔던 트리 정의에 eval함수를 추가했습니다.
 
eval함수의 인수
 args : 정의된 변수들의 사전형 목록입니다.
 opa : 정의된 함수들의 사전형 목록입니다.
eval함수의 반환값
 연산 결과를 number 타입으로 반환합니다.
*/
let PN = {
    tS: function (a) {
        var p = new Polynomy('S', a);
        p.eval = function (args, opa) {
            var sum = this.a[0].eval(args, opa);
            for (var i = 1; i < this.a.length; i++) {
                sum += this.a[i].eval(args, opa);
            }
            return sum;
        };
        return p;
    },
    tM: function (a) {
        var p = new Polynomy('M', a);
        p.eval = function (args, opa) {
            var sum = this.a[0].eval(args, opa);
            for (var i = 1; i < this.a.length; i++) {
                sum *= this.a[i].eval(args, opa);
            }
            return sum;
        };
        return p;
    },
    tC: function (a) {
        var p = new Polynomy('C', a);
        p.eval = function (args, opa) {
            return this.a - 0.0;
        };
        return p;
    },
    tV: function (a) {
        var p = new Polynomy('V', a);
        p.eval = function (args, opa) {
            if (!args[this.a]) throw new PNEvalError('Undefined Variable "' + this.a + '"');
            // 변수 목록에 해당 변수가 없으면 에러를 출력
            return args[this.a];
        };
        return p;
    },
    tD: function (a, b) {
        var p = new Polynomy('D', a);
        p.b = b;
        p.eval = function (args, opa) {
            var r = this.a.eval(args, opa) / this.b.eval(args, opa);
            return r;
        };
        return p;
    },
    tP: function (a, b) {
        var p = new Polynomy('P', a);
        p.b = b;
        p.eval = function (args, opa) {
            var r = Math.pow(this.a.eval(args, opa), this.b.eval(args, opa));
            return r;
        };
        return p;
    },
    tF: function (a, b) {
        var p = new Polynomy('F', a);
        p.b = b;
        p.eval = function (args, opa) {
            var f = opa[this.a];
            if (f) {
                var arr = [];
                for (var i = 0; i < this.b.length; i++) {
                    arr.push(this.b[i].eval(args, opa));
                }
                //인수 목록을 배열로 만들어서 함수 f한테 넘겨줍니다.
                var r = f(arr);
                return r;
            } else throw new PNEvalError('Undefined Function "' + this.a + '"');
            // 함수 목록에 해당 함수가 없으면 에러 출력
        };
        return p;
    },
};

PN.defaultOpa = {
    sin: function (a) {
        return Math.sin(a[0]);
    },
    cos: function (a) {
        return Math.cos(a[0]);
    },
    tan: function (a) {
        return Math.tan(a[0]);
    },
    sqrt: function (a) {
        return Math.sqrt(a[0]);
    },
    abs: function (a) {
        return Math.abs(a[0]);
    },
    acos: function (a) {
        return Math.acos(a[0]);
    },
    asin: function (a) {
        return Math.asin(a[0]);
    },
    atan: function (a) {
        return Math.atan(a[0]);
    },
    atan2: function (a) {
        return Math.atan2(a[0], a[1]);
    },
    ceil: function (a) {
        return Math.ceil(a[0]);
    },
    floor: function (a) {
        return Math.floor(a[0]);
    },
    exp: function (a) {
        return Math.exp(a[0]);
    },
    log: function (a) {
        return Math.log(a[0]);
    },
    round: function (a) {
        return Math.round(a[0]);
    },
}

PN.parse = function (str) {
    var toks = tokenize(str);
    console.log(toks);
    console.log("toks.length : " + toks.length);
    try {
        var res = pAdd(toks, 0, toks.length);
    } catch (e) {
        if (e instanceof PNParseError) throw e;
    }
    console.log(res);
    if (res.numtok != toks.length) throw new PNParseError('Unexpected "' + toks[res.numtok].v + '"');
    // 사용한 토큰개수와 전체 토큰 개수가 같지 않으면, 그것또한 구문오류겠죠.
    return res.tree;
};

//'800 + 3.14 * cos(sin(30) + 100)^2 + log(100 * 2 + 10)'
let tree = PN.parse('800 + 3.14.14.141414.141414 * cos(sin(30) + 100)^2 + log(100 * 2 + 10)');
console.log(tree);
let res = tree.eval("",PN.defaultOpa);
console.log('결과값 : ' + res);