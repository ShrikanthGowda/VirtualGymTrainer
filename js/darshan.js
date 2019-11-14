let speechOutputObj;
let interimResults = false;
let continuous = true;


function gotSpeech() {
    const speech = speechOutputObj.resultString;
    console.log("Detected speech:", speech);
    if (speech.includes('start') || speech.includes('shoulder') || speech.includes('press') && speech.confidence > 0.60) {
        startProgram();
    }
    else if (speech.includes('stop')) {
        stopProgram();
    }
}