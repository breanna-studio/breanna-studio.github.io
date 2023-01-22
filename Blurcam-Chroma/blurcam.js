





// <----------------SETUP--------------->


// here we assign a variable for the video element
var video = document.querySelector("#videoElement");

//here we ask for video permission from the user
//then tell it to display on the screen


if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.style.transform = "scale(-1,1)";
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '')
  });
}

// function randomBlur() {
//   return Math.random() * 30
// }

// function randomHue() {
//   return Math.random() * 360
// }

// function hueBlur(video) {

//   video.animate(
//     {filter: [`blur(${randomBlur()}px)`, `hue-rotate(${randomHue()}deg)`],
//     filter: [`blur(${randomBlur()}px)`, `hue-rotate(${randomHue()}deg)`],
//     filter: [`blur(${randomBlur()}px)`, `hue-rotate(${randomHue()}deg)`]},
//   {
//     duration: 10000,
//     iterations: Infinity,
//     'animation-timing-function': 'ease-in-out'
//   })
// }

// var cam = document.querySelectorAll('.webcam')

// cam.forEach(hueBlur)


//<-----------------------DOT PATTERN----------->


//I made twinkling dots using p5.js
let t = 0; // time variable

// this is the function that creates the canvas and sets the drawing color
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight); 
  noStroke();
  fill(255, 255, 255); // set the circle color to white
}

// this function draws circles within the canvas
function draw() {
  background(10, 10); // setting a translucent background (creates trails)
  
  // make a x and y grid of ellipses: smaller number = more particles
  for (let x = 0; x <= width; x = x + 70) {
    for (let y = 0; y <= height; y = y + 60) {
      // starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 100 * cos(40 * PI * t + angle);
      let myY = y + 50 * sin(10 * PI * t + angle);

      ellipse(myX, myY, 2); // draw particle - bigger number = bigger particle
    }
  }

  t = t + 0.02; // update time
}



//<------------TEXT ANIMATION--------------->

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}



// gets random number for opacity
// returns number between 0 and 1
function randomOpacity() {
  return Math.random() * 0.6
}

// gets random number for location
// returns string with a number between 0 and 1 multiplied by 80 plus the % sign
function randomLocation() {
  return Math.random() * 99 + '%'
}

function executeScramble(txt){
  //const el = document.querySelector('.text')
  const fx = new TextScramble(txt)

  var phrases = txt.innerText.split('\n\n')

  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1000)
    })
    counter = (counter + 1) % phrases.length
  }
  next()
}



// changes opacity and location of our text elements in three steps to create fade-thru effect
//also runs our executescramble function from above
function changeAnimation(txt) {

  executeScramble(txt)

  txt.animate([
    {opacity:randomOpacity()}, 

    {opacity:randomOpacity(), top:randomLocation(), left: randomLocation()}, 

    {opacity:randomOpacity(), top:randomLocation(), left: randomLocation()}], 

    {
    duration: 100000,
    iterations: Infinity
  })
}

//sets the variable Text to the list of elements in the class .text
var Text = document.querySelectorAll('.text')

// runs the changeAnimation function for each element in .text
Text.forEach(changeAnimation)
//Text.forEach(executeScramble)









// function getOpacity () {

//   let o = Math.random()
//   return `opacity(${o})`

// }

// function changeOpacity (){
//   text1.style.opacity = getOpacity ()
// }

// changeOpacity ()

// positionElement(text1)






















