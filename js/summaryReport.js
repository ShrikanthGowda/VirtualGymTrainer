const repsCountElem = document.getElementById('repsCount');
const elapsedTimeElem = document.getElementById('duration');
const summaryReportElem = document.getElementById('summaryReport');

function showSummary() {
    summaryReportElem.style.display = 'block';
    repsCountElem.innerText = count + '';
    const seconds = "00" + elapsed % 60;
    const minutes = "00" + (elapsed / 60).toFixed();
    elapsedTimeElem.innerText = minutes.substr(minutes.length - 2) + " : " + seconds.substr(seconds.length - 2);
}

function hideSummary() {
    summaryReportElem.style.display = 'none';
}