// bubbles
const bubbles = []
const bubble = {}
const bubbleAmount = 30
const graphics = new PIXI.Graphics()
const speed = 0.5
const cameraZ = 0
//Application
let app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true, //抗拒尺
  transparent: false, //透明?
  resolution: 1, //渲染氣解析度/顯示像素比
  view: view,
})

function randomSizeBubble(bubble, initial) {
  bubble.z = initial ?
    Math.random() * 2000 :
    cameraZ + Math.random() * 1000 + 1
  const deg = Math.random() * Math.PI * 2
  const distance = Math.random() * 50 + 350
  bubble.sprite.x = Math.cos(deg) * distance + window.innerWidth / 2
  bubble.sprite.y = Math.sin(deg) * distance + window.innerHeight
  bubble.sprite.alpha = Math.random()
  bubble.sprite.width = Math.random()
}
graphics.beginFill(0xc3c3c3)
graphics.drawRect(15, 15, 15, 15)
graphics.endFill()
graphics.abgle = 0