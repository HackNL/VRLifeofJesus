VR.timeline = (function () { //funtion to render a template.
  //render the template
  let _selectedVideoId,
    timelineData = {};

  //render the template
  function init() {
    // r._getData();
    _getData();

  }

  function _getData() {
    let url = VR.get.urls('data.json').dataUrl;

    VR.get.data(url).then(response => {
      var parsed = JSON.parse(response);
      timelineData = parsed;
      _renderPage(timelineData);
    });
  }

  function _renderPage(timelineData) {
    let videoList = VR.get.one('.video-list');

    videoList.innerHTML = '';
    var ul = _generateTimeline(timelineData);
    videoList.appendChild(ul);

    clickVideo();
    addScrollListeners();
  }

  function _generateTimeline(data) {
    console.debug(data)

    VR.timeline.timelineData = data;

    let videoList = document.createElement('ul');
    let abosuleLeft;
    data.videos.forEach(function (movieObj, index) {
      // console.log(movieObj);
      let postion = (VR.get.isOdd(index) === 1) ? 'bottom' : 'top';
      abosuleLeft = (index === 0) ? 0 : abosuleLeft + 80;
      let element = _createVideoElement(movieObj, postion, abosuleLeft);
      // console.log(obj);
      videoList.innerHTML += element; //add it to the ul
    });
    return videoList;
  }

  function _createVideoElement(movieObj, postion, abosuleLeft) {
    let tumbUrlGenerated = VR.get.urls(movieObj.thumbnail).tumbUrl;
    // let videoUrl = VR.get.urls(movieObj.datealias).videoUrl;

    let video = '<li class="video-wrapper ' + postion + '" data-timestamp="' + movieObj.timestamp + ' "style="' + postion + ': 0; left: ' + abosuleLeft + 'vh">';
    video += '    <div class="video-wrapper-inner"><div class="thumbnail-wrapper">'
    video += '		  <img class="thumbnail" src="' + tumbUrlGenerated + '">';
    video += '  		<div class="media-caption">';
    video += '  		  <div class="caption-content">';
    video += '  			  <h2>' + movieObj.title + '</h2>';
    video += '  			  <span>' + movieObj.description + '</span>';
    video += '  			</div>';
    video += '    		</div>';
    video += '  			<button class="btn-play" data-video-id="' + movieObj.id + '"">';
    video += '  			</button>';
    video += '				</div>';
    video += '				<video autoplay controls style="display:none;">';
    video += '					   Sorry, your browser doesnt support embedded videos';
    video += '				</video>';
    video += '<span class="video-date">' + movieObj.datealias + '</span></div></li>';
    return video;
  }

  function clickVideo() {

    document.querySelector('.video-list ul').addEventListener('click', function (e) {
      console.debug('sdfsdf');
      if (e.target.className === "btn-play") {
        console.log('sdf');
        _selectedVideoId = e.target.dataset.videoId;

        var selectedVideo = getVideo(_selectedVideoId);
        console.log(selectedVideo);
        selectedVideo.id = _selectedVideoId;


        // Navigate to the meta video view
        console.log('Navigate to the meta video view');

        // gotoSection('video-meta');
        VR.router.show('#video');
        renderVideoMetaData(selectedVideo);

      }
    });
  }


  //
  //   window.addEventListener('mousedown', function (e) {
  //
  //     curDown = true;
  //     curYPos = e.pageY;
  //     curXPos = e.pageX;
  //   });
  //
  //   window.addEventListener('mouseup', function (e) {
  //     curDown = false;
  //   });
  // }

  function clickMetaVideo() {
    VR.get.one('#meta-btn-play').addEventListener('click', function (e) {
      var selectedVideoId = e.target.dataset.videoId;
      var selectedVideo = getVideo(selectedVideoId);
      // Play the video

      console.log('Play te video');

      var metaVideoElement = document.getElementById('meta-video');
      metaVideoElement.src = 'media/video/' + selectedVideo.filename;
      metaVideoElement.style.display = 'block';
      document.getElementsByClassName('meta-thumbnail-wrapper')[0].style.display = 'none';
    });
  }

  function clickCloseMeta() {
    VR.get.one('.btn-close').addEventListener('click', function (e) {

      // var videoElement = document.getElementById('meta-video');
      //
      // videoElement.pause();
      // videoElement.currentTime = 0;
      // videoElement.src = '';
      _getData();
      VR.router.show('#timeline');
    });
  }

  /**
   * Renders the video meta data in the video-meta section
   *
   * @param {obj}  selectedVideo  The selected video
   */

  function renderVideoMetaData(selectedVideo) {

    var contentWrapper = document.querySelector('.content-wrapper-detail');
    console.debug(selectedVideo);
    document.getElementById('meta-btn-play').setAttribute('data-video-id', selectedVideo.id);
    console.log(selectedVideo.thumbnail);
    document.getElementById('meta-thumbnail').src = 'media/thumbnails/' + selectedVideo.thumbnail;

    var detail = '<div class="content-inner">';
    detail += '<h2 id="video-title">' + selectedVideo.title + '</h2>';
    detail += '<p id="date-alias">' + selectedVideo.datealias + '</p>';
    detail += '<p id="description">' + selectedVideo.description + '</p>';
    detail += '<p id="context">' + selectedVideo.title + '</p>';
    detail += '</div>';

    contentWrapper.innerHTML = detail;
    // document.getElementById('video-title').innerHTML = selectedVideo.title;
    // document.getElementById('description').innerHTML = selectedVideo.description;
    // document.getElementById('date-alias').innerHTML = selectedVideo.datealias;
    //
    // document.getElementById('context').innerHTML = selectedVideo.context;
    clickMetaVideo();
    clickCloseMeta();
  }

  /**
   * Gets the video.
   *
   * @param      string videoId  The video identifier
   * @return     obj  The video.
   */
  function getVideo(videoId) {
    var videoObj;
    timelineData.videos.some(function (elm, index) {
      if (elm.id === videoId) {
        videoObj = elm;
        return true;
      }
    });
    return videoObj;

  }


  /**
   * Convers the mouse scroll from vertical scroll to horizontal scroll
   *
   * @param      {event}  e       { parameter_description }
   */
  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    document.getElementsByClassName('video-list')[0].scrollLeft -= (delta * 40); // Multiplied by 40
    e.preventDefault();
  }
  // function _dragScroll() {
  //     let videoList = document.getElementsByClassName('video-list')[0];
  //   var curYPos = 0,
  //     curXPos = 0,
  //     curDown = false;
  //
  //   videoList.addEventListener('mousemove', function (e) {
  //     if (curDown === true) {
  //       var timeLine = VR.get.one('#timeline');
  //
  //     }
  //   });


  /**
   * Adds scroll listeners for horizontal scrollign.
   */
  function addScrollListeners() {
    let videoList = document.getElementsByClassName('video-list')[0];
    if (videoList.addEventListener) {
      // IE9, Chrome, Safari, Opera
      videoList.addEventListener("mousewheel", scrollHorizontally, false);
      // Firefox
      videoList.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
      // IE 6/7/8
      videoList.addEventListener("onmousewheel", scrollHorizontally);
    }
  }

  return {
    init: init,
    timelineData:timelineData
  };

})();
