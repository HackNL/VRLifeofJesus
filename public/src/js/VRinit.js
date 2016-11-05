VR.start = (function () {
  //run all the funcitons for starting the app
  var init = function () {
    VR.router.show('#landing');
  };

  return {
    init: init
  };
})();

VR.start.init();
