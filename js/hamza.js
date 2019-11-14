let count = 0;
let counted = false;
let spokenLSL = false;
let spokenLSM = false;

function countReps() {
    angle = find_angle(points["leftWrist"], points["leftShoulder"], points["leftElbow"]);
    if ((angle > 130)
        && (points["leftWrist"].y < points["leftElbow"].y)
        && (counted == false)
        && (!(points["leftWrist"].x > points["leftElbow"].x))) {
        if (points["leftElbow"].confidence > 0.6) {
            count += 1
            counted = true
            speak(count)
            //console.log(count)
        }
    }
    if (angle < 120 && (points["leftWrist"].y < points["leftElbow"].y)) {
        counted = false
    }
    return count
}


function checkIfLegStanceIsLess() {
    var legStance;
    var shoulderWidth;
    //console.log(points["leftAnkle"].confidence + "  " + points["rightAnkle"].confidence + "  " + points["leftShoulder"].confidence + "  " + points["rightShoulder"].confidence);
    if (points["leftAnkle"].confidence > 0.4 && points["rightAnkle"].confidence > 0.4) {
        legStance = abs(points["leftAnkle"].x - points["rightAnkle"].x)
        //console.log(legStance)
    }
    if (points["leftShoulder"].confidence > 0.7 && points["rightShoulder"].confidence > 0.7) {
        shoulderWidth = abs(points["leftShoulder"].x - points["rightShoulder"].x)
        //console.log(shoulderWidth)
    }


    if (legStance < 0.8 * shoulderWidth && spokenLSL == false) {
        spokenLSL = true
        if(!muteInstructions){
        speak("Increase leg stance")
        }
    }
    if (legStance >= 0.9 * shoulderWidth) {
        spokenLSL = false
    }
}


function checkIfLegStanceIsMore() {
    var legStance;
    var shoulderWidth;

    if (points["leftAnkle"].confidence > 0.4 && points["rightAnkle"].confidence > 0.4) {
        legStance = abs(points["leftAnkle"].x - points["rightAnkle"].x)
    }
    if (points["leftShoulder"].confidence > 0.7 && points["rightShoulder"].confidence > 0.7) {
        shoulderWidth = abs(points["leftShoulder"].x - points["rightShoulder"].x)
    }




    if (legStance > 1.4 * shoulderWidth && spokenLSM == false) {
        spokenLSM = true
        if(!muteInstructions){
        speak("Decrease your leg stance")
        }
    }
    if (legStance <= 1.3 * shoulderWidth) {
        spokenLSM = false
    }
}



function find_angle(p0, p1, c) {
    var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) +
        Math.pow(c.y - p0.y, 2));
    var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) +
        Math.pow(c.y - p1.y, 2));
    var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) +
        Math.pow(p1.y - p0.y, 2));
    var angleRad = Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c));

    return (angleRad * 180) / Math.PI;
}

function speak(text) {
    speechObj.speak(text)
}