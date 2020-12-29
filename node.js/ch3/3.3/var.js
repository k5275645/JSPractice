const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports = {
    //odd: odd,
    //even: even,
    odd,
    even,
};

exports.odd = odd;
exports.even = even;

// module.exports와 exports.xxx의 구성이 같으면 같이 쓸 수 있지만, 달라지면 참조관계가 안돼서 같이 못씀