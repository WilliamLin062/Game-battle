const tl = gsap.timeline({

})

tl.to('.c-diamond-shape', {
    duration: 1.1,
    borderTop: '0.01rem solid hsla(0,0%,100% ,.4)'
  }).to('.c-diamond-shape', {
    duration: 1.1,
    borderLeft: '0.01rem solid hsla(0,0%,100% ,.4)'
  }).to('.c-diamond-shape', {
    duration: 1.1,
    borderBottom: '0.01rem solid hsla(0,0%,100% ,.4)'
  })
  .to('.c-diamond-shape', {
    duration: 1.1,
    borderRight: '0.01rem solid hsla(0,0%,100% ,.4)'
  })