VR.render = (function () { //funtion to render a template.
  //render the template
  function init() {
    // r._getData();
    _getData();
  }

  function _getData() {
    let videoList = VR.get.one('.video-list');
    let url = VR.get.urls('data.json').dataUrl;

    VR.get.data(url).then(response => {
      videoList.appendChild(_generateTimeline(JSON.parse(response)));
    });
  }

  function _generateTimeline(data) {
    let videoList = document.createElement('ul');
    data.videos.forEach(function (obj) {
      let element = _createVideoElement(obj.thumbnail, obj.title, obj.description);
      videoList.innerHTML += element; //add it to the ul

    });
    return videoList;
  }

  function _createVideoElement(tumbUrl, title, description) {
    let tumbUrlGenerated = VR.get.urls(tumbUrl).tumbUrl;
    let videoUrl = VR.get.urls(tumbUrl).tumbUrl;
    let video = '<ul><div class="video-wrapper">';
    video += '<img class="thumbnail" src="' + tumbUrlGenerated + '">';
    video += '  <div class="media-caption">';
    video += '  <div class="caption-content">';
    video += '  <h2>' + title + '</h2>';
    video += '  <span>' + description + '</span>';
    video += '  </div>';
    video += '    </div>';
    video += '  <div class="video-play">';
    video += '  </div>';
    video += '</div></ul>';
    return video;
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

  document.getElementsByClassName('video-play')[0].addEventListener('click', function () {
    var videoElement = document.getElementsByTagName('video')[0];
    videoElement.src = 'media/video/' + this.dataset.filename;
    videoElement.style.display = 'block';

    document.getElementsByClassName('thumbnail-wrapper')[0].style.display = 'none';
  })
// }
return {
  init: init,
  loading: loading
};
})();
