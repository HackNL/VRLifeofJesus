//To easily select something from the DOM
VR.V3d = (function () {
  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
    camera.position.set(0, 1.6, 0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('timeline3D');
    container.appendChild(element);

    effect = new THREE.StereoEffect(renderer);

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

    var floor = new THREE.Mesh(geometry);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    clock = new THREE.Clock();

    generateTimeline(camera);

    animate();
  }
  init()

  function animate() {
    var elapsedSeconds = clock.getElapsedTime();
    requestAnimationFrame(animate);

    update(clock.getDelta());
    render(clock.getDelta());
  }

  function generateTimeline(camera) {
    var placeholder = new THREE.Object3D();
    placeholder.name = "placeholder";
    var material = new THREE.MeshPhongMaterial({
      color: 0x00ff00
    });

    scene.add(placeholder);
    placeholder.position.set(0, camera.position.y, 0);

    var geometry = new THREE.PlaneBufferGeometry(1.6, .9);
    var media = new THREE.Mesh(geometry);
    media.name = "mediaPlane";
    //media.rotation.set(Math.PI,0,0)

    media.position.set(0, 0, -2);
    placeholder.add(media);

  }


  function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
  }

  function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
  }

  function render(dt) {
    effect.render(scene, camera);
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
  return {
    init: init
  }

})();
