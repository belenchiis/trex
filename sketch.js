var trex, trex_running, trex_collided;
var ground, groundImg;
var cloud, cloudImg;
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var cactus;
var score=0;
var cactusGroup, cloudsGroup;
var PLAY=1;
var END=0;
var gameState= PLAY;
var start, end, restart, gameOver;
var jump, die, checkPoint;

function preload (){
 trex_running=loadAnimation("./assets/trex1.png", "./assets/trex3.png", "./assets/trex4.png");
 trex_collided=loadImage("./assets/trex_collided.png");
 groundImg=loadImage("./assets/suelo.png");
 cloudImg=loadImage("./assets/cloud.png");
 cactus1=loadImage("./assets/obstacle1.png");
 cactus2=loadImage("./assets/obstacle2.png");
 cactus3=loadImage("./assets/obstacle3.png");
 cactus4=loadImage("./assets/obstacle4.png");
 cactus5=loadImage("./assets/obstacle5.png");
 cactus6=loadImage("./assets/obstacle6.png");
 restartImg=loadImage("./assets/restart.png");
 gameOverImg=loadImage("./assets/gameOver.png");
 jump=loadSound("./assets/jump.mp3");
 die=loadSound("./assets/die.mp3");
 checkPoint=loadSound("./assets/checkPoint.mp3");

}
function setup (){
    createCanvas(600,200);
    trex=createSprite(50,180,20,50);
    trex.addAnimation("running",trex_running);
    trex.addAnimation("collided",trex_collided);
    trex.scale=0.5;
    trex.debug=false;
    trex.setCollider("circle",0,0,40);
     edges=createEdgeSprites();
     ground=createSprite(200,180,800,20);
     ground.addImage(groundImg);
     cactusGroup= new Group();
     cloudsGroup= new Group ();
    restart=createSprite(300,140,20,50);
    restart.addImage(restartImg);
    gameOver=createSprite(300,90,20,50);
    gameOver.addImage(gameOverImg);
    restart.scale=0.5;
    gameOver.scale=0.5;
    
}

function draw  () {
    background("pink");
    text("puntuacion: "+score,500,50);
    if (gameState===PLAY){
        score=score+Math.round(frameCount/60);
        ground.velocityX=-(2+2*score/300);
        restart.visible=false;
        gameOver.visible=false;
        if (score>0 && score%500===0){
            checkPoint.play();
        }
        if(ground.x<0){
            ground.x=ground.width/2;
        }
        if(keyDown("space") && trex.y>=80){
            trex.velocityY=-10;
            jump.play();
        }
        trex.velocityY=trex.velocityY+0.5;
        spawnClouds();
        crearCactus();
        if (cactusGroup.isTouching(trex)){
            gameState=END;
            die.play();
        }
    }
    else if (gameState===END){
        ground.velocityX=0;
        trex.changeAnimation("collided");
        cactusGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        cactusGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        restart.visible=true;
        gameOver.visible=true;
        }
    trex.collide(ground);
    if (mousePressedOver(restart)){
        reset();
    }
    drawSprites();
}

function spawnClouds(){
    if (frameCount%60===0){
        cloud=createSprite(600,60,40,10);
        cloud.velocityX=-3 
        cloud.addImage(cloudImg);
        cloud.depth=trex.depth;
        trex.depth=trex.depth+1;
        cloud.lifetime=250;
        cloud.y=Math.round(random(10,60));
        cloudsGroup.add(cloud);
    }

}

function crearCactus(){
    if(frameCount%60===0){
        cactus=createSprite(600,165,10,40);
        cactus.velocityX=-(6+score/300);
        var aleatorio=Math.round(random(1,6));
        switch(aleatorio){
            case 1: cactus.addImage(cactus1);
                    break;
            case 2: cactus.addImage(cactus2);
                    break;
            case 3: cactus.addImage(cactus3);
                    break;
            case 4: cactus.addImage(cactus4);
                    break;      
            case 5: cactus.addImage(cactus5);
                    break;
            case 6: cactus.addImage(cactus6);
                    break;
            default: break;
        }
        cactus.scale=0.5;
        cactus.lifetime=250;
        cactusGroup.add(cactus);
    }
}

function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score=0
    ground.velocityX=-(2+2*score/50);
}




//Checar funcion reset y sonidos de jump y checkpoint

