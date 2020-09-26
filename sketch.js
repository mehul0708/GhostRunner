//global variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var iGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage('ghost-standing.png')
  spookySound = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  spookySound.loop()
  
  doorGroup=new Group()
  climberGroup=new Group()
  iGroup=new Group()
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg)
  tower.velocityY=1
  
  ghost = createSprite(200,200,50,50);
 ghost.addImage(ghostImg)
  ghost.scale=0.3
}


function draw(){
background(0)
  if (gameState==="play"){
  if (tower.y>400){
    tower.y=200
  }
  if (keyDown("left")){
    ghost.x=ghost.x-3
  }
  if (keyDown("right")){
    ghost.x=ghost.x+3
  }
  if (keyDown("space")){
    ghost.velocityY=-3
  }
  ghost.velocityY=ghost.velocityY+0.08
  spawnDoors()
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if (iGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end"
  }
  }
 if (gameState==="end"){
   stroke("green")
   fill("green")
   textSize(30)
   text("GameOver",230,250)
 }
  drawSprites()
}
  
  function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    
    //door
    var door =createSprite(200,-50)
    door.addImage(doorImg)
        
    door.x=Math.round(random(120,400))
    door.velocityY=1
    door.lifetime=800
    door.scale=1
      
    //climber
    var climber = createSprite(200,10)
    climber.addImage(climberImg)
    climber.x = door.x;
    climber.velocityY =1
    climber.lifetime =800
    climber.scale=1
    
    //adjusting depth
    ghost.depth=door.depth
   ghost.depth+=1

    
    //invisible block
    ib=createSprite(200,15)
    ib.width=climber.width
    ib.height=2
    ib.x=door.x
    ib.velocityY=1
    ib.lifetime=800
  doorGroup.add(door)  
    climberGroup.add(climber)
    iGroup.add(ib)
    //add the group
    
    
   
  }
}
 



