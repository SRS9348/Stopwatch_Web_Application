let startTime, updatedTime, difference = 0;
let running = false;
let interval;
const displayElement = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

// Change colors and sizes
displayElement.style.color = '#bc7000'; // Different color for display text
displayElement.style.fontSize = '72px'; // Larger font size
lapsContainer.style.color = '#823db4';  // Different color for lap text
lapsContainer.style.fontSize = '20px';  // Larger font size for laps

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateDisplay, 1000);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    difference = 0;
    running = false;
    displayElement.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    displayElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = displayElement.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapElement.style.color = '#6ec58f';  // Different color for lap elements
        lapElement.style.fontSize = '18px';  // Different font size for lap elements
        lapsContainer.appendChild(lapElement);
    }
}

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);
