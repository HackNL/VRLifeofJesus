VR.render = (function () { //funtion to render a template.
  //render the template
  function init() {
    // r._getData();
    _getData()
  };
  function _getData() {
    VR.get.data('//127.0.0.1:8080/data/data.json').then(response => {
      console.log(response);
    })
  }
  // show or hid the loading spinner
  function loading(show) {
    if (show) {
      VR.get.one('.loading').classList.remove('disabled')
    } else {
      //show loading
      setTimeout(function () {
        VR.get.one('.loading').classList.add('disabled')
      }, 300); //add a delay because you won't see it with fast internet.
    }
  };
  return {
    init: init,
    loading: loading
  };
})();
