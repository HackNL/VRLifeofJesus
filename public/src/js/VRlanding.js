VR.landing = (function () {
  function init(id) {

    _button();
    background();
    VR.get.loading(false);
  }

  function background() {
    var lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = 1 / 30;

    function moveBackground() {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;

      let translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

      var background = VR.get.one('.bg');

      // background.style['-webit-transform'] = translate;
      // background.style['-moz-transform'] = translate;
      background.style.webkitTransform = translate;
      background.style.MozTransform = translate;
      background.style.msTransform = translate;
      background.style.OTransform = translate;
      background.style.transform = translate;

      window.requestAnimationFrame(moveBackground);
    }

    window.addEventListener('mouseover', function (e) {

      var lMouseX = Math.max(-100, Math.min(100, screen.width / 2 - e.clientX));
      var lMouseY = Math.max(-100, Math.min(100, screen.height / 2 - e.clientY));
      lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
      lFollowY = (10 * lMouseY) / 100;

    });
    moveBackground();
  }

  function _button() {
    var landingbutton = VR.get.one('#landingbutton');
    landingbutton.addEventListener('click', function () {
      VR.router.show('#timeline')
    });
  }
  return {
    init: init
  };
})();
