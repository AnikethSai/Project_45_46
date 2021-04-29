const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground, ball;
var bg,bgimg;
var player,playerwalking,playerjumping,playerImg;
var laser,flp1,flp2,flpi,flpi2,table,tableimg,door,dc,dop;
var canvas,pici,pic;
var ground,hole,holeimg,spikes,spikesimg;
var twall,lwall,rwall,wini;
var start = 1;
var end = 0;
var win = 2;
var gameState = start;
var esp,espi;


function preload(){
    bgimg = loadImage("bg_ext.png");
    pici = loadImage("pic.png");
    playerImg = loadAnimation("pw2.png","pw2.png");
    playerwalking = loadAnimation("pw2.png","pw1.png");
    playerjumping = loadAnimation("pw2.png","pwj.png","pw2.png","pw2.png");
    dc = loadAnimation("dc.png");
    dop = loadAnimation("do.png");
    tableimg = loadImage("table.png");
    flpi = loadImage("fp1.png");
    flpi2 = loadImage("fp2.png");
    holeimg = loadImage("sh.png");
    espi = loadImage("esp.png");
    spikesimg = loadImage("spikes.png");
    wini = loadImage("win.png");
}

function setup(){
    canvas = createCanvas(displayWidth,displayHeight/2+150);
   // background("white");
    engine = Engine.create();
    world = engine.world;

    bg = createSprite(displayWidth/2,displayHeight/2-420,10,10)
    bg.addImage(bgimg);
    bg.scale = 1.3;

    pic = createSprite(300,100,10,10);
    pic.addImage(pici);
    pic.scale = 0.3;
   /* pic.depth = player.depth;
    pic.depth+=5;*/

    player = createSprite(100,350,10,10)
    player.addAnimation("playerstanding",playerImg);
    player.addAnimation("playerwalking",playerwalking);
    player.addAnimation("playerJumping",playerjumping);
    player.scale = 0.45
    player.velocityX = 0;
    player.velocityY = 0;
    player.setCollider("rectangle",0,0,200,550)
    player.debug = true;
    

    ground = createSprite(displayWidth/2-180,displayHeight/2-40,7570,20);
    ground.visible = false;

    twall = createSprite(displayWidth/2-180,-120,7570,20);
    lwall = createSprite(10,displayHeight/2,10,displayHeight);
    rwall = createSprite(3000,displayHeight/2,10,displayHeight)

    table = createSprite(700,450,10,10);
    table.addImage(tableimg);
    table.scale = 0.55;
    table.velocityY = 1;
    table.setCollider("rectangle",0,0,500,250);
    table.debug = true;

    flp1 = createSprite(1400,400,10,10);
    flp1.addImage(flpi);
    flp1.scale  = 0.8;
    flp1.setCollider("rectangle",15,-15,625,55)
    flp1.debug = true;
    flp1.velocityY = -1;

    flp2 = createSprite(1800,500,10,10);
    flp2.addImage(flpi2);
    flp2.scale = 0.5;
    flp2.setCollider("rectangle",-20,-10,885,75);
    flp2.debug = true;
    flp2.velocityY = 0.5;

    hole = createSprite(1500,600,10,10);
    hole.addImage(holeimg);
    //hole.scale = 1
    hole.debug = true;
    hole.setCollider("rectangle",0,0,700,400);

    spikes = createSprite(2500,440,10,10);
    spikes.addImage(spikesimg);
    spikes.scale = 0.6;

    door = createSprite(3000,380,10,10);
    door.addAnimation("doorclosed",dc);
    door.addAnimation("dooropen",dop);
    door.setCollider("rectangle",0,0,300,350);
    door.debug = true;

}

function draw(){
    background("Aqua");  
    Engine.update(engine);

    if(keyDown("RIGHT_ARROW")||keyDown("D")){
        player.x+=5;
        //player.velocityX = 3;
        player.changeAnimation("playerwalking",playerwalking)
    }

    else{
        player.changeAnimation("playerstanding",playerImg)
    }

    if(keyDown("LEFT_ARROW")||keyDown("A")){
        player.x-=5;
        //player.velocityX = 3;
        player.changeAnimation("playerwalking",playerwalking)
    }

   /*else{
        player.changeAnimation("playerstanding",playerImg)
    }*/

    if(keyDown("SPACE")||keyDown("UP_ARROW")||keyDown("W")){
        player.velocityY = -5;        
        player.changeAnimation("playerJumping",playerjumping)
    }

    else{
        player.velocityY++;
        //player.changeAnimation("playerstanding",playerImg);
    }

    if(gameState === end){
        background(espi);
        destroyAll();
        }

    if(player.isTouching(hole)||player.isTouching(spikes)){
        gameState = end;
    }
    
    if(player.isTouching(door)&&keyDown("ENTER")){
        door.changeAnimation("dooropen",dop);
        gameState = win;
    }

    if(gameState === win){
        background(wini);
        destroyAll();        
    }


    

camera.x = player.x + 500;
camera.y = player.y-100;
/*camera.position.x =displayWidth;
camera.position.y = displayHeight/2;*/

    bg.display();
    pic.display();
    player.display()
    ground.display();
    table.display();
    flp1.display();
    flp2.display();
    hole.display();
    spikes.display();
    door.display();

    player.collide(ground);
    player.collide(table);
    player.collide(flp1);
    player.collide(flp2);
    player.collide(twall);
    player.collide(lwall);
    player.collide(rwall);
    table.collide(ground);

    //console.log(player.y)
    
    flp1.bounceOff(twall);
    flp1.bounceOff(ground);
    flp2.bounceOff(twall);
    flp2.bounceOff(ground);
}

function destroyAll(){
    /*player.visible = false;
    flp1.visible = false;
    flp2.visible = false;
    table.visible = false;
    pic.visible = false;*/
    player.destroy();
    flp2.destroy();
    flp1.destroy();
    table.destroy();
    pic.destroy();
    hole.destroy();
    spikes.destroy();
    door.destroy();
    bg.visible = false;
}