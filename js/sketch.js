let canvas, capture, speechObj, poseNet;
let debug = true;
let printPose = false;
let points = {};
let __fghtyui = [
    NOSE,
    LEFTEYE,
    RIGHTEYE,
    LEFTEAR,
    RIGHTEAR,
    LEFTSHOULDER,
    RIGHTSHOULDER,
    LEFTELBOW,
    RIGHTELBOW,
    LEFTWRIST,
    LEFTHIP,
    RIGHTWRIST,
    RIGHTHIP,
    LEFTKNEE,
    RIGHTKNEE,
    LEFTANKLE,
    RIGHTANKLE
];
let doWork = false;
const handlerInProgress = {};
let drawSkeleton = false;



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
    speechOutputObj = new p5.SpeechRec();
    speechOutputObj.onResult = gotSpeech;
    speechOutputObj.start(continuous, interimResults);
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
    __drawSkeleton();
}

function __drawMarkPositions() {
    fill(255, 0, 0);
    textSize(32);
    __fghtyui.forEach(p => {
        if (points[p] && points[p].confidence >= 0.1) {
            const confidence = points[p].confidence + '';
            text(confidence.substr(0, 5), points[p].x, points[p].y);
        }
    });
}

function mark(part) {
    __fghtyui.push(part);
}
function clearMarks() {
    __fghtyui = [];
}
function __drawSkeleton() {
    if (!drawSkeleton) {
        return;
    }
    strokeWeight(2);
    stroke(255, 0, 0);
    drawLine(LEFTEYE, RIGHTEYE);
    drawLine(LEFTEYE, NOSE);
    drawLine(RIGHTEYE, NOSE);

    drawLine(LEFTSHOULDER, RIGHTSHOULDER);

    drawLine(LEFTSHOULDER, LEFTELBOW);
    drawLine(LEFTELBOW, LEFTWRIST);

    drawLine(RIGHTSHOULDER, RIGHTELBOW);
    drawLine(RIGHTELBOW, RIGHTWRIST);

    drawLine(LEFTHIP, RIGHTHIP);

    drawLine(LEFTHIP, LEFTSHOULDER);
    drawLine(RIGHTSHOULDER, RIGHTHIP);
}
function drawLine(parta, partb) {
    const partAPoint = points[parta];
    const partBPoint = points[partb];
    if (partAPoint.confidence >= 0.5 && partBPoint.confidence >= 0.5) {
        line(points[parta].x, points[parta].y, points[partb].x, points[partb].y);
    }
}