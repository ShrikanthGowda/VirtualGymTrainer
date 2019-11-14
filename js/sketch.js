let canvas, capture, speechObj;
let debug = true;
let printPose = false;
let points = {};
let __fghtyui = [];
let doWork = false;

const statusIndicator = document.getElementById('status');

document.addEventListener('keypress', e => {
    if (e.keyCode === 32) {
        doWork = !doWork;
        if (doWork) {
            statusIndicator.style.background = 'green';
        } else {
            statusIndicator.style.background = 'red';
        }
    }
}, false)

function setup() {
    speechObj = new p5.Speech();
    canvas = createCanvas(1200, 900);
    canvas.parent('ml-pane');
    capture = createCapture(VIDEO);
    capture.size(1200, 900)
    poseNet = ml5.poseNet(capture);
    poseNet.on('pose', gotPoses);
    capture.parent('ml-pane');
}

function gotPoses(poses) {
    if (poses.length > 0) {
        if (printPose) {
            console.log(poses[0].pose);
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


