
let t = 0; // time variable 

function setup() {
  createCanvas(1900, 1060);
  noStroke();
  fill(255, 255, 255);
}

function draw() {
 
  background(7, 149, 244); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 10) {
    for (let y = 0; y <= height; y = y + 20) {

      // starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);

      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 30 * cos(3 * PI * t + angle);
      let myY = y + 30 * sin(3 * PI * t + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }

  t = t + 0.02; // update time
}


