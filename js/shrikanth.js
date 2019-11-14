let makeNoiseForFarWrist = true;
let makeNoiseForWristStraight = true;
let makeNoiseForElbowUp = true;

function handPositionValidations() {

  let leftWristPoints = points["leftWrist"];
  let leftElbowPoints = points["leftElbow"];
  let leftShoulderPoints = points["leftShoulder"];
  let rightWristPoints = points["rightWrist"];
  let rightElbowPoints = points["rightElbow"];
  let rightShoulderPoints = points["rightShoulder"];

  if (leftWristPoints.confidence > 0.8 && leftElbowPoints.confidence > 0.8) {

    validateWristShoulderPosition(leftWristPoints, leftElbowPoints,
      rightWristPoints, rightElbowPoints);
  }

  //console.log(leftWristPoints.confidence + ":" + leftElbowPoints.confidence + 
  //":" + leftShoulderPoints.confidence);

  if (leftWristPoints.confidence > 0.8 && leftElbowPoints.confidence > 0.8
    && leftShoulderPoints.confidence > 0.8) {

    let angleDeg = find_angle(leftShoulderPoints, leftWristPoints, leftElbowPoints);
    let distanceElbowShoulder = leftElbowPoints.y - leftShoulderPoints.y;
    validateWristPosition(angleDeg, distanceElbowShoulder);
    validateElbowPosition(angleDeg, distanceElbowShoulder);
  }

}


function validateWristShoulderPosition(leftWristPoints, leftElbowPoints,
  rightWristPoints, rightElbowPoints) {

  let distanceLeftWristElbow = leftWristPoints.x - leftElbowPoints.x;
  let distanceRightWristElbow = rightElbowPoints.x - rightWristPoints.x;

  if (leftWristPoints.x > leftElbowPoints.x && distanceLeftWristElbow > 13) {
    if (makeNoiseForFarWrist) {
      if(!muteInstructions){
        speechObj.speak('wrist is far from shoulder');
      }
      makeNoiseForFarWrist = false;
    }
  }
  else if (!(leftWristPoints.x > leftElbowPoints.x && distanceLeftWristElbow > 13)) {
    makeNoiseForFarWrist = true;
  }
}


function validateWristPosition(angleDeg, distanceElbowShoulder) {

  if (angleDeg < 50 && distanceElbowShoulder < 7) {
    if (makeNoiseForWristStraight) {
      if(!muteInstructions){
        speechObj.speak('Wrist straight');
      }
      makeNoiseForWristStraight = false;
    }
  }
  else if (!(angleDeg < 50 && distanceElbowShoulder < 7)) {
    makeNoiseForWristStraight = true;
  }
}


function validateElbowPosition(angleDeg, distanceElbowShoulder) {

  if (angleDeg < 75 && distanceElbowShoulder > 13) {
    if (makeNoiseForElbowUp) {
      if(!muteInstructions){
        speechObj.speak('Elbow Up');
      }
      makeNoiseForElbowUp = false;
    }
  }
  else if (!(angleDeg < 75 && distanceElbowShoulder > 13)) {
    makeNoiseForElbowUp = true;
  }
}