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
    //validateWristPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints);
    //validateElbowPosition(angleDeg, distanceElbowShoulder, leftElbowPoints, leftShoulderPoints);
  }

}


function validateWristShoulderPosition(leftWristPoints, leftElbowPoints, leftShoulderPoints) {

  let distanceLeftWristElbow = leftWristPoints.x - leftElbowPoints.x;

  if (leftWristPoints.x > leftElbowPoints.x && distanceLeftWristElbow > 13
    && leftElbowPoints.y < leftShoulderPoints.y) {
    if (makeNoiseForFarWrist) {
      if (!muteInstructions) {
        speechObj.speak('wrist is far from shoulder');
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

  console.log(angleDeg);
  if (angleDeg < 60 && distanceElbowShoulder < 7 && leftElbowPoints.y < leftShoulderPoints.y && angleDeg > 20) {
    if (makeNoiseForWristStraight) {
      if (!muteInstructions) {
        speechObj.speak('Wrist straight');
      }
      makeNoiseForWristStraight = false;
    }
  }
  else if (!(angleDeg < 60 && distanceElbowShoulder < 7 && leftElbowPoints.y < leftShoulderPoints.y && angleDeg > 20)) {
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