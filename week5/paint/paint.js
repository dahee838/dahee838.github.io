// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// saving/loading paint data
// based on example by Jon Beilin

var paintmarks = [];
var paintDataFile = 'paintData.json';

function setup() {
  createCanvas(800, 700);
  
  createP('Red');
  red_slider = createSlider(0, 250, 50);
  createP('Green');
  green_slider = createSlider(0, 250, 50);
  createP('Blue');
  blue_slider = createSlider(0, 250, 50);
  createP('X');
  location_slider = createSlider(0, 200, 10);
  createP('Y');
  locationy_slider = createSlider(0, 100, 10);
}

function draw() {
  background(255);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

  fill(0);
  textSize(24);
  text("drag the mouse across the canvas to draw.", 50, 570);
  text("press 'S' to save a json file with the current paint data.", 50, 600);
  text("press 'L' to load a json file from your computer.", 50, 630);
}

function PaintMark(position) {
  this.position = position;

  this.display = function() {
    noStroke();
    fill(red_slider.value(),green_slider.value(),blue_slider.value());
    push();
    translate(location_slider.value(),locationy_slider.value());
    ellipse(this.position.x, this.position.y, 10, 10);
    pop();
  }

}

function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY)));
}

function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
}

function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      { 
        x: paintmarks[i].position.x, 
        y: paintmarks[i].position.y 
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}

function parsePaintData(data) {
  paintmarks = [];

  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y)));
  }
}