let serverUrl = 'http://127.0.0.1:7000';

let canvas = document.getElementById("canvas");
canvas.style.border = "solid 1px black";
ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

function draw(point1, point2) {
    ctx.clearRect(0, 0, 500, 500);
    let startPoint = {x: 0, y: 250};
    ctx.fillStyle = 'black';

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

function drawDot(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.stroke();
    ctx.fill();
}

canvas.addEventListener('click', event => {
    let point = {
        x: event.x - canvas.offsetLeft,
        y: event.y - canvas.offsetTop
    }

    postData(point).then(data => {
        draw(data.point1, data.point2);
        drawDot(point);
    })
})

async function postData(data = {}) {
    const response = await fetch(serverUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
