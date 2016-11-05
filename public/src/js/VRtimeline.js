VR.timeline = (function () { //funtion to render a template.
  //render the template
  let _videos;
  let _selectedVideoId;

  function init() {
    // r._getData();
    _getData();
  }

  function _getData() {

    let videoList = VR.get.one('.video-list');
    let url = VR.get.urls('data.json').dataUrl;

    VR.get.data(url).then(response => {
      _videos = JSON.parse(response);

      videoList.appendChild(_generateTimeline(_videos));
      clickVideo();
    });
  }

  function _generateTimeline(data) {
    let videoList = document.createElement('ul');

    data.videos.forEach(function (obj) {
      var videoId = Object.keys(obj)[0];

      let element = _createVideoElement(obj[videoId].thumbnail, obj[videoId].title, obj[videoId].description, videoId);

      videoList.innerHTML += element; //add it to the ul
    });
    return videoList;

  }

  function _createVideoElement(tumbUrl, title, description, videoId) {
    let tumbUrlGenerated = VR.get.urls(tumbUrl).tumbUrl;
    let videoUrl = VR.get.urls(tumbUrl).tumbUrl;

    let video = '<li><div class="video-wrapper">';
    video += '					<div class="thumbnail-wrapper">'
    video += '						<img class="thumbnail" src="' + tumbUrlGenerated + '">';
    video += '  					<div class="media-caption">';
    video += '  						<div class="caption-content">';
    video += '  							<h2>' + title + '</h2>';
    video += '  							<span>' + description + '</span>';
    video += '  						</div>';
    video += '    				</div>';
    video += '  					<div class="video-play" data-video-id="' + videoId + '"">';
    video += '  					</div>';
    video += '					</div>';
    video += '					<video autoplay controls style="display:none;">';
    video += '					Sorry, your browser doesnt support embedded videos';
    video += '					</video>';
    video += '</div></li>';
    return video;
  }

  function clickVideo() {
    VR.get.one('.video-list ul').addEventListener('click', function (e) {
      if (e.target.className == "video-play") {

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

  function clickMetaVideo() {
    VR.get.one('#meta-video-play').addEventListener('click', function (e) {
      var selectedVideoId = e.target.dataset.videoId;
      var selectedVideo = getVideo(selectedVideoId)[selectedVideoId];

      // Play the video
      console.log('Play te video');

      var metaVideoElement = document.getElementById('meta-video');
      metaVideoElement.src = 'media/video/' + selectedVideo.filename;
      metaVideoElement.style.display = 'block';
      document.getElementsByClassName('meta-thumbnail-wrapper')[0].style.display = 'none';
    });
  }


  function clickCloseMeta(){
  	VR.get.one('.close').addEventListener('click', function (e) {
      VR.router.show('#timeline');
      var videoElement = document.getElementById('meta-video');
      console.log('check')
      console.log(videoElement.pause())
      console.log(videoElement)
      videoElement.pause();
      videoElement.currentTime = 0;
    });
  }

  /**
   * Renders the video meta data in the video-meta section
   *
   * @param      {obj}  selectedVideo  The selected video
   */
  function renderVideoMetaData(selectedVideo) {
    console.log(selectedVideo);
    document.getElementById('meta-video-play').setAttribute('data-video-id', selectedVideo.id);
    document.getElementById('video-title').innerHTML = selectedVideo[selectedVideo.id].title;
    document.getElementById('description').innerHTML = selectedVideo[selectedVideo.id].description;
    document.getElementById('date-alias').innerHTML = selectedVideo[selectedVideo.id].datealias;
    document.getElementById('meta-thumbnail').src = 'media/thumbnails/' + selectedVideo[selectedVideo.id].thumbnail;
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
    var selectedVideo;
    console.log(_videos);
    _videos.videos.some(function (elm, index) {
      if (elm[videoId]) {
        selectedVideo = elm;
      }
    })
    return selectedVideo;
  }


  return {
    init: init
  };

})();
