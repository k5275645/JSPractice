document.querySelector("#click").addEventListener('click', () => {
    const a = document.querySelector('#first').value;
    const b = document.querySelector('#second').value;
    if (a) {
        if (b) {
            document.querySelector('#result').textContent = a * b;
        } else {
            document.querySelector('#result').textContent = '두번째 값 입력해';
        }
    } else {
        document.querySelector('#result').textContent = '첫 값 입력해';
    }
});
