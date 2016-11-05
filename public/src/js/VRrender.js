VR.render = (function () { //funtion to render a template.
  var width = 0,
    videoSize = 500;
  var timelineData = {};
  //render the template
  function init() {
    // r._getData();
    _getData();
  }


  function _getData() {
    let videoList = VR.get.one('.video-list');
    let url = VR.get.urls('data.json').dataUrl;

    VR.get.data(url).then(response => {
      var parsed = JSON.parse(response);
      timelineData = parsed;
      videoList.appendChild(_generateTimeline(parsed));
    });


    // console.log(document.getElementsByClassName('.video-list')[0]);

    // for(var i = 0; i < videoList.selectAllChildren(); i++) {
    //     videoList.style.left = obj.timestamp + "px";
    // }
  }

  function _generateTimeline(data) {
    let videoList = document.createElement('ul');
    data.videos.forEach(function (obj) {
      width = width + videoSize;

      let element = _createVideoElement(obj.thumbnail, obj.title, obj.description, obj.datealias);
      videoList.innerHTML += element; //add it to the ul

    });
    document.getElementsByClassName("video-list")[0].style.width = width + "px";
    document.getElementById("timeline").style.width = width + 200 + "px";
    return videoList;
  }

  function _createVideoElement(tumbUrl, title, description, date) {
    let tumbUrlGenerated = VR.get.urls(tumbUrl).tumbUrl;
    let videoUrl = VR.get.urls(tumbUrl).tumbUrl;
    let video = '<div class="video-wrapper" data-date="' + date + '">';
    video += '<img class="thumbnail" src="' + tumbUrlGenerated + '">';
    video += '  <div class="media-caption">';
    video += '  <div class="caption-content">';
    video += '  <h2>' + title + '</h2>';
    video += '  <span>' + description + '</span>';
    video += '  </div>';
    video += '    </div>';
    video += '  <div class="video-play">';
    video += '  </div>';
    video += '  <div class="video-date-label">' + date + '  </div>';
    video += '</div>';
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

  function _dragScroll() {
    var curYPos = 0,
      curXPos = 0,
      curDown = false;

    window.addEventListener('mousemove', function (e) {
      if (curDown === true) {
        window.scrollTo(document.body.scrollLeft + (curXPos - e.pageX), document.body.scrollTop + (curYPos - e.pageY));
      }
    });

    window.addEventListener('mousedown', function (e) {
      console.log(e);
      curDown = true;
      curYPos = e.pageY;
      curXPos = e.pageX;
    });

    window.addEventListener('mouseup', function (e) {
      curDown = false;
    });
  }
  document.getElementsByClassName('video-play')[0].addEventListener('click', function () {
      var videoElement = document.getElementsByTagName('video')[0];
      videoElement.src = 'media/video/' + this.dataset.filename;
      videoElement.style.display = 'block';

      document.getElementsByClassName('thumbnail-wrapper')[0].style.display = 'none';
    }) <<
    << << < HEAD
    // }
  return {
    init: init
  }; ===
  === =
  // }
  return {
    init: init,
    timelineData: timelineData
  }; >>>
  >>> > master
})();
