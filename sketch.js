var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage
var obstacle, obstacle1Image, obstacle2Image, obstacle3Image, obstacle4Image,  obstacle5Image,  obstacle6Image; 
var score=0;
var og, cg;
var play=1;
var end=0;
var gamestate=play;
var gameOver, gameOverImage;
var resartGame, restartGameImage;
var diesound, jumpsound, checkpointsound;
//checkpointsound plays a sound after every 100 points as a milestone type of thing 


function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collided = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage =  loadImage("cloud.png");
obstacle1Image = loadImage("obstacle1.png");
obstacle2Image = loadImage("obstacle2.png");
obstacle3Image = loadImage("obstacle3.png");
obstacle4Image = loadImage("obstacle4.png");
obstacle5Image = loadImage("obstacle5.png");
obstacle6Image = loadImage("obstacle6.png");
gameOverImage =  loadImage("gameOver.png");
restartGameImage = loadImage("restart.png");
diesound=loadSound("die.mp3");
jumpsound=loadSound("jump.mp3");
checkpointsound=loadSound("checkPoint.mp3");


  
}

function setup() {
  background(200)
  createCanvas(windowWidth,windowHeight);
  
  //create a trex sprite
  trex = createSprite(50,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collider",trex_collided);
  trex.scale = 0.6;
  
  //trex.debug=true; 
  trex.setCollider("circle",0,0,43);

  
  //create a ground sprite
  ground = createSprite(width/2,height-100,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-97,width,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  //console.log(rand)
  
  //creating clouds group
  cg= new Group();
  
  //creating obstacles group
  og= new Group();
  
  gameOver=createSprite(width/2,width/2-120,20,20);
  gameOver.addImage("gameisovertext",gameOverImage);
  gameOver.scale=0.6;
  
  resartGame=createSprite(width/2,width/2-80,20,20);
  resartGame.addImage("resarttext",restartGameImage);
  resartGame.scale=0.6;
  
  

}

function draw() {
//set background color
background(200);
  
if(gamestate===play) {
score=Math.round(getFrameRate() /30+score) ;

if(score%100===0&&score>0) {
checkpointsound.play();   
   }
 
ground.velocityX = -(3+score/100);
  
  
gameOver.visible=false;
resartGame.visible=false;
  
// jump when the space key is pressed
if(touches.length>0||keyDown("space")&& trex.y >= 100) {
trex.velocityY = -7;
jumpsound.play();
touches=[];
}
  
trex.velocityY = trex.velocityY + 0.8
  
if (ground.x < 0){
    ground.x = ground.width/2;
}
  
//Spawn Clouds
spawnClouds();
  
createobstacle();
  
if (trex.isTouching(og)) {
gamestate=end;
diesound.play();
} 
  
}
  
  
  
else if(gamestate===end) {
ground.velocityX=0; 
og.setVelocityXEach(0);
cg.setVelocityXEach(0);
og.setLifetimeEach(-1);
cg.setLifetimeEach(-1);
  
gameOver.visible=true;
resartGame.visible=true;
  
trex.changeAnimation("collider",trex_collided);

  
}
  
if(mousePressedOver(resartGame)) {
gamestate=play;
og.destroyEach();
cg.destroyEach();
score=0;
trex.changeAnimation("running", trex_running);

}
  
//console.log(trex.y)
  

  

text("Score="+score,500,60); 

  
  
 
  
  
//stop trex from falling down
trex.collide(invisibleGround);
  

drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
if(frameCount%100===0) {
cloud=createSprite(width,random(50,width/2),20,20); 
cloud.velocityX=-2;
cloud.addImage("cloudmoving",cloudImage)

cloud.lifetime=360;

cg.add(cloud);

trex.depth=cloud.depth+1  
}
 }

function createobstacle() {
if(frameCount%110===0) {
obstacle=createSprite(width,height-123,20,20);
obstacle.velocityX=-(3+score/100);
obstacle.lifetime=200;
var r= Math.round(random(1,6))

og.add(obstacle);

console.log(r);
switch (r) {
case 1:
obstacle.addImage("obstacle1", obstacle1Image);
break;
case 2:
obstacle.addImage("obstacle2", obstacle2Image);
break;
case 3:
obstacle.addImage("obstacle3", obstacle3Image);
break;
case 4:
obstacle.addImage("obstacle4", obstacle4Image);
break;
case 5:
obstacle.addImage("obstacle5", obstacle5Image);
break;
case 6:
obstacle.addImage("obstacle6", obstacle6Image);
break;
        }

obstacle.scale=0.7;
  
}

  
 }

