VR.render = (function () { //funtion to render a template.
  //render the template
  function init() {
    // r._getData();
    _getData();
  }

  function _getData() {
    let videoList = VR.get.one('.video-list');
    VR.get.data('//localhost:7000/data/data.json').then(response => {
    videoList.appendChild(_generateTimeline(JSON.parse(response)));
    });
  }

  function _generateTimeline(data) {
    let videoList = document.createElement('ul');
    data.videos.forEach(function (obj, index) {
      console.log(obj, index);
      let li = document.createElement('li');
      let title = document.createElement('H2');
      let date = document.createElement('span');
      title.innerHTML = obj.title;
      date.innerHTML = VR.date.readableDate(new Date(obj.datealias));
      console.log(date);
      li.appendChild(title);
      li.appendChild(date);

      videoList.appendChild(li); //add it to the ul
    });
    return videoList;
  }

  // show or hide the loading spinner
  function loading(show) {
    let delayTime = 300;
    if (show) {
      VR.get.one('.loading').classList.remove('disabled');
    } else {
      //show loading
      setTimeout(function () {
        VR.get.one('.loading').classList.add('disabled');
      }, delayTime); //add a delay because you won't see it with fast internet.
    }
  };

  document.getElementsByClassName('video-play')[0].addEventListener('click', function(){
  	var videoElement = document.getElementsByTagName('video')[0];
  	videoElement.src = 'media/video/' + this.dataset.filename;
  	videoElement.style.display = 'block';

  	document.getElementsByClassName('thumbnail-wrapper')[0].style.display = 'none';
  })

  }
  return {
    init: init,
    loading: loading
  };
})();
