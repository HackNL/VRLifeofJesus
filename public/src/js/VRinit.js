VR.start = (function () {
  //run all the funcitons for starting the app
  var init = function () {
    console.log('sdf');
    VR.router.show('#timeline');
  };
  return {
    init: init
  };
})();

VR.start.init();
