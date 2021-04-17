var trex, trexruns, grnd_img, ig, cl, r, score, o1, o2, o3, o4, o5, o6, rg, og, cg, gamestate, ibg, gs, rs, GSI, RSI, die, jump, checkpoint

function preload() {
  grnd_img = loadImage("ground2.png")
  trexruns = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  cl = loadImage("cloud.png")
  r = loadAnimation("Aviraptor_1-1.png", "Aviraptor_2.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  GSI = loadImage("gameOver.png")
  RSI = loadImage("restart.png")
  trexstops = loadAnimation("trex_collided.png")
  rstops = loadAnimation("Aviraptor_1-1.png")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  checkpoint = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30, 160)
  trex.addAnimation("running", trexruns)
  trex.addAnimation("stop", trexstops)
  gs = createSprite(300, 50)
  gs.addImage(GSI)
  rs = createSprite(300, 100)
  rs.scale = 0.8
  rs.visible = false
  gs.visible = false
  rs.addImage(RSI)

  trex.scale = 0.5
  ground1 = createSprite(300, 190, 600, 20)
  ground1.addImage(grnd_img)
  ground2 = createSprite(900, 190, 600, 20)
  ground2.addImage(grnd_img)
  rg = new Group()
  cg = new Group()
  og = new Group()

  score = 0
  gamestate = 0
  ibg = createSprite(300, 100, 600, 200)
  ibg.visible = false

  ig = createSprite(300, 200, 600, 10)
  ig.visible = false
}

function draw() {

  background(240);
  gs.depth = trex.depth
  rs.depth = trex.depth

  if (gamestate == 0) {
    spawnClouds()
    if (score >= 50)
      spawnRaptors()
    spawnObstacles()

    if (score % 100 == 0 && score > 0) {
      checkpoint.play()
    }

    if (frameCount % 1 == 0) {
      score += 1
    }
    ground1.velocityX = -3
    ground2.velocityX = -3
    if (keyDown("space") && trex.y > 160) {
      
      trex.velocityY = -12
      jump.play()

    }
    trex.velocityY = trex.velocityY + 0.5
    if (trex.isTouching(og) || trex.overlap(rg, callBack)) {
      die.play()
      gamestate = 1

    }

  } else
  if (gamestate == 1) {
    og.setVelocityXEach(0)
    og.setLifetimeEach(-1)
    rg.setVelocityXEach(0)
    rg.setLifetimeEach(-1)
    cg.setVelocityXEach(0)
    cg.setLifetimeEach(-1)
    gs.visible = true
    rs.visible = true
    ground1.velocityX = 0
    ground2.velocityX = 0
    trex.changeAnimation("stop")
    ibg.overlap(rg, callBack)
    if (mousePressedOver(rs)) {
      score = 0
      gs.visible = false
      rs.visible = false
      og.destroyEach()
      cg.destroyEach()
      rg.destroyEach()
      gamestate = 0
      trex.changeAnimation("running")
    }

  }




  trex.collide(ig)


  if (ground1.x <= -300) {
    ground1.x = 900
  }
  if (ground2.x <= -300) {
    ground2.x = 900
  }


  
  textSize(20)
  text("Score:" + score, 510, 30)

  drawSprites()

}

function spawnClouds() {
  if (frameCount % 60 == 0) {

    cloud = createSprite(600, random(10, 100), 10, 10)
    cloud.velocityX = -2


    cloud.addImage(cl)

    cloud.depth = trex.depth
    trex.depth = trex.depth + 1

    cloud.lifetime = 650 / 2
    cg.add(cloud)
  }



}

function spawnRaptors() {
  if (frameCount % 240 == 0) {
    var raptor = createSprite(600, random(20, 150))
    raptor.addAnimation("fly", r)
    raptor.addAnimation("stop", rstops)
    raptor.velocityX = -2
    raptor.scale = 0.5
    raptor.lifetime = 650 / 2
    rg.add(raptor)
  }

}


function spawnObstacles() {
  if (frameCount % 100 == 0) {
    var Obstacle = createSprite(600, 170)
    Obstacle.velocityX = -3
    Obstacle.lifetime = 650 / 2
    var R = Math.round(random(1, 6))
    switch (R) {
      case 1:
        Obstacle.addImage(o1);
        break;
      case 2:
        Obstacle.addImage(o2);
        Obstacle.scale = 0.8
        break;
      case 3:
        Obstacle.addImage(o3);
        Obstacle.scale = 0.5
        break;
      case 4:
        Obstacle.addImage(o4);
        Obstacle.scale = 0.6
        break;
      case 5:
        Obstacle.addImage(o5);
        Obstacle.scale = 0.5
        break;
      case 6:
        Obstacle.addImage(o6);
        Obstacle.scale = 0.4
        break;



    }


    og.add(Obstacle)

  }

}

function callBack(s1, s2) {
  s2.changeAnimation("stop")
}