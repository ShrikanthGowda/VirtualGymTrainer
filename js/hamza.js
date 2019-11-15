let count = 0;
let counted = false;
let spokenLSL = false;
let spokenLSM = false;
let muteInstructions = true;
let spokenElbowUP = false;


function countReps() {
    // console.log("inside")
    if (points["leftElbow"].confidence > 0.7 && points["leftShoulder"].confidence > 0.7 && points["leftWrist"].confidence > 0.5) {
        // console.log(points["leftWrist"].x + "   " + points["leftElbow"].x)
        angle = find_angle(points["leftWrist"], points["leftShoulder"], points["leftElbow"]);
        // console.log(angle)
        if ((angle > 130)
            && (points["leftWrist"].y < points["leftElbow"].y)
            && (counted == false)
            && ((points["leftWrist"].x < points["leftElbow"].x))
            // && points["leftElbow"].y < points["nose"].y
        ){
            if (points["leftElbow"].confidence > 0.7 && points["leftShoulder"].confidence > 0.7 && points["leftWrist"].confidence > 0.5) {
                count += 1
                counted = true
                speak(count)
                //console.log(count)
            }
        }
        // if (points["leftElbow"].y > points["nose"].y) {
        //     counted = false
        // }
        if(angle < 100 && angle > 30){
            counted = false
        }
    // return count
    }
}

function countReps3() {
    // console.log("inside")
    // angle = find_angle(points["leftWrist"], points["leftShoulder"], points["leftElbow"]);
    // console.log(angle)
    // if ((angle > 130)
    //     && (points["leftWrist"].y < points["leftElbow"].y)
    //     && (counted == false)
    //     && (!(points["leftWrist"].x > points["leftElbow"].x))) {
    //     if (points["leftElbow"].confidence > 0.5 && points["leftShoulder"].confidence > 0.5 && points["leftWrist"].confidence > 0.3) {
    //         count += 1
    //         counted = true
    //         speak(count)
    //         //console.log(count)
    //     }
    // }
    // if (angle < 130 && (points["leftWrist"].y < points["leftElbow"].y)) {
    //     counted = false
    // }

    if (points["leftElbow"].y < points["nose"].y && counted == false && points["leftElbow"].confidence > 0.5 && points["nose"].confidence > 0.5){
        count += 1
        counted = true
        if(count%2 == 0){
            speak(count/2)
        }
    }
    if (points["leftElbow"].y > points["nose"].y){
        counted = false;
    }
    // return count
}
function countReps2() {
    // console.log("inside")
    angle = find_angle(points["leftElbow"],points["leftHip"], points["leftShoulder"], );
    // console.log(angle)
    if ((angle < 100)
        && (points["leftWrist"].y < points["leftElbow"].y)
        && (counted == false)
        && (!(points["leftWrist"].x > points["leftElbow"].x))) {
        if (points["leftElbow"].confidence > 0.6 && points["leftHip"].confidence > 0.6) {
            count += 1
            counted = true
            speak(count)
            //console.log(count)
        }
    }
    if (angle >120 && (points["leftWrist"].y < points["leftElbow"].y)) {
        counted = false
    }
    // return count
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


    if (legStance < 0.8 * shoulderWidth 
        && spokenLSL == false 
        && points["leftAnkle"].confidence > 0.5 
        && points["rightAnkle"].confidence > 0.5
        && points["leftShoulder"].confidence > 0.7 
        && points["rightShoulder"].confidence > 0.7
        ) {
        spokenLSL = true
        if (!muteInstructions) {
            speak("Increase leg stance")
        }
    }
    if (legStance >= 1.1 * shoulderWidth) {
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




    if (legStance > 1.4 * shoulderWidth 
        && spokenLSM == false
        && points["leftAnkle"].confidence > 0.5 
        && points["rightAnkle"].confidence > 0.5
        && points["leftShoulder"].confidence > 0.7 
        && points["rightShoulder"].confidence > 0.7
        ) {
        spokenLSM = true
        if (!muteInstructions) {
            speak("Decrease your leg stance")
        }
    }
    if (legStance <= 1.35 * shoulderWidth) {
        spokenLSM = false
    }
}

function checkElbowBelowShoulder(){
    // elbowY = coordinate(LEFTELBOW, Y);
    // shoulderY = coordinate(LEFTSHOULDER, Y);
    // wristY = coordinate(LEFTWRIST, Y);

    elbowY = points["leftElbow"].y;
    shoulderY = points["leftShoulder"].y;
    wristY = points["leftWrist"].y;
  
    // console.log("W: "+wristY + "   " + elbowY +"  "+ shoulderY)  //wrist is nearer to top left and lesser than elbow
    
    angle = find_angle(points["leftElbow"], points["leftHip"],points["leftShoulder"]);
    // console.log(angle);


    // console.log(angle)
  
    if (angle < 80 && angle > 25
      && spokenElbowUP == false
      && wristY < elbowY 
      && points["leftElbow"].confidence > 0.4
      && points["leftHip"].confidence > 0.4
      && points["leftShoulder"].confidence > 0.4){
        //   console.log(angle)
        if(!muteInstructions){
      speak("Lift your elbow up");
      
      spokenElbowUP = true
        }
    }
    if(angle > 80){
      spokenElbowUP = false
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