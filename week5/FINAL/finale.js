//state machine + mouse transition is set up 
//insert the game in + images cloud and potato
//make the transition from game to lose the transition
//for the game and you're done with the bare minimum 



var visuals;
var ball1, paddle;
var gravity = 1;
var broadWidth = 100;
var broadHeight = 20;
var backgroundColor = (100,250,100);
var score = 0;
var alive = true;
var hit = [];
var slowDown = 10;
var clouds,potato;

var sceneState = {
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  LOSE: 4
};

var currentState = sceneState.INTRO;

var keyOn = false;
var tutorialTimer;
var gameTimer;
var gameTimePressed;
const timeForTutorial = 3000;
const timeForGame = 5000;

function preload()
{
    visuals = loadJSON("stuff.json");

    clouds = loadImage("cloud.png");
    potato = loadImage("potato.png");


}

function setup() 
{
  createCanvas(800, 500);
  ball1 = new ball();
  paddle = new paddle();
}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false;
  slowDown < 10 ? slowDown++ : slowDown = 10;
}


function ball() {
 this.x = random(width);
 this.y = 0;
 this.diameter = 100;
 this.xspeed = 0;
 this.yspeed = 0;
 this.hit = false;
 this.hitTime = 0;

 this.update = function() {
  this.xspeed = random(-5 - score, 5 + score);
  this.yspeed += gravity;

  if (abs(this.y + this.diameter - paddle.y) < this.yspeed && abs(this.x - paddle.x) < paddle.bWidth / 2) {

   this.hitx = this.x;
   this.hity = mouseY;
   for (var i = 0; i < 20; i++) {

    hit[i] = new spark(this.hitx, this.hity, true, random(20), random(-30, 30));
   }

   this.hit = true;
   this.hitTime = frameCount;
   this.yspeed = -this.yspeed;
   backgroundColor = 250;
   score++;
  }

 }


 this.move = function() {
  this.update();
  if (this.x <= this.diameter || this.x >= width - this.diameter) {
   this.xspeed = -this.xspeed * 5;
  }

  this.x += this.xspeed;
  this.y += this.yspeed * slowDown / 10;

 };

 this.display = function() {

  if (this.hit) {
   for (var i = 0; i < 20; i++) {

    hit[i].display();
   }

   if (frameCount - this.hitTime > 20) {
    this.hit = false;
   }
  }

  this.move();
  image(potato,this.x, this.y, this.diameter, this.diameter);
 };
}

function paddle() {
 this.x = mouseX;
 this.y = mouseY;
 this.bWidth = paddleWidth;
 this.bHeight = paddleHeight;

 this.update = function() {
  this.x -= (this.x - mouseX) * 0.5;
  this.y -= (this.y - mouseY) * 0.5;
 }

 this.display = function() {
  this.update();
  fill(255);
  image(clouds, this.x, this.y, this.bWidth, this.bHeight);
 }
}


function spark(x, y, alive, speed, speedAngle) {
 this.x = x;
 this.y = y;
 this.speed = speed;
 this.speedAngle = speedAngle;
 this.xspeed = this.speed * sin(this.speedAngle);
 this.yspeed = this.speed * cos(this.speedAngle);
 this.alive = alive;
 this.size = random(10);

 this.lifeSpan = 250;

 this.update = function() {
  this.xspeed >= 0 ? this.xspeed -= 1 : this.xspeed += 1;
  this.yspeed > 0 ? this.yspeed -= gravity : this.yspeed = 0;
  this.lifeSpan > 15 ? this.lifeSpan -= 10 : this.lifeSpan = 0;
  this.lifeSpan > 15 ? this.alive = true : this.alive = false;

  this.x += this.xspeed;
  this.y -= this.yspeed;

 }


 this.display = function() {
  if (alive) {
   this.update();
  }

  fill(this.lifeSpan);
  ellipse(this.x, this.y, this.size, this.size);

 }
}


function drawScene(whichScene) {
  switch (currentState) {
    case sceneState.INTRO:
      background(0);
      fill(255);
      textSize(70);
      textAlign(CENTER, CENTER);
      text("BOUNCY POATATO\nclick the mouse to start", width/2, height/2);
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        background(150, 200, 200);
        fill(0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("Keep the potato in the air!", width/2, height/2 - 100);
        textSize(32);
        text("use the mouse to control the cloud\npress the space bar to slow down the game", width/2, height/2);
        text("Press the spacebar to start", width/2, height/2 + 190);
      } else {
        background(150, 200, 250);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(32);
        text("use the mouse to control the cloud\npress the spcae bar to slow down the game", width/2, height/2);
      }
      break;
    case sceneState.GAME:
      var timeLeft = (timeForGame - (millis() - gameTimer))/1000;
      background(map(timeLeft, 5, 0, 255, 0), 250, 150);
      fill(0);
      textSize(164);
      textAlign(CENTER, CENTER);
      text(timeLeft.toFixed(1), width/2, height/2);
      break;
    case sceneState.LOSE:
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(250);
      textAlign(CENTER);
      text("YOU LOST! Press R to restart", width / 2, height / 2);
    default:
      break;
  }
}

function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      if (mouseIsPressed) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
      }
      break;
    case sceneState.GAME:
      if (mousePressed) {
        gameTimePressed = (timeForGame - (millis() - gameTimer))/1000;
        gameTimePressed = gameTimePressed.toFixed(3);

        if (gameTimePressed < 0.1 && gameTimePressed > -0.1) {
          currentState = sceneState.WIN;      
        } else {
          currentState = sceneState.LOSE;
        }
        setUpScene(currentState);
      }
      break;
    case sceneState.LOSE:
      if (keyOn) {
        currentState = sceneState.GAME;
        setUpScene(currentState);
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
    case sceneState.TUTORIAL:
      tutorialTimer = millis();
      break;
    case sceneState.GAME:
      gameTimer = millis();
      break;
    case sceneState.LOSE:
      break;
    default:
      break;
  }
}

function keyTyped() {

 if (key === "r") {
  alive = true;
  score = 0;
  ball1 = new ball();


 }

 if (key === " ") {
  broad1.bWidth += 150;
  broad1.bHeight *= 10;
  slowDown = slowDown - 8;
}
 }