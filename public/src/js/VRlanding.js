VR.landing = (function () {
  function init(id) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var colors = ['#F0F082',
      '#8CF08C',
      '#8CF0F0',
      '#8CA0FF',
      '#F05050',
    ];
    var body = document.querySelector('body');

    var number = getRandomInt(0, 4);
    body.style.backgroundColor = colors[number];
    VR.get.loading(false);
    _button();
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
