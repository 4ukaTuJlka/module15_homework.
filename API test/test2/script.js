const screenWidth = window.screen.width
const screenHeight = window.screen.height
const callback = () => {
    alert('Ваш экран' + ' '+ screenWidth + 'x' + screenHeight +' '+ 'пикселей')
};
const button = document.querySelector('#btn');

button.addEventListener('click', callback);