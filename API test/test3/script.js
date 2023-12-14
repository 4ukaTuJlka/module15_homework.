const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const send1 = document.querySelector('.j-btn-send');
const geo = document.querySelector('.j-btn-geo');
const input = document.querySelector('.input2');
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');


let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function (evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function (evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'
        );
    };
    websocket.onerror = function (evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});

btnClose.addEventListener('click', () => {
    websocket.close();
    websocket = null;
});

send1.addEventListener('click', () => {
    const message = document.querySelector('.input2').value;
    writeToScreen("YOU: " + message);
    websocket.send(message);
});


function geoFindMe() {
    const mapLink = document.querySelector("#map-link");

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        output.textContent = "";
        mapLink.href = `https://www.openstreetmap.org/${latitude}/${longitude}`;
        mapLink.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    }

    function error() {
        output.textContent = "Невозможно получить ваше местоположение";
    }

    if (!navigator.geolocation) {
        output.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
        output.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

document.querySelector(".j-btn-geo").addEventListener("click", geoFindMe);










