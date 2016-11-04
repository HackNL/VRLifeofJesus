
function init() 
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
	camera.position.set(0, 15, 0);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer();
	element = renderer.domElement;
	container = document.getElementById('webglviewer');
	container.appendChild(element);

	effect = new THREE.StereoEffect(renderer);

	controls = new THREE.OrbitControls(camera, element);
	controls.target.set(
		camera.position.x + 0.15,
		camera.position.y,
		camera.position.z
	);
	controls.noPan = true;
	controls.noZoom = true;

	window.addEventListener('deviceorientation', setOrientationControls, true);

	function setOrientationControls(e) 
	{
		if (!e.alpha) return;
		controls = new THREE.DeviceOrientationControls(camera, true);
		controls.connect();
		controls.update();
	}
	element.addEventListener('click', fullscreen, false);

	window.removeEventListener('deviceorientation', setOrientationControls, true);

	var light = new THREE.PointLight(0x999999, 2, 100);
	light.position.set(50, 50, 50);
	scene.add(light);

	var lightScene = new THREE.PointLight(0x999999, 2, 100);
	lightScene.position.set(0, 5, 0);
	scene.add(lightScene);

	var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

	var floor = new THREE.Mesh(geometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;
	scene.add(floor);
}
init()