//To easily select something from the DOM
VR.get = (function () {
  function one(selector) { //This is a method
    return document.querySelector(selector);
  }

  function all(selector) {
    return document.querySelectorAll(selector);
  }

  function data(url) {
    // return a Promise object
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      //open an get request
      request.open('GET', url);
      request.onloadstart = function () {
        VR.render.loading(true);
      };
      request.onloadend = function () {
        VR.render.loading(true);
      };

      //if the request is done
      request.onload = function () {
        //ony if request is done
        if (request.status == 200) {
          VR.render.loading(false);

          // send text form request
          resolve(request.responseText);
        } else {
          // reject the promise if there is a err
          reject(new Error('request failed!'));
          VR.ux.showErr('There went something wrong');
        }
      };
      //send the request
      request.send();
    });
  }

  return { //return only the funtions that are nesseeriy
    one: one,
    all: all,
    data: data
  };
})();