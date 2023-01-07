var imgArray =[
'images/aftm-1.jpeg',
'images/AFTM-2.png',
'images/AFTM-5.png'
];

var curIndex = 0;

var imgDuration = 5000;

function slideShow() {
  document.getElementById('scope').src = imgArray[curIndex];
  curIndex++;
  if (curIndex == imgArray.length) { curIndex = 0; }
    setTimeout("slideShow()", imgDuration);
  }

  slideShow();