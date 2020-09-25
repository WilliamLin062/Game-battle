const Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  view = document.querySelector('#view')

let TextureCache = PIXI.utils.TextureCache


//scene Container setting
const startScene = new PIXI.Container();
const level1 = new PIXI.Container();
const ocean = new PIXI.Container()
// resize
window.addEventListener('resize', () => {
  let _w = window.innerWidth,
    _h = window.innerHeight
  richText.x = window.innerWidth / 2;
  richText.y = window.innerHeight / 2;
  startText.x = window.innerWidth / 2;
  startText.y = window.innerHeight / 2 + 100;
  app.renderer.resize(_w, _h)
})

//load
loader.add('./img/ocean-1.png').add('./img/ocean-bubble.png').load(setup)

//setup

//

//

//




function sceneLoop() {
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
}
//
function setup() {
  let bg = new Sprite(resources['./img/ocean-1.png'].texture)
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

  app.stage.addChild(graphics)
  app.stage.addChild(startScene)
  app.stage.addChild(level1)

  app.ticker.add(() => sceneLoop())
}
level1.visible = false