

var ball1, broad1;
var gravity = 1;
var broadWidth = 100;
var broadHeight = 20;
var backgroundColor = (100,250,100);
var score = 0;
var alive = true;
var hit = [];
var slowDown = 10;
var clouds,potato;


function preload()
{

clouds = loadImage("cloud.png");
potato = loadImage("potato.png")
}


function setup() {
 createCanvas(1200, 700);
 background(100,250,100);
 ball1 = new ball();
 broad1 = new broad();
 noStroke();

}

function draw() {
 background(backgroundColor);
 rectMode(CENTER);

 slowDown < 10 ? slowDown++ : slowDown = 10;






 if (alive) {
  broad1.bWidth += (broadWidth-broad1.bWidth)*0.1;
  broad1.bHeight += (broadHeight-broad1.bHeight)*0.1;
  
  ball1.display();

  broad1.display();
  backgroundColor -= (backgroundColor - 0) * 0.3;
  textSize(25);
  text("score: " + score, 50, 50);
 } 

 else 
 {
  textSize(60);
  fill(250);
  textAlign(CENTER);
  text("YOU LOST! Press R to restart", width / 2, height / 2);
 }

 if (ball1.y > height) {
  alive = false;


 }

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

  if (abs(this.y + this.diameter - broad1.y) < this.yspeed && abs(this.x - broad1.x) < broad1.bWidth / 2) {

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

function broad() {
 this.x = mouseX;
 this.y = mouseY;
 this.bWidth = broadWidth;
 this.bHeight = broadHeight;

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

 function mousePressed()
{

  
}
}