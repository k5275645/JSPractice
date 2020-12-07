// document.querySelector(아이디)는 그 아이디의 태그를 가져온다.
const btn = document.querySelector('#button');

const dictionary = [];

btn.addEventListener('click', () => {
    // .은 ~의를 의미하는 것 같다.
    const wordTag = document.querySelector('#word');
    let word = wordTag.textContent;
    const inputTag = document.querySelector('#input');
    let input = inputTag.value;
    const errorTag = document.querySelector('#error');

    if (dictionary.includes(input)) {
        errorTag.textContent = '중복입니다.'
    } else {
        if (word[word.length - 1] === input[0]) {
            wordTag.textContent = input;
            errorTag.textContent = '';
            inputTag.value = '';
            inputTag.focus();
            dictionary.push(input);
        } else {
            errorTag.textContent = '땡';
            inputTag.value = '';
            inputTag.focus();
        }
    }
});