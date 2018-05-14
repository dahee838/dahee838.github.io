

var ball;
var p1, p2;
var p1Score = 0;
var p2Score = 0;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
var colliders = [];

var colliding;

var sceneState = {
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE: 4
};

var currentState = sceneState.INTRO;

var mouseOn = false;
var tutorialTimer;
var gameTimer;
var gameTimePressed;
const timeForTutorial = 3000;
const timeForGame = 5000;






function preload() {

}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {

  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  drawCollide(currentCollider);
  checkLevelUP (currentCollider);
  
  mouseOn = false;
  colliding = false;
}



function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
  for (var i = margin; i < height - margin - 15; i += 35) {
    var start = i;
    var finish = start + 15;
    line(width/2, start, width/2, finish);
  }

  fill(255);
  noStroke();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(p1Score, width/2-50, 70);
  text(p2Score, width/2+50, 70);
}




function drawScene(whichScene) {
  switch (currentState) {
    case sceneState.INTRO:
      background(0);
      fill(255);
      textSize(80);
      textAlign(CENTER, CENTER);
      text("Welcome to Pong", width/2, height/2);
      textSize(50);
      text("press the mouse to continue", width/2, height/2 + 120);
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        background(0);
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("use the W and S, or the Up and Down Arrows to move", width/2, height/2);

        textSize(24);
        text("win by hitting the ball behind the opposition", width/2, height/2 + 120);
        
      } else {
        background(0);
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("use the W and S, or the Up and Down Arrows to move", width/2, height/2);

        textSize(24);
        text("win by hitting the ball behind the opposition", width/2, height/2 + 120);
      }
      break;
    case sceneState.GAME:
        everything();
      break;
    case sceneState.WIN:
      background(0);
      fill(0);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("You WIN!\n" , width/2, height/2 - 70);
      textSize(24);
      text("Press any key to return to title", width/2, height - 100);
      fill(255);
      textSize(64);
      text("You WIN!\n", width/2 + 5, height/2 - 75);
      textSize(24);
      text("Press mouse to return to title", width/2 + 2, height - 102);
      break; 
    case sceneState.LOSE:
      background(0);
      fill(255);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("Play another Round", width/2, height/2);
      textSize(24);
      text("Press mouse to try again", width/2, height - 100);
    default:
      break;
  }
}

function everything() {
  background(0);
  drawField();

  p1.move(p1Up, p1Down);
  p2.move(p2Up, p2Down);

  ball.update();
  p1.update();
  p2.update();
  for (var i = 0; i < colliders.length; i++) {
    colliders[i].update();
  }

  p1.display();
  p2.display();

  for (var i = 0; i < colliders.length; i++) {
    colliders[i].display();
  }

  ball.display(); 

  checkCollisionWithBall(ball, p1);
  checkCollisionWithBall(ball, p2);

  for (var i = 0; i < colliders.length; i++) {
    checkCollisionWithBall(ball, colliders[i]);
  }

//   if (p1Score >= 5  || p2Score >= 5) {
// colliders.push(new Bryan());

// }

}

function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      if (mouseOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.TUTORIAL:
        if (mouseOn) {
          currentState++;
          setUpScene(currentState);      
        }
      break;
    case sceneState.GAME:

    //if the ball hits a crtain amount of times, queue another collider
    //if score +1 (aka point lost), some colliders exit
    //idea is that as score increases, as well as paddle hits, colliders increase
      if (p1Score >= 5 || p2Score >= 5) {
        textSize(24);
        text("Things are heating up", width/2, height - 100);
      }

       if (p1Score >= 9 || p2Score >= 9) {
        textSize(24);
        text("MATCH POINT!!", width/2, height - 100);
      }


      if (p1Score >= 10 || p2Score >= 10) {

          currentState = sceneState.WIN;      
        
        setUpScene(currentState);
      }
      break;
    case sceneState.WIN:
      if (mouseOn) {
        p1Score = 0;
        p2Score =0;
        currentState = sceneState.INTRO;
        setUpScene(currentState);
      }
      break;
    case sceneState.LOSE:
      if (mouseOn) {
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
      break;
    case sceneState.GAME:
      break;
    case sceneState.END:
      break;
    default:
      break;
  }
}

function mousePressed() {
  mouseOn = true;
}












function checkCollisionWithBall(ball, other) {
  if (ball.pos.x + ball.width/2 > other.pos.x && 
      ball.pos.x + ball.width/2 < other.pos.x + other.width && 
      ball.pos.y + ball.height/2 > other.pos.y &&
      ball.pos.y + ball.height/2 < other.pos.y + other.height) {
    ball.collided(other);
    other.collided(ball);
    colliding = true;
  }
}

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.angle = random(TWO_PI);
  this.speed = 7;
  this.vel.x = cos(this.angle) * this.speed;
  this.vel.y = sin(this.angle) * this.speed;
  this.width = 15;
  this.height = 15;

  this.update = function() {
    if (this.pos.x < -this.width) {
      p2Score++;
      this.resetAfterPoint(0);
    } else if (this.pos.x > width) {
      p1Score++;
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin || 
        this.pos.y > height - margin - this.height) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.resetAfterPoint = function(whichPlayer) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.speed = 7;
    if (whichPlayer === 1) {
      this.getStartingAngle(4 * PI/6, 8 * PI/6);
    } else if (whichPlayer === 0) {
      this.getStartingAngle(-PI/3, PI/3);
    }
  }

  this.getStartingAngle = function(angleLow, angleHigh) {  
    var angle = random(angleLow, angleHigh);
    this.vel.x = cos(angle) * this.speed;
    this.vel.y = sin(angle) * this.speed;
  }

  this.collided = function(other) {
    
  }
};

function Paddle(num) {
  this.num = num;
  this.width = 15;
  this.height = 80;
  if (num == 0) {
    this.pos = createVector(margin, height/2);
  } else {
    this.pos = createVector(width-this.width-margin, height/2);
  }
  this.vel = createVector(0, 0);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.move = function(up, down) {
    this.vel.y = 0;
    if (up) {
      if (this.pos.y > margin) {
        this.vel.y = -5;
      } else {
        this.pos.y = margin;
      } 
    }
    if (down) {
      if (this.pos.y + this.height < height - margin) {
        this.vel.y = 5;
      } else {
        this.pos.y = height - this.height - margin;
      }
    } 
  }

  this.collided = function(other) {
    var diff = (other.pos.y + other.height/2) - this.pos.y;
    if (this.num === 0) {
      angle = map(diff, 0, this.height, -PI/3, PI/3);
    }
    if (this.num === 1) {
      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
    }
    other.speed += 1;
    other.vel.x = cos(angle) * other.speed;
    other.vel.y = sin(angle) * other.speed;
  }
}



function keyPressed() {
  if (key === ' ') {
    switch (floor(random(9))) {
      case 0:
        colliders.push(new Bryan());
        break;
      case 1:
        colliders.push(new Yizhou());
        break;
      case 2:
        colliders.push(new Ellie());
        break;
      case 3:
        colliders.push(new Yanwen());
        break;
      case 4:
        colliders.push(new MaddyRed());
        colliders.push(new MaddyGreen());
        colliders.push(new MaddyBlue());
        break;
      case 5:
        colliders.push(new AlyssaForrest());
        break;
      case 6:
        colliders.push(new Sarah());
        break;
      case 7:
        colliders.push(new Jackie());
        break;
      case 8:
        colliders,push(new Cat());
        break;
    }
  }

  if (key === 'W') {
    p1Up = true;
  }
  if (key === 'S') {
    p1Down = true;
  }

  if (keyCode === UP_ARROW) {
    p2Up = true;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = true;
  }
}

function keyReleased() {
  if (key === 'W') {
    p1Up = false;
  }
  if (key === 'S') {
    p1Down = false;
  }

  if (keyCode === UP_ARROW) {
    p2Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = false;
  }
}





//Colliders State Machine



//current score
//previous score

//draw
//increase score

// if prev score =/= curent score
//then do something

//prev score 1 = current score = 1


var collideState = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8
};

var currentCollider = collideState.ZERO;

function drawCollide(whichCollide) {
  switch (currentCollider) {
    case collideState.ZERO:
      colliders.push(new Ellie());
      break;
    case collideState.ONE:
      colliders.push(new Yizhou());
      break;
    case collideState.TWO:
      colliders.push(new Bryan());
      break;
    case collideState.THREE:
      colliders.push(new Yanwen());
      break; 
    case collideState.FOUR:
      colliders.push(new MaddyRed());
      colliders.push(new MaddyGreen());
      colliders.push(new MaddyBlue());
        break;
    case collideState.FIVE:
      colliders.push(new AlyssaForrest());
        break;
    case collideState.SIX:
      colliders.push(new Sarah());
        break;
    case collideSTATE.SEVEN:
    colliders.push(new Jackie());
        break;
    case collideSTATE.EIGHT:
      colliders,push(new Cat());
      break;
    default:
      break;
  }
}

function checkLevelUP(whichCollide) {
  switch (whichCollide) {
    
      case collideState.ZERO:
      if (p1Score>=1   || p2Score >=1 ){
        currentCollider++;
        setUpCollider(currentCollider);
      } 
      break;
    case collideState.ONE:
      if (p1Score>=2  && ball.pos.x > width/2 -20 && ball.pos.x < width/2 +20 || p2Score >=2 && ball.pos.x > width/2 -20 && ball.pos.x < width/2 +20 ){
        currentCollider++;
        setUpCollider(currentCollider);
      }
      break;
    case collideState.TWO:
      if (p1Score>=3  || p2Score >=3  ){
        currentCollider++;
        setUpCollider(currentCollider);
      }
      break;
    case collideState.THREE:
      if (p1Score>=4 || p2Score >=4){
        currentCollider++;
        setUpCollider(currentCollider);
      }
      break; 
    case collideState.FOUR:
      if (p1Score>=5 || p2Score >=5){
        currentCollider++;
        setUpCollider(currentCollider);
      }
        break;
    case collideState.FIVE:
      if (p1Score>=6 || p2Score >=6){
        currentCollider++;
        setUpCollider(currentCollider);
      }
        break;
    case collideState.SIX:
      if (p1Score>=7 || p2Score >=7){
        currentCollider++;
        setUpCollider(currentCollider);
      }
        break;
    case collideSTATE.SEVEN:
    if (p1Score>=8 || p2Score >=8){
        currentCollider++;
        setUpCollider(currentCollider);
      }
        break;
    case collideSTATE.EIGHT:
      if (p1Score>=9 || p2Score >=9){
        currentCollider++;
        setUpCollider(currentCollider);
      }
      break;
    default:
      break;
  }
}


function setUpCollider(whichCollide) {
 switch (currentCollider) {
    case collideState.ZERO:
      
      break;
    case collideState.ONE:
      
      break;
    case collideState.TWO:
      
      break;
    case collideState.THREE:
      
      break; 
    case collideState.FOUR:
     
        break;
    case collideState.FIVE:
      
        break;
    case collideState.SIX:
      
        break;
    case collideSTATE.SEVEN:
    
        break;
    case collideSTATE.EIGHT:
      break;
    default:
      break;
  }
}

function Bryan() {
  this.speed = 1;
  this.angle = 0;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 10;
  this.height = 200;
  this.pos = createVector(random(200, width-200-this.width), random(300, height-300-this.height));

  this.update = function() {
    this.angle = (this.angle + 0.05) % TWO_PI;
    this.vel.y = sin(this.angle) * this.speed;
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), 1));
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    if (other.speed > 1) {
      other.speed -= 0.5;
    }

    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;

    if (this.height > 0) {
      this.pos.y += 20;
      this.height -= 40;      
    } else {
      this.height = 0;
    }

    if (!hitColliderSFX.isPlaying()) {
      hitColliderSFX.play();
    }
  }
}

function Yizhou() {
  var balls;

  this.pos = createVector(width/2, height/2);
  this.speed = 7;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size = 15;
  
  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(255,30);
    rectMode(CENTER);
    rect(width/2,height/2,100,200);
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    for (var i = 0; i < 600,this.pos.x=400 && this.pos.y>150&&this.pos.y<35; i++) {
      balls[i].update();
      balls[i].display();
    }
  }

  this.collided = function(other) {
    balls = new Ball();
  }
}


function Ellie() {
  this.pos =  createVector(100, 100);
  this.speed = 1;
  this.angle = 0;
  this.vel =  createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 100;
  this.height = 80;
  this.c = color(200, 90, 10);

  this.update = function() {
    this.pos.add(this.vel);

  }

  this.display = function() {
    // draw something here
    fill(this.c);
    rect(this.pos.x, this.pos.y, this.width, this.height);

  }

  this.collided = function(other) {
    // do something cool here! do something to yourself,
    // and also something to the other thing?
    other.size = 3;
    other.vel.x *= 1;
    this.c = color(200, 5, 100);
  }
}

function Yanwen() {
  this.pos = createVector(100, 50);
  this.speed = 3;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size1 = 8;
  this.size2 = 20;
  this.side = 3;
  var point = this.side;
  var scaleStar = 1;

  this.star = function(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  this.update = function() {
    if (this.pos.x < 10) {
      this.pos = createVector(width/2, height/2);
      point = 3;
      scaleStar = 1;
    } else if (this.pos.x > width - 10) {
      this.pos = createVector(width/2, height/2);
      point = 3;
      scaleStar = 1;
    }

    if (this.pos.y < margin + 20 || 
        this.pos.y > height - margin - 20) {
      this.vel.y *= -1;
      point ++;
      scaleStar += 0.2;

      if (scaleStar > 4){
        scaleStar = 1;
      }
    }
    this.pos.add(this.vel);

    if (point >= 18) {
      point = 3;
    }
  }

  this.display = function() {
    // draw something here
    noStroke();
    fill(255, 215 - random(100), 0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 100.0);
    scale(scaleStar);
    this.star(0, 0, this.size1, this.size2, point); 
    pop();
  }

  this.collided = function(p) {
    // do something cool here! do something to yourself,
    // and also something to the other thing?
    if (this.pos.x + 20 > p.pos.x && this.pos.x + 20 < p.pos.x + p.width ||
      this.pos.x - 20 > p.pos.x && this.pos.x - 20 < p.pos.x + p.width){
      if (this.pos.y > p.pos.y && this.pos.y < p.pos.y + p.height) {
        this.vel.x *= -1;
          point ++;
          scaleStar += 0.2;
      }
    }
  }
}

function MaddyRed() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    r = 255;
    g=0;
    b=0;
    // if (this.height < 500) {
    //   this.width += 10;
    //   this.height += 10;      
    // } 
    
  }
}

function MaddyGreen() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(0,255,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 255;
    r =0;
    b=0;
    
  }
}

function MaddyBlue() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

  //   if(this.pos.y < margin || 
  //       this.pos.y > height - margin - this.height){
  //   this.angle=100;
  // print("hit");

  //   }
  }

  this.display = function() {
    fill(0,0,255);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 0;
    r =0;
    b=255;
    
  }
}

function AlyssaForrest() {
  this.pos = createVector(width/2, height/2);
  this.speed = 0;
  this.angle = 0;
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.height = 0;
  this.width = 0;

  this.update = function() {
    this.pos.add(this.vel);
    if (this.height < height-40){
    this.height = this.height + 0.5;
    this.width = this.width + 0.5;
    } else {
    this.height = this.height;
    this.width = this.width;
    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    other.vel.x *= -1;
    this.width = this.width - 5;
    this.height = this.height - 5;
  }
}


function Sarah() {
  this.speed = 2;
  this.angle = PI;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;
  this.pos = createVector(random(margin, width - margin), random(margin, height - margin));
  this.counter = 0;
  this.amplitude = 10;
  this. r = 0;

  this.update = function() {
    this.angle = this.angle + 1;
    this.pos.add(this.vel);
    this.counter ++;
          //check borders
          if(this.pos.x > (width - (margin + this.width))) {
            this.vel.x = -2;
          }
          if(this.pos.x < margin) {
            this.vel.x = 2;
          }

          if(this.pos.y > (height - (margin + this.height))) {
            this.vel.y = -2;
          }
          if(this.pos.y < margin) {
            this.vel.y = 2;
          }

          if (this.counter % 40 == 0) {
      //set x vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.x = 2;
      } else {
        this.vel.x = -2;
      }
      //set y vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.y = 2;
      } else {
        this.vel.y = -2;
      }
    }
  }

  this.display = function() {

    fill(map(this.pos.y, 0, height, 0, 255), 150, map(this.pos.x, 0, width, 0, 255), 200);
   rect(this.pos.x, this.pos.y, this.width, this.height);



 }

 this.collided = function(other) {
  if (other.speed > 1) {
    other.speed -= 0.5;
  }
  other.angle = random(TWO_PI);
  other.vel.x = cos(other.angle) * other.speed;
  other.vel.y = sin(other.angle) * other.speed;
     //teleport
     other.pos.y = random(height);
     if(other.pos.x > width/2) {
      other.pos.x = random(width/2);
    } else{
     other.pos.x = random(width/2, width);
   }

   

   if (!hitColliderSFX.isPlaying()) {
    hitColliderSFX.play();
  }
}
}



function Jackie() {
  this.pos = createVector(0, 0);
  this.width = 25;
  this.height = 25;
  this.time = 0;

  this.update = function() {
    this.time += .03;
    this.pos.x = (200*sin(this.time)) + (width/2)
    this.pos.y = (200*cos(this.time)) + (height/2)
  }

  this.display = function(){
    rect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
  }
  
  this.collided = function(other){
    if (other.speed > 1) {
      other.speed += random(-2, 0);
    }
    colliders.push(new Jackie());

    other.vel.x = -other.vel.x;
    other.pos.x += other.vel.x;
    other.vel.y = -other.vel.y;
    other.pos.y += other.vel.y;
  }
}


function Cat() {
  this.pos = new createVector(0, 0);
  this.speed = 0;
  this.angle = 70;
  this.vel = new createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 0;
  this.height = 0;
  this.c = color(255, 0, 0);


  this.update = function() {
    this.pos.add(this.angle);
  }

  this.display = function() {
    rect(pos, pos, this.width, this.height);
    fill(this.c);
  }

  this.collided = function(other) {
    this.width+10;
    this.height+20;
    fill(random(0, 255), random(0, 255), random(0, 255));
  }
}
