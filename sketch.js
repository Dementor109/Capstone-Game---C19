var PLAY = 0
var MIDDLE = 2
var END = 1
var gameState = PLAY

var Score = 0

var bg, bgImg;
var fp, fpImg;
var asteroid, asteroidImg, asteroidGroup;
var  s1, s2, s3;
var Sgroup;
var moon, moonImg;
var starImg;


function preload(){
  
  bgImg = loadImage("1.jpg");
  fpImg = loadImage("fighter plane.png");
  asteroidImg = loadImage("Asteroid.png");
  s1 = loadImage("s2.png");
  s3 = loadImage("satellite-imagery-png-favpng-P5HFnyu85PagYgm09ivBQrW41.jpg");
  s2 = loadImage("galileo-satellite-model.jpg");
  moonImg = loadImage("moon1.png")
  starImg = loadImage("star1.png")
}

function setup() {
 createCanvas(500,500);
  
  bg = createSprite(250, 250)
  bg.addImage("background",bgImg)
  bg.scale = 1.10
  bg.velocityX = -3
  
  fp = createSprite(50,250)
  fp.addImage("fighterplane", fpImg)
  fp.scale = 0.2
  fp.velocityX = - 0.3
  fp.debug = false
  fp.setCollider("rectangle", 0, 0, fp.width/2, fp.height/2)
  
  moon = createSprite(900,250)
  moon.addImage("moon",moonImg)
  moon.scale = 0.5
  moon.velocityX = -0.5
  moon.depth = moon.depth+1
  moon.setCollider("rectangle",0,0, moon.width/3, moon.height/2)
  moon.debug = false
  
  AsteroidGroup = new Group();
  Sgroup = new Group();
  StarGroup = new Group();
  
}

function draw() {

  if(gameState === PLAY){
  
    background("bg");
    
    fill("yellow")
    textSize(20)
    text("Score:"+Score,50,50)
    
  if(fp.isTouching(moon)){
    
  gameState = MIDDLE
    
     Sgroup.destroyEach();
    moon.destroy();
    AsteroidGroup.destroyEach();   
    StarGroup.destroyEach();
  }
  
    if(fp.isTouching(StarGroup)){
      
      Score= Score +1
      StarGroup.destroyEach();
  
    }
 //var distance = (moon.x - fp.x)
  //text("Distance from moon:"+distance,25,25);
  //fill("white")
  //strokeWeight(20)
 
    
  if(gameState === PLAY && bg.x<0){
    
    bg.x = bg.width/2;
    
  }
  
  if(keyDown("RIGHT_ARROW")){    
    fp.x= fp.x +1.2;
  }
  
  if(keyDown("UP_ARROW")){
    fp.y = fp.y-1.2;
  }
  
   if(keyDown("DOWN_ARROW")){
    fp.y = fp.y+1.2;
  }
  
   if(keyDown("LEFT_ARROW")){
    fp.x = fp.x-0.9;
  }
  
  if(fp.isTouching(Sgroup)|| fp.isTouching(AsteroidGroup)){
    gameState = END
    Sgroup.destroyEach();
    AsteroidGroup.destroyEach();
    StarGroup.destroyEach();
  }
    
    if(fp.x<0 && gameState === PLAY|| fp.x>500 && gameState === PLAY || fp.y<0 && gameState === PLAY || gameState === PLAY && fp.y > 500){
      
      gameState = END
        Sgroup.destroyEach();
    StarGroup.destroyEach();
      AsteroidGroup.destroyEach();
       
       }
  }
  
  if(gameState === END){
    
    bg.visible = false
    fp.visible = false
    moon.visible = false
    
    moon.velocityX = 0
    
    background(0)
    
    fill("yellow")
    stroke("yellow")
    textSize(30)
    text("GameOver! Type r to restart!", 50, 250)
      
    if(keyDown("r")){
 gameState = PLAY
      fp.x = 50
      fp.y= 250
      
      
      moon.x = 900
      moon.y = 250
       moon.velocityX = -0.5
        
        moon.visible = true
    bg.visible = true
      fp.visible = true
    }
    
  
    
    
  }
  
  
  if(gameState === MIDDLE){
    
      bg.visible = false
    fp.visible = false
    fp.velocityX = 0
    
    background(0)
    
  textSize(40)
    fill("yellow")
   stroke("yellow")
    text("YOU WIN!",150, 250)
  }
  
  
  spawnStars();
  spawnAsteroids();
  spawnSatellites();
  drawSprites();
}


function spawnAsteroids(){
  if(gameState === PLAY && frameCount % 50 === 0){
    var Asteroid = createSprite(550,250)
    Asteroid.addImage("asteroid",asteroidImg)
    Asteroid.scale= 0.05
    
    Asteroid.y = Math.round(random(50,450))
    Asteroid.velocityX = -3 
    
    Asteroid.depth = fp.depth
    fp.depth = fp.depth+0.1
    
    AsteroidGroup.add(Asteroid)
    AsteroidGroup.lifetime = 300
  }

}

function spawnSatellites(){
  if(gameState===PLAY && frameCount%200 === 0){
    var satellite = createSprite(550,250)
    satellite.velocityX = -3
    satellite.y = Math.round(random(50,450));
    
    satellite.depth = fp.depth
    fp.depth = fp.depth +1
    
    var rand = Math.round(random(1,3));
    switch (rand){
    case 1: satellite.addImage("satellite",s1) 
    break;
    
    case 2: satellite.addImage("ISS",s3)
        break;
        
        case 3: satellite.addImage("satellite2", s2)
        break;
        
        default: break;
    
    }
    
    
    satellite.lifetime = 200
    satellite.scale = 0.1
    Sgroup.add(satellite);
    
  }  
}

function spawnStars(){
  if(frameCount % 150 === 0 && gameState === PLAY){
    
    var Star = createSprite(550,250)
    Star.addImage("star",starImg)
    Star.velocityX = -2
    Star.scale = 0.15
    Star.y = Math.round(random(25,475));
    
    Star.depth  = fp.depth
    fp.depth = fp.depth+1
    
    Star.lifetime = 300
  StarGroup.add(Star);
  }  
}