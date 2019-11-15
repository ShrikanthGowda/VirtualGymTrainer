let updateInterval;
let elapsed = 0;

const timerContainer = document.getElementById('timerContainer');

function startTimer() {
    elapsed = 0;
    if (updateInterval) {
        clearInterval(updateInterval);
        timerContainer.innerText = "00 : 00";
    }
    updateInterval = setInterval(() => {
        elapsed++;
        const seconds = "00" + elapsed % 60;
        const minutes = "00" + (elapsed / 60).toFixed();
        timerContainer.innerText = minutes.substr(minutes.length - 2) + " : " + seconds.substr(seconds.length - 2);
    }, 1000)
}
function stopTimer() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}