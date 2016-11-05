VR.router = (function () {
  function show(id) {
    var pages = VR.get.all('.page');
    var selectedPage = VR.get.one(id);

    //disable all the pages
    pages.forEach(function (page) {
      page.classList.add('disabled');
    });

    selectedPage.classList.remove('disabled');

    if (id === '#cardboard') {
      VR.cardboard.init();
    } else if (id === '#video') {

      // VR.render.init();
    } else if (id === '#timeline') {
      VR.timeline.init();
    }
  }
  return {
    show: show
  };
})();
