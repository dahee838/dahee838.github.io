

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
  background(63, 94, 2);
  scenes[currentScene].display();
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes, data[i].x))
  }
}


function Scene(sceneText, options, nextScenes, x) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;
  this.x = x;

  this.display = function() 
  {

    fill(255);
    textSize(42);
    text(this.sceneText, 100, 100);



    for (var i = 0; i < options.length; i++) {
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 150, 200 + i * 50);
      ellipse(this.x, 200, 50,50);
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