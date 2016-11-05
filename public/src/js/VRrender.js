VR.render = (function () { //funtion to render a template.
  //render the template
  function init() {
    // r._getData();
    _getData();
  }

  function _getData() {
    VR.get.data('data/data.json').then(response => {
      _generateTimeline(JSON.parse(response));
    });
  }

  function _generateTimeline(data) {
    let videoList = VR.get.one('.video-list');
    data.videos.forEach(function (obj, index) {
      console.log(obj);
      let li = document.createElement('li');
      let title = document.createElement('H1');
      title.innerHTML = obj.title;
      li.appendChild(title);
      videoList.appendChild(li)
    });
  }

  // show or hide the loading spinner
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

  document.getElementsByClassName('video-play')[0].addEventListener('click', function(){
  	console.log();
  	var videoElement = document.getElementsByTagName('video')[0];
  	videoElement.src = 'media/video/' + this.dataset.filename;
  	videoElement.style.display = 'block';

  	document.getElementsByClassName('thumbnail-wrapper')[0].style.display = 'none';




  	// var fileName = e.srcElement.attributes
  })

  return {
    init: init,
    loading: loading
  };
})();
