VR.timeline = (function () { //funtion to render a template.
  //render the template
  function init() {
    // r._getData();
    _getData();
    
  }

  function _getData() {

    let videoList = VR.get.one('.video-list');
    let url = VR.get.urls('data.json').dataUrl;
    console.log(videoList);

    VR.get.data(url).then(response => {
    	videos = JSON.parse(response);
      videoList.appendChild(_generateTimeline(videos));
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
    setActiveSection('timeline');
    return videoList;
  }

  function _createVideoElement(tumbUrl, title, description, videoId) {
    let tumbUrlGenerated = VR.get.urls(tumbUrl).tumbUrl;
    let videoUrl = VR.get.urls(tumbUrl).tumbUrl;
    let video = '<ul><div class="video-wrapper">';
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
    video += '</div></ul>';

    return video;
  }

  function clickVideo(){
  	VR.get.one('.video-list ul').addEventListener('click', function(e){
  		if(e.target.className == "video-play"){
  			var selectedVideoId = e.target.dataset.videoId;
  			var selectedVideo = getVideo(selectedVideoId)[selectedVideoId];
  			selectedVideo.id = selectedVideoId;

		  	if(getActiveSection() == 'timeline'){
		  		// Navigate to the meta video view
		  		console.log('Navigate to the meta video view');

		  		// gotoSection('video-meta');
		  		VR.render.show('video');
			  	renderVideoMetaData(selectedVideo);
		  	}
  		}
  	});
  }

  function clickMetaVideo(){
  	VR.get.one('.video-meta').addEventListener('click', function(e){
  		if(e.target.id == "meta-video-play"){
  			var selectedVideoId = e.target.dataset.videoId;
  			var selectedVideo = getVideo(selectedVideoId)[selectedVideoId];

		  	if(getActiveSection() == 'video-meta'){
		  		// Play the video
		  		console.log('Play te video');

		  		var metaVideoElement = document.getElementById('meta-video');
		  		metaVideoElement.src = 'media/video/' + selectedVideo.filename;
		  		metaVideoElement.style.display = 'block';
		  		document.getElementsByClassName('meta-thumbnail-wrapper')[0].style.display = 'none';
		  	}
  		}
  	});
  }


  /**
   * Renders the video meta data in the video-meta section
   *
   * @param      {obj}  selectedVideo  The selected video
   */
  function renderVideoMetaData(selectedVideo){
  	document.getElementById('meta-video-play').setAttribute('data-video-id', selectedVideo.id);
  	document.getElementById('video-title').innerHTML = selectedVideo.title;
  	document.getElementById('description').innerHTML = selectedVideo.description;
  	document.getElementById('date-alias').innerHTML = selectedVideo.datealias;
  	document.getElementById('meta-thumbnail').src = 'media/thumbnails/' + selectedVideo.thumbnail;
  }


  
  /**
   * Gets the video.
   *
   * @param      string videoId  The video identifier
   * @return     obj  The video.
   */
  function getVideo(videoId){
  	var selectedVideo;
  	videos.videos.some(function (elm, index) {
			if(elm[videoId]){
				selectedVideo = elm;
			}
		})
		return selectedVideo;
  }


return {
  init: init
};

})();
