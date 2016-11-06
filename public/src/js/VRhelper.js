//To easily select something from the DOM
VR.get = (function () {
  function urls(url) {

    // let base = '/VRLifeofJesus/';
    let base = '';
    let tumbUrl = base + 'media/thumbnails/' + url;
    let videoUrl = base + 'media/video/' + url;
    let dataUrl = base + 'data/' + url;

    return {
      base: base,
      tumbUrl: tumbUrl,
      videoUrl: videoUrl,
      dataUrl
    };
  }

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
        loading(true);
      };
      request.onloadend = function () {
        loading(true);
      };

      //if the request is done
      request.onload = function () {
        //ony if request is done
        let statusCode = 200;
        if (request.status == statusCode) {
          loading(false);

          // send text form request
          resolve(request.responseText);
        } else {
          // reject the promise if there is a err
          reject(new Error('request failed!'));
          console.log('There went something wrong');
        }
      };
      //send the request
      request.send();
    });
  }

  function isOdd(num) {
    return num % 2;
  }
  // show or hide the loading spinner
  function loading(show) {
    let delayTime = 500;
    if (show) {
      VR.get.one('.loading').classList.remove('disabled');
    } else {
      //show loading
      setTimeout(function () {
        VR.get.one('.loading').classList.add('disabled');
      }, delayTime); //add a delay because you won't see it with fast internet.
    }
  }

  return { //return only the funtions that are nesseeriy
    urls: urls,
    one: one,
    all: all,
    data: data,
    isOdd: isOdd,
    loading: loading
  };
})();
