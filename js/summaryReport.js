const repsCountElem = document.getElementById('repsCount');
const elapsedTimeElem = document.getElementById('duration');
const summaryReportElem = document.getElementById('summaryReport');
const mistakeTitle = document.getElementById('mistakeTitle');
const mistakeDetailContainer = document.getElementById('mistakeDetails');


function showSummary() {
    summaryReportElem.style.display = 'block';
    repsCountElem.innerText = count + '';
    mistakeTitle.innerText = 'Mistakes ( ' + mistakeCount + ' )';
    mistakeDetailContainer.innerHTML = Object.keys(mistakeDetails)
        .map(code => {
            const mistake = mistakeDetails[code];
            return `<h4>${mistake.message} - ${mistake.count}x</h4>`
        })
        .reduce((a, b) => a + b, '');
    const seconds = "00" + elapsed % 60;
    const minutes = "00" + (elapsed / 60).toFixed();
    elapsedTimeElem.innerText = minutes.substr(minutes.length - 2) + " : " + seconds.substr(seconds.length - 2);
}

function hideSummary() {
    summaryReportElem.style.display = 'none';
}