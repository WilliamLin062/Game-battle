const Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  view = document.querySelector('#view')

let TextureCache = PIXI.utils.TextureCache
let state
let key = []
let fire = false
var player
let healthnum
const bullet = new PIXI.Graphics()
//keyboard event
window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)
window.addEventListener('mousedown', fireStart)
window.addEventListener('mouseup', fireStop)

function keyDown(e) {
  key[e.keyCode] = true
}

function keyUp(e) {
  key[e.keyCode] = false
}

function fireStart() {
  fire = true
}

function fireStop() {
  fire = false
}
//scene Container setting
const startScene = new PIXI.Container()
const level1 = new PIXI.Container()
const ocean = new PIXI.Container()
const backgroundContainer = new PIXI.Container()
// resize
window.addEventListener('resize', () => {
  let _w = window.innerWidth,
    _h = window.innerHeight
  richText.x = window.innerWidth / 2
  richText.y = window.innerHeight / 2
  startText.x = window.innerWidth / 2
  startText.y = window.innerHeight / 2 + 100
  app.renderer.resize(_w, _h)
})

function loadProgressHandler(loader, res) {
  console.log('loading' + ' ' + res.url + ' ' + loader.progress + '%')
}
//load
loader
  .add('backgroundImage', './img/bg.png')
  .add('pisto', './img/pisto.png')
  .add('player', './img/player.png')
  .add('./img/ocean-bubble.png')
  .on('progress', loadProgressHandler)
  .load(setup)

//setup
function setup() {
  let background = new Sprite(resources.backgroundImage.texture)
  for (let i = 0; i < bubbleAmount; i++) {
    const bubble = {
      sprite: new Sprite(resources['./img/ocean-bubble.png'].texture),
      z: 0,
    }
    bubble.sprite.y = 1920
    bubble.sprite.anchor.x = 0.5
    bubble.sprite.anchor.y = 0.7
    randomSizeBubble(bubble, true)
    startScene.addChild(bubble.sprite)
    bubbles.push(bubble)
  }
  player = {
    sprite: new Sprite(resources.player.texture),
    x: null,
    y: null,
    speed: 5,
    weapon: 'pisto',
    health: 100,
  }
  backgroundContainer.addChild(background)
  backgroundContainer.visible = false
  backgroundContainer.alpha = 0
  backgroundContainer.zIndex = 0

  app.stage.addChild(backgroundContainer)
  app.stage.addChild(graphics)
  app.stage.addChild(startScene)
  app.stage.addChild(level1)
  level1.visible = false
  app.ticker.add(() => sceneLoop())
}

function start() {
  let tl = gsap.timeline({})
  tl.to(startScene, {
    x: 1000,
  }).to(startScene, {
    visible: false,
  })
  initLevel(level1)
}

function initLevel(level) {
  player = {
    sprite: new Sprite(resources.player.texture),
    x: null,
    y: null,
    speed: 5,
    weapon: new Sprite(resources.pisto.texture),
    health: 100,
  }
  gsap.to(level, {
    visible: true,
  })
  gsap.to(backgroundContainer, {
    visible: true,
  })
  gsap.to(backgroundContainer, 2, {
    alpha: 1,
  })
  healthnum = new PIXI.Text(player.health, levelStyle)
  player.sprite.x = window.innerWidth / 2
  player.sprite.y = window.innerHeight / 2
  healthnum.y = 50
  console.log(healthnum)
  player.sprite.scale.set(0.5)
  player.weapon.x = player.sprite.x
  player.weapon.y = player.sprite.y
  healthnum.text = `${player.health}`
  level.addChild(player.sprite)
  level.addChild(healthnum)
}

function play(delta) {
  let mx = app.renderer.plugins.interaction.mouse.global.x
  let my = app.renderer.plugins.interaction.mouse.global.y
  let px = player.sprite.position.x
  let py = player.sprite.position.y
  let x = mx - px
  let y = my - py

  let angle = Math.atan2(y, x) - (90 * Math.PI) / 180
  player.sprite.anchor.set(0.5)
  player.sprite.rotation = angle
  player.sprite.anchor.set(0.5)

  if (key['68']) {
    console.log(key['68'])
    player.sprite.x += 5
  }
  if (key['65']) {
    console.log(key['65'])

    player.sprite.x -= 5
  }
  if (key['83']) {
    console.log(key['83'])

    player.sprite.y += 5
  }
  if (key['87']) {
    console.log(key['87'])
    player.sprite.y -= 5
  }
  if (fire) {
    shoot(angle)
  }
  swichWeapon(angle)
}

function shoot(angle) {
  bullet.lineStyle(0) // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  bullet.beginFill(0xde3249, 1)
  bullet.drawCircle(10, 25, 10)
  bullet.endFill()
}

function sceneLoop(delta) {
  let x = app.renderer.plugins.interaction.mouse.global.x
  let y = app.renderer.plugins.interaction.mouse.global.y
  graphics.x = x
  graphics.y = y
  for (let i = 0; i < bubbleAmount; i++) {
    const bubble = bubbles[i]
    if (bubble.sprite.y < cameraZ) randomSizeBubble(bubble)
    const z = bubble.z - cameraZ
    bubble.sprite.y = bubble.sprite.y - 1 * (Math.random() + 0.5)
  }
  play(delta)
}
