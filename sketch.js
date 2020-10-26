var Serve=2
var Play=1;
var End=0;
var gameState=Serve;
var man, backGround,ground,obstacle,flag;
var manImage, backGroundImage,obstacleImage,flagImage;
var obstacleGroup,flagGroup;
var score=0;
var survivalTime=0;
function preload(){
 manImage =loadAnimation("walking1.png");
 backGroundImage=loadImage("park.jpg");
 obstacleImage=loadImage("hurdle.png");
  flagImage=loadImage("flag.png")
}
function setup() {
 createCanvas(windowWidth,windowHeight);
  
  backGround=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  backGround.addImage(backGroundImage);
  backGround.scale=window;
  backGround.velocityX=-4
  
 man=createSprite(windowWidth-650,windowHeight-150,10,10);
 man.addAnimation("walking",manImage);
 man.scale=0.05;
  man.debug=true;
  man.setCollider("rectangle",2,2);
  
  ground=createSprite(windowWidth/2,windowHeight,windowWidth,windowHeight-700)
  ground.visible=false;
  
  obstacleGroup=new Group();
  flagGroup=new Group();
}

function draw() {
  if( gameState==Serve){
    background("yellow");
    fill("green");
    textSize(24)
    text("Press Space to Serve",windowWidth/2-100,windowHeight/2-200);
    fill("green");
    textSize(24)
    text("&",windowWidth/2,windowHeight/2-100);
  fill("green");
    textSize(24)
    text("Press Space to Jump",windowWidth/2-100,windowHeight/2);
  }
  if(touches.length>0||keyDown("space")&&gameState==Serve){
    gameState=Play;
  }
  
  if(gameState==Play){
    background("white");
   flag();
    obstacles();
    if(touches.length>0||keyDown("space")&&man.y>height-250){
    man.velocityY= -10;
    touches=[];
  }
    if(flagGroup.isTouching(man)){
    flagGroup.destroyEach();
    score=score+1;
  }
  if(obstacleGroup.isTouching(man)){
   gameState=End;
   man.destroy();
   obstacleGroup.destroyEach();
  flagGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(man)){
    gameState=End;
  }
  if(backGround.x<windowWidth-500){ 
  backGround.x= backGround.width/2;
 }
  if(man.y<windowHeight/2){
    man.velocityY=man.velocityY+2;
  }
  man.collide(ground);
 drawSprites();
     fill("black");
    textSize(24);
    text("Score="+score,windowWidth-550,windowHeight-550);
    fill("black");
    textSize(24);
    text("SurvivalTime="+survivalTime,windowWidth-750,windowHeight-550);
    survivalTime= Math.ceil(frameCount/frameRate());
  }
  if(gameState==End){
    background("blue");
    fill("yellow");
    textSize(24);
    text("GameOver",windowWidth/2,windowHeight/2-200);
    man.destroy();
    obstacleGroup.destroyEach();
  }
}
function obstacles(){
  if(frameCount%60==0){
  var hurdle=createSprite(windowWidth-0,windowHeight-100,10,10);
  hurdle.addImage(obstacleImage);
    hurdle.scale=0.2;
    hurdle.velocityX=-6  ;
    obstacleGroup.add(hurdle);
  }
}
function flag(){
  if(frameCount%50==0){
    var flag=createSprite(windowWidth-0,0,10,10);
    flag.addImage(flagImage);
    flag.y=Math.round(random(windowHeight/2-100,windowHeight/2))
    flag.scale=0.2;
    flag.velocityX=-6;
    flagGroup.add(flag);
  }
}