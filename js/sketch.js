let canvas, capture, speechObj, poseNet;
let debug = true;
let printPose = false;
let points = {};
let __fghtyui = [];
let doWork = false;
let muteInstructions = true;

const statusIndicator = document.getElementById('status');
const muteIndicator = document.getElementById('muteToggle');


document.addEventListener('keypress', async e => {
    if (e.keyCode === 32) {
        doWork = !doWork;
        if (doWork) {
            statusIndicator.style.background = 'yellow';
            poseNet.video = capture.elt;
            await poseNet.load();
            statusIndicator.style.background = 'green';
        } else {
            poseNet.video = null;
            poseNet.net = null;
            statusIndicator.style.background = 'red';
        }
    }
}, false)

document.addEventListener('keypress', e => {
    if (e.keyCode === 77) {
        muteInstructions = !muteInstructions;
        if (muteInstructions) {
            muteIndicator.style.background = 'red';
        } else {
            muteIndicator.style.background = 'green';
        }
    }
}, false)

function setup() {
    speechObj = new p5.Speech();
    canvas = createCanvas(1200, 900);
    canvas.parent('ml-pane');
    const options = { video: { maxFrameRate: 5 } }
    capture = createCapture(options);
    capture.size(1200, 900)
    capture.parent('ml-pane');
    poseNet = ml5.poseNet(capture, { flipHorizontal: true, detectionType: 'single' });
    poseNet.on('pose', analysePoses);
    poseNet.video = null;
    poseNet.net = null;
}

function analysePoses(poses) {
    if (poses.length > 0) {
        if (printPose) {
            console.log(poses);
            printPose = false;
        }
        const { keypoints, score, ...positions } = poses[0].pose;
        points = positions;
        if (doWork) {
            countReps();
            checkIfLegStanceIsLess();
            checkIfLegStanceIsMore();
            handPositionValidations();
        }
    }
}
function draw() {
    canvas.clear();
    if (!debug) {
        return;
    }
    __drawMarkPositions();
}

function __drawMarkPositions() {
    fill(255, 0, 0);
    __fghtyui.forEach(p => points[p] && ellipse(points[p].x, points[p].y, 10));
}

function mark(part) {
    __fghtyui.push(part);
}
function clearMarks() {
    __fghtyui = [];
}


