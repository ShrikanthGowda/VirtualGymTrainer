let debug = true;

let __fghtyui = [
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

let drawSkeleton = false;
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
        if (points[p]) {
            const confidence = points[p].confidence + '';
            const xPos = points[p].x + '';
            const textStr = xPos.substr(0, 5);
            text(textStr, points[p].x, points[p].y);
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