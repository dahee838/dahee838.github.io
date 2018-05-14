

var bullets;
var potatoes;
var sun;
var sunImage, bulletImage, particleImage;
var MARGIN = 10;

function setup() {
createCanvas(1200,800);


bulletImage = loadImage("sun/bullet.png");
sunImage = loadImage("sun/sun3.png");
particleImage = loadImage("potatoThings/particle.png");

sun = createSprite(width/2, height/2);
sun.maxSpeed = 6;
sun.friction = .98;
sun.setCollider("circle", 10,10, 20);

sun.addImage("normal", sunImage);
sun.addAnimation("thrust", "sun/sun1.png", "sun/sun2.png");

potatoes = new Group();
bullets = new Group();

for(var i = 0; i<8; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createPotato(3, px, py);
  }
}

function draw() {
  background(250);
  
  fill(0);
  textAlign(CENTER);
  text("Use the arrow keys to move, D to shoot!", width/2, 20);
  
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x< -MARGIN) s.position.x = width+MARGIN;
  if(s.position.x> width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y< -MARGIN) s.position.y = height+MARGIN;
  if(s.position.y> height+MARGIN) s.position.y = -MARGIN;
  }
  
  potatoes.overlap(bullets, potatoHit);
  
  sun.bounce(potatoes);
  
  if(keyDown(LEFT_ARROW))
    sun.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    sun.rotation += 4;
  if(keyDown("w"))
    {
    sun.addSpeed(200, sun.rotation);
    sun.changeAnimation("thrust");
    }
  else
    sun.changeAnimation("normal");
    
  if(keyWentDown("d"))
    {
    var bullet = createSprite(sun.position.x, sun.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+sun.getSpeed(), sun.rotation);
    bullet.life = 30;
    bullets.add(bullet);
    }
  
  drawSprites();
  
}

function createPotato(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("potatoThings/potato.png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  a.type = type;
  
  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;
  
  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  potatoes.add(a);
  return a;
}

function potatoHit(potato, bullet) {
var newType = potato.type-1;

if(newType>0) {
  createPotato(newType, potato.position.x, potato.position.y);
  createPotato(newType, potato.position.x, potato.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage,bullet.position.x, bullet.position.y);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 30;
  }

bullet.remove();
potato.remove();
}


