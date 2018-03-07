

var sceneData;
var currentScene = 0;
var scenes = [];


function preload() 
{
  sceneData = loadJSON('scenes.json');

}

function setup() {
  createCanvas(1200, 700);
  CreateScenesFromData(sceneData.scenes);
}

function draw() {
  background(250);
  scenes[currentScene].display();
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes, data[i].x,data[i].y,data[i].colorR,data[i].colorG,data[i].colorB))
  }
}


function Scene(sceneText, options, nextScenes, x,y, colorR,colorG,colorB) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;
  this.colorR = colorR;
  this.colorG = colorR;
  this.colorB = colorR;
  this.x = x;
  this.y = y;

  this.display = function() 
  {

    fill(255);
    textSize(42);
    text(this.sceneText, 100, 100);



    for (var i = 0; i < options.length; i++) {
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 150, 200 + i * 50);
      noStroke();
      fill(this.colorR,this.colorG,this.colorB);
      ellipse(this.x, this.y, 50,50);
    }
  }
}


function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}