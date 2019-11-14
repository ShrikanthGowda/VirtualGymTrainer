let canvas, capture, speechObj, poseNet;
let debug = true;
let printPose = false;
let points = {};
let __fghtyui = [];
let doWork = false;
const handlerInProgress = {};

const statusIndicator = document.getElementById('status');
const muteIndicator = document.getElementById('muteToggle');

const wait = async (second) => new Promise(resolve => setTimeout(resolve, second * 1000));

document.addEventListener('keypress', async e => {
    if (handlerInProgress.spaceKey) {
        return;
    }
    if (e.keyCode === 32) {
        handlerInProgress.spaceKey = true;
        doWork = !doWork;
        if (doWork) {
            statusIndicator.style.background = 'yellow';
            speechObj.speak('Starting pose estimation. Please wait');
            await wait(2);
            poseNet.video = capture.elt;
            await poseNet.load();
            statusIndicator.style.background = 'green';
            speechObj.speak('Pose Estimate started.');
            await wait(2);
        } else {
            poseNet.video = null;
            poseNet.net = null;
            statusIndicator.style.background = 'red';
            speechObj.speak('Pose Estimate stopped.');
            await wait(2);
        }
        handlerInProgress.spaceKey = false;
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


