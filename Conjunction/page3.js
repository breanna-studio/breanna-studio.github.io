
let t = 0; // time variable

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(191, 184, 189);
}

function draw() {
 
  background(10, 10, ); // translucent background (creates trails)  

  // make a x and y grid of ellipses 
  for (let x = 0; x <= width; x = x + 80) {
    for (let y = 0; y <= height; y = y + 80) {
      // starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 50 * cos(2 * PI * t + angle); //size of circle, direction
      let myY = y + 50 * sin(3 * PI * t + angle);

      ellipse(myX, myY, 40); // draw particle - bigger number bigger particle
    }
  }

  t = t + 0.02; // update time
}

anime({
  targets: '#small-frame',
  scale: 1.1,
  direction: 'alternate',
  loop: true,
  duration: 250,
  easing: 'easeInOutSine',
});
