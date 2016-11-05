VR.start = (function() {
    //run all the funcitons for starting the app
    var init = function() {
      VR.render.init();
    };
    
    return {
        init: init
    };
})();

VR.start.init();
