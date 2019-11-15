const errorTexts = {

}
const stayTime = 3000;
const errorContainer = document.getElementById('rightSidebar');
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
    }
}
function removeElement(elem, code) {
    return function () {
        errorContainer.removeChild(elem);
        errorTexts[code] = undefined;
    }
}