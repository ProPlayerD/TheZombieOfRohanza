var pathImg, knightImg, zombieImg
var collided = 0
var playerHealth = 10;
var zombieHealth = 6;

function preload(){
 pathImg = loadImage("Images/path.jpg");
 knightImg = loadAnimation("Images/tile012.png","Images/tile013.png","Images/tile014.png");
 knightImg2 = loadAnimation("Images/tile013.png");
 knightImg3 = loadAnimation("Images/tile014.png");
 zombieImg = loadImage("Images/zombie.png");
 knifeImg = loadImage("Images/knife.png");
 heartImg = loadImage("Images/health.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-200);
  path = createSprite(width/2,height/2);
  path.addImage(pathImg);
  path.scale = 2.5;

  knight = createSprite(width-100,height-100);
  knight.addAnimation("standing",knightImg2);
  knight.addAnimation("walking",knightImg);
  knight.addAnimation("jumping",knightImg3);

  ground = createSprite(width-750,height-60,1500,10);
  ground.visible = false;

  zombie = createSprite(random(100,width-100),0)
  zombie.addImage(zombieImg);
  zombie.velocityY = 10;
  zombie.scale = 0.25;
  
  knife = createSprite(800,height-80);
  knife.addImage(knifeImg);
  knife.scale = 0.07;
  knife.mirrorX(-1);

  for(var i = 1;i<=playerHealth;i++){
    var heart = createSprite(80*i/4,50);
    heart.addImage(heartImg); 
    heart.scale = 0.03;
  }
}

function draw() {
  background(255,255,255);  
  drawSprites();
  knight.velocityX = 0
  knight.changeAnimation("standing",knightImg2);

  if(keyDown("a")){
    knight.velocityX = -3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(1);
  }

  if(keyDown("d")){
    knight.velocityX = 3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(-1);

  }

  if(keyDown("w")&&knight.y>height-130){
    knight.velocityY = -5;
    knight.changeAnimation("jumping",knightImg3);
  }
  
  if(knight.isTouching(knife)){
   knife.scale = 0.1;
   knife.y = knight.y;
   if(keyDown("a")){
    knife.x = knight.x-17;
    knife.mirrorX(-1)
   }
   if(keyDown("d")){
    knife.x = knight.x+15;
    knife.mirrorX(1)
   }
  }

  fill("red")
  textSize(18);
  text("Player Health",50,30);
  zombie.depth = knife.depth+1;

  knight.velocityY+=0.2;

  knight.collide(ground);
  
  if(zombie.collide(ground)){
    collided = 1
  }
  
  if(collided ===1 && knight.x>zombie.x){
    zombie.velocityX = 2
} else {
  zombie.velocityX =- 2
}

  
}

