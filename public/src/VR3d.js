//To easily select something from the DOM
VR.V3d = (function () {
  var effect, video, image, imageContext,texture;
  var timelineDistance=-4;
  var blackMaterial;

  function init() {
    console.log("initializing VR.V3d...");
    document.getElementsByTagName("body")[0].style.overflow="hidden";

  	blackMaterial = new THREE.MeshBasicMaterial( { color: 0x000000} );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
    camera.position.set(0, 1.6, 0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer( { alpha: true , antialias: true });
    element = renderer.domElement;
    container = document.getElementById('timeline3D');
    container.appendChild(element);

		var loader = new THREE.OBJLoader(); 
		loader.load(
		 'media/meshes/tubeNoncontinuousScaled.obj',
 
		 function ( object ) {
		    scene.add(object);
		    object.position.set(0 , 1.6 , 0);
		    //object.scale.set(5.1 , 0.02 , 5.1); only for the continuous tube
   			object.material=blackMaterial;
   			object.children.forEach(function(child){
   				child.material=blackMaterial;
   			})
		 });    

    controls = new THREE.OrbitControls(camera, element);
    controls.target.set(
      camera.position.x,
      camera.position.y,
      camera.position.z - 0.15
    );
    controls.noPan = true;
    controls.noZoom = true;


    function setOrientationControls(e) {
      if (!e.alpha) return;
      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();
      element.addEventListener('click', fullscreen, false);
      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);

    var light = new THREE.PointLight(0x999999, 2, 100);
    light.position.set(50, 50, 50);
    scene.add(light);

    var lightScene = new THREE.PointLight(0x999999, 2, 100);
    lightScene.position.set(0, 5, 0);
    scene.add(lightScene);

    var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

    clock = new THREE.Clock();

    var raycaster = new THREE.Raycaster(); // create once
    var mouse = new THREE.Vector2(); // create once
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    function onDocumentMouseDown( event ) 
    {
      event.preventDefault();
 
 
      mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
      mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

      raycaster.setFromCamera( mouse, camera );

      var intersects = raycaster.intersectObjects( scene.children, true );
	  	stopAllVideos();
      if ( intersects.length > 0 && intersects[0].object.data)//checks if there is any media data from the timeline associated to this object. 
      {
		    var object3d =  intersects[ 0 ].object;

				showVideo(intersects[ 0 ].object);

      }
    }

    generateCardboardTimeline(camera);
    animate();
  }
  function enableVR()
  {
    console.log("enabling VR");
  	effect = new THREE.StereoEffect(renderer);
  }

  function disableVR()
  {
    console.log("disabling VR");
  	effect = null;
  }

  function toggleVR()
  {
    console.log("toggling VR");
  	if (effect) disableVR();
  	else enableVR();
  }

  function animate() {
    var elapsedSeconds = clock.getElapsedTime();
    requestAnimationFrame(animate);

    update(clock.getDelta());
    render(clock.getDelta());
  }

  function generateCardboardTimeline(camera) {

    //var videoData = VR.render.timelineData
    
 		yposition=1
    VR.timeline.timelineData.videos.forEach(function(mediaItem)
    {
	    //placeholder
	    var placeholder = new THREE.Object3D();
	    placeholder.name = "placeholder";
	    scene.add(placeholder);
	    placeholder.position.set(0, camera.position.y, 0);
	    placeholder.rotation.set(0,-mediaItem.timestamp/18,0);

	    //media
	    thumbnailTexture = new THREE.ImageUtils.loadTexture("media/thumbnails/"+mediaItem.thumbnail);
			ThumbnailMaterial = new THREE.MeshBasicMaterial( { map: thumbnailTexture, overdraw: 0.5 } );

	    var geometry	= new THREE.PlaneBufferGeometry(1.6, .9);
 	    var media  		= new THREE.Mesh(geometry);
	    media.name 		= mediaItem.id;
	    media.material= ThumbnailMaterial;
	    media.data 		= mediaItem;
	    media.position.set(0, yposition, timelineDistance);
	    media.originalPosition={x:media.position.x , y:media.position.y , z:media.position.z};
	    placeholder.add(media);


	    //pipe
	    var cylinderGeometry = new THREE.CylinderBufferGeometry(0.01,0.01,1);
	    var pipe  = new THREE.Mesh(cylinderGeometry);
	    pipe.position.set(0, yposition*0.5, timelineDistance-0.1);
	    pipe.material=blackMaterial;
	    placeholder.add(pipe);
 
	    //connector
	    var sphereGeometry = new THREE.SphereBufferGeometry(0.05);
	    var connector  = new THREE.Mesh(sphereGeometry);
	    connector.position.set(0, 0 , timelineDistance-0.1);
	    connector.material=blackMaterial;
	    placeholder.add(connector);
 
	    yposition*=-1;
    });

  }

  function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    if (effect) effect.setSize(width, height);
  }

  function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
  }

  function render(dt) {
    if ( video && video.readyState === video.HAVE_ENOUGH_DATA ) {
      imageContext.drawImage( video, 0, 0 );
      if ( texture ) texture.needsUpdate = true;
    }
    if (effect) {effect.render(scene, camera);}
    else {renderer.render(scene, camera);}
  }

  function fullscreen() {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }

  function showVideo(mesh)
  {
  	//move video forward
    position = {z: -1,y:0};
    new createjs.Tween(mesh.position)
        .to(position, 2000);

    video = document.getElementById('cardboardOffscreenVideo');
    image = document.getElementById('cardboardOffscreenCanvas');
    imageContext = image.getContext( '2d' );
    texture = new THREE.Texture( image );
		texture.offset.y=0.3; //scale the texture by the amount in percentage of blackspace under the video because the video is scaled 
		texture.repeat.y=0.7;
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    mesh.material=material;
		//play new video
    video.setAttribute('src',"media/video/"+mesh.data.filename);
    video.play();

  }

	function stopAllVideos()
	{
		//find all children of the scene that are named placeholder
		scene.children.forEach(function(child){
			//iterate through placeholders
			if (child.name=="placeholder")
			{
			//find the only child
				mesh=child.children[0];
				new createjs.Tween(mesh.position).to({x:mesh.originalPosition.x, y:mesh.originalPosition.y, z: mesh.originalPosition.z}, 400);
			}


		})
		//

	}
  return {
    init: init,
    showVideo: showVideo,
    enableVR: enableVR,
    disableVR: disableVR,
    toggleVR: toggleVR,
    blackMaterial:blackMaterial
  }

})();
