const errorTexts = {

}

const stayTime = 6000;
const errorContainer = document.getElementById('errorTextContainer');

function showError(code, message) {
    const prvError = errorTexts[code];
    if (prvError) {
        clearTimeout(prvError.timeout);
        prvError.timeout = setTimeout(removeElement(prvError.elem, code), stayTime);
    } else {
        const elem = document.createElement('h3');
        elem.append(message);
        errorContainer.append(elem);
        const timeout = setTimeout(removeElement(elem, code), stayTime);
        errorTexts[code] = {
            elem, timeout
        }
        mistakeCount++;
        updateMistakeDetails(code, message);
    }
}

function removeElement(elem, code) {
    return function () {
        errorContainer.removeChild(elem);
        errorTexts[code] = undefined;
    }
}

function updateMistakeDetails(code, message) {
    const prvMistake = mistakeDetails[code];
    if (prvMistake) {
        prvMistake.count += 1;
    } else {
        mistakeDetails[code] = {
            count: 1,
            message
        }
    }
}