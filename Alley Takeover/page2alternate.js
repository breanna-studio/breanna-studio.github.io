
let t = 0; // time variable

function setup() {
  createCanvas(2000, 1060);
  noStroke();
  fill(244, 66, 78 );
}

// XGA = 1024 x 768 pixels.
// WXGA = 1280 x 800 pixels.
// HD = 1920 x 1080 pixels

function draw() {
 
  background(10, 10,); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      let xAngle = map( 1300, width, -4 * PI, 4 * PI, true);
      let yAngle = map( 1300, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 75 * cos(2 * PI * t + angle);
      let myY = y + 75 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 8); // draw particle
    }
  }

  t = t + 0.02; // update time
}
