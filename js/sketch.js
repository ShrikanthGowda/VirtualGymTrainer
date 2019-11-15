let canvas, capture, speechObj, poseNet;
let points = {};
let doWork = false;
const handlerInProgress = {};
let frameSize = 300

const mlPaneElement = document.getElementById('ml-pane');
const statusIndicator = document.getElementById('status');
const muteIndicator = document.getElementById('muteToggle');

const wait = async (second) => new Promise(resolve => setTimeout(resolve, second * 1000));

const startProgram = async () => {
    if (handlerInProgress.startStop || doWork) {
        return;
    }
    handlerInProgress.startStop = true;
    doWork = true;
    statusIndicator.style.background = 'yellow';
    speechObj.speak('Starting pose estimation. Please wait');
    await wait(2);
    poseNet.video = capture.elt;
    await poseNet.load();
    statusIndicator.style.background = 'green';
    count = 0;
    speechObj.speak('Pose Estimate started.');
    await wait(2);
    handlerInProgress.startStop = false;
}
const stopProgram = async () => {
    if (handlerInProgress.startStop || !doWork) {
        return;
    }
    handlerInProgress.startStop = true;
    doWork = false;
    poseNet.video = null;
    poseNet.net = null;
    statusIndicator.style.background = 'red';
    speechObj.speak('Pose Estimate stopped.');
    await wait(2);
    handlerInProgress.startStop = false;
}

document.addEventListener('keypress', async e => {
    if (e.keyCode === 32) {
        if (doWork) {
            stopProgram();
        } else {
            startProgram();
        }
    }
}, false)



function setup() {
    const mlPaneRect = mlPaneElement.getBoundingClientRect();
    speechObj = new p5.Speech();
    canvas = createCanvas(mlPaneRect.width, mlPaneRect.height);
    canvas.parent('ml-pane');
    const options = { video: { maxFrameRate: 5 } }
    capture = createCapture(options);
    capture.size(mlPaneRect.width, mlPaneRect.height)
    capture.parent('ml-pane');
    poseNet = ml5.poseNet(capture, { flipHorizontal: false, detectionType: 'single' });
    poseNet.on('pose', analysePoses);
    poseNet.video = null;
    poseNet.net = null;
    speechOutputObj = new p5.SpeechRec();
    speechOutputObj.onResult = gotSpeech;
    speechOutputObj.start(continuous, interimResults);
}

function windowResized() {
    const mlPaneRect = mlPaneElement.getBoundingClientRect();
    resizeCanvas(mlPaneRect.width, mlPaneRect.height);
    capture.size(mlPaneRect.width, mlPaneRect.height);
}


function analysePoses(poses) {
    if (poses.length > 0) {
        const { keypoints, score, ...positions } = poses[0].pose;
        points = positions;
        window.ls = points[LEFTSHOULDER]
        if (doWork) {
            countReps();
            checkIfLegStanceIsLess();
            //checkIfLegStanceIsMore();
            handPositionValidations();
            checkElbowBelowShoulder();
        }
    }
}
const countTextContainer = document.getElementById('countText');
function updateCount(repCount) {
    countTextContainer.innerText = repCount;
}