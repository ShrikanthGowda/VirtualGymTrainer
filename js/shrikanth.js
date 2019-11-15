let makeNoiseForFarWrist = true;
let makeNoiseForWristStraight = true;
let makeNoiseForElbowUp = true;

function handPositionValidations() {

  let leftWristPoints = points["leftWrist"];
  let leftElbowPoints = points["leftElbow"];
  let leftShoulderPoints = points["leftShoulder"];

  if (leftWristPoints.confidence > 0.5 && leftElbowPoints.confidence > 0.7) {

    validateWristShoulderPosition(leftWristPoints, leftElbowPoints, leftShoulderPoints);
  }

  if (leftWristPoints.confidence > 0.5 && leftElbowPoints.confidence > 0.7
    && leftShoulderPoints.confidence > 0.7) {

    let angleDeg = find_angle(leftShoulderPoints, leftWristPoints, leftElbowPoints);
    let distanceElbowShoulder = leftElbowPoints.y - leftShoulderPoints.y;

    validateWristPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints);
    //validateElbowPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints);
  }

}


function validateWristShoulderPosition(leftWristPoints, leftElbowPoints, leftShoulderPoints) {

  let distanceLeftWristElbow = leftWristPoints.x - leftElbowPoints.x;

  if (leftWristPoints.x > leftElbowPoints.x && distanceLeftWristElbow > 13
    && leftElbowPoints.y < leftShoulderPoints.y) {
    if (makeNoiseForFarWrist) {

      showError(901, "Wrist is falling away");
      if(!muteInstructions){
        speechObj.speak('Wrist is falling away');
      }
      makeNoiseForFarWrist = false;
    }
  }
  else if (!(leftWristPoints.x > leftElbowPoints.x && distanceLeftWristElbow > 18
    && leftElbowPoints.y < leftShoulderPoints.y)) {
    makeNoiseForFarWrist = true;
  }
}


function validateWristPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints) {

  // console.log(angleDeg + ":" + distanceElbowShoulder + ":" + (leftElbowPoints.y < leftShoulderPoints.y));
  if (angleDeg < 60 && distanceElbowShoulder > -15 && distanceElbowShoulder <15 ) {
    if (makeNoiseForWristStraight) {

      showError(903, "Lift your hands up");
      if(!muteInstructions){
        speechObj.speak('Lift your hands up');
      }
      makeNoiseForWristStraight = false;
    }
  }
  else if (!(angleDeg < 60 && distanceElbowShoulder > -15 && distanceElbowShoulder <15 )) {
    makeNoiseForWristStraight = true;
  }
}


function validateElbowPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints) {

  if ((angleDeg < 75 && angleDeg > 50) && distanceElbowShoulder > 13 && leftElbowPoints.y > leftShoulderPoints.y) {
    if (makeNoiseForElbowUp) {
      if (!muteInstructions) {
        speechObj.speak('Elbow Up');
      }
      makeNoiseForElbowUp = false;
    }
  }
  else if (!((angleDeg < 75 && angleDeg > 50) && distanceElbowShoulder > 13 && leftElbowPoints.y > leftShoulderPoints.y)) {
    makeNoiseForElbowUp = true;
  }
}