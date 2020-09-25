const levelStyle = new PIXI.TextStyle({
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
const level = new PIXI.Text('LEVEL 1', levelStyle)
level1.addChild(level)