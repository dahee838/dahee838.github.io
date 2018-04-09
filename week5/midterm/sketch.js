


//define variables first! <3 
var sceneData;
var scenes = [];
var currentScene = 0;
var potato;
var sSlider;
var hSlider;
var house;
var mousePress = false; 



var sceneState = {
  INTRO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5
};

var thisScene = sceneState.INTRO;

//preload all the data inclding images, JSON fine
function preload()
{

potato = loadImage("potato.png");
house = loadImage("house.png");

sceneData = loadJSON('stuff.json');
}


//setup canvas size and all


function setup()
{
	createCanvas(1250,690);
  CreateScenesFromData(sceneData.scenes);
  sSlider = createSlider(10, 190, 0);
  sSlider.position(20, 10);
  hSlider = createSlider(10, 870, 0);
  hSlider.position(220, 10);

}

//where the stuff happens

function draw()
{
  background(178, 221, 255);
  drawScene(thisScene);
  checkTransition(thisScene);
  var s = sSlider.value();
  var h = hSlider.value();
  noStroke();
  fill(255,200,0);
  ellipse(1000,s - 45, 50,50);

  image(house,50,h - 400,200,200);
  noStroke();
  fill(78, 119, 1);
  rect(0,650,1250,400);

  mousePress = false; 



}

 //pulling data from JSON 

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].thatOneBit, data[i].options, data[i].nextScenes, data[i].x,  data[i].y))
  }
}

//the displayed stuff
function drawScene(whichScene)
{

switch (thisScene) {
    case sceneState.INTRO:
    background(178, 221, 255);

    noStroke();
    fill(255);
    ellipse(300,290,50,24);
    ellipse(280,300,50,24);
    ellipse(316,300,50,24);

    ellipse(140,100,120,80);
    ellipse(220,100,120,80);
    ellipse(170,70,120,80);
    ellipse(160,100,120,80);
    ellipse(240,100,120,80);
    ellipse(200,70,120,80);

    ellipse(550,220,80,40);
    ellipse(570,210,80,40);
    ellipse(590,220,80,40);
    scenes[currentScene].display();
      break;
    case sceneState.ONE:
    background(178, 221, 255);

    noStroke();
    fill(255);
    ellipse(350,290,50,24);
    ellipse(330,300,50,24);
    ellipse(366,300,50,24);

    ellipse(190,100,120,80);
    ellipse(270,100,120,80);
    ellipse(220,70,120,80);
    ellipse(210,100,120,80);
    ellipse(290,100,120,80);
    ellipse(250,70,120,80);

    ellipse(600,220,80,40);
    ellipse(620,210,80,40);
    ellipse(640,220,80,40);
    scenes[currentScene].display();
      break;
    case sceneState.TWO:
    background(178, 221, 255);

    noStroke();
    fill(255);
    ellipse(400,290,50,24);
    ellipse(380,300,50,24);
    ellipse(410,300,50,24);

    ellipse(240,100,120,80);
    ellipse(320,100,120,80);
    ellipse(270,70,120,80);
    ellipse(260,100,120,80);
    ellipse(340,100,120,80);
    ellipse(300,70,120,80);

    ellipse(650,220,80,40);
    ellipse(670,210,80,40);
    ellipse(690,220,80,40);
    scenes[currentScene].display();

      break;
    case sceneState.THREE:
    background(178, 221, 255);

    noStroke();
    fill(255);
    ellipse(450,290,50,24);
    ellipse(430,300,50,24);
    ellipse(560,300,50,24);

    ellipse(290,100,120,80);
    ellipse(370,100,120,80);
    ellipse(320,70,120,80);
    ellipse(310,100,120,80);
    ellipse(390,100,120,80);
    ellipse(350,70,120,80);

    ellipse(700,220,80,40);
    ellipse(720,210,80,40);
    ellipse(740,220,80,40);


    scenes[currentScene].display();
      break;
    case sceneState.FOUR:
    
    background(178, 221, 255);

    noStroke();
    fill(255);
    ellipse(1300,290,50,24);
    ellipse(1300,300,50,24);
    ellipse(1300,300,50,24);

    ellipse(1300,100,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,70,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,70,120,80); 

    ellipse(1300,220,80,40);
    ellipse(1300,210,80,40);
    ellipse(1300,220,80,40); 
    scenes[currentScene].display();
      break;
    case sceneState.FIVE:
   background(178, 221, 255);
    noStroke();
    fill(255);
    ellipse(1300,290,50,24);
    ellipse(1300,300,50,24);
    ellipse(1300,300,50,24);

    ellipse(1300,100,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,70,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,100,120,80);
    ellipse(1300,70,120,80);

   ellipse(1300,220,80,40);
   ellipse(1300,210,80,40);
   ellipse(1300,220,80,40);

   
    scenes[currentScene].display();
      break;
    default:
      break;
  }
}

  //transitions

function checkTransition(whichScene)
{
switch (thisScene) {
    case sceneState.INTRO:
          if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }
    
      break;
    case sceneState.ONE:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.TWO:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.THREE:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.FOUR:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.FIVE:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    default:
      break;
  }
}

function setUpScene(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      break;
    case sceneState.ONE:
      break;
    case sceneState.TWO:
      break;
    case sceneState.THREE:
      break;
    case sceneState.FOUR:
      break;
    case sceneState.FIVE:
      break;
    default:
      break;
  }
}

//the stuff classses
function Scene(sceneText, thatOneBit, options, nextScenes, x,y) {
  this.sceneText = sceneText;
  this.thatOneBit = thatOneBit;
  this.options = options;
  this.nextScenes = nextScenes;
  this.x = x; 
  this.y = y;

  this.display = function() 
  {

    fill(0);
    textSize(32);
    text(this.sceneText, 100, 100);
    textSize(14);
    text(this.thatOneBit, 100, 120);
    textSize(24);
    for (var i = 0; i < options.length; i++) {
      text('Go to: ' + this.options[i], 150, 200 + i * 50);
    }

    image(potato, this.x,this.y, 400,400);
  }
}

function mousePressed()
{

mousePress = true;

}


//keyPressed stuff for calling different parts of the data
function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}








