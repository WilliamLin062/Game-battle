WebFont.load({
  google: {
    families: ['Snippet', 'Arvo:700italic', 'Podkova:700'],
  }
});

const style = new PIXI.TextStyle({
  fontFamily: 'sans-serif',
  fontSize: 48,
  fontStyle: 'italic',
  fontWeight: 'normal',
  fill: ['#ffffff', '#c5c5c5'], // gradient
  stroke: '#000000',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
});
const startStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 100,
  fill: ['#ffffff', '#c5c5c5'], // gradient
  stroke: '#000000',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
});
const richText = new PIXI.Text('Battle khukhu 3', style);
const startText = new PIXI.Text('S t a r t', startStyle);
richText.x = window.innerWidth / 2;
richText.y = window.innerHeight / 2;
richText.anchor.set(0.5);
startText.x = window.innerWidth / 2;
startText.y = window.innerHeight / 2 + 100;
startText.anchor.set(0.5);
startText.interactive = true;
startText.buttonMode = true;

function moveon() {

  tl1.pause()
}

function moveout() {
  console.log("out");
  tl1.play()
}

function start() {
  let tl = gsap.timeline({})
  tl.to(startScene, {
    x: 1000
  }).to(startScene, {
    visible: false
  }).from(level1, {
    visible: true,

  })
}
startText.on('mouseover', moveon)
startText.on('mouseout', moveout)
startText.on('mousedown', start)
console.log(startText);

startScene.addChild(richText)
startScene.addChild(startText)

let tl1 = gsap.timeline({})
tl1.to(startText, 1.5, {
  alpha: 0.0,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
})