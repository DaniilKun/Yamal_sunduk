import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';


function init() {
    let container = document.querySelector('.container');

    //Scene
    const scene = new THREE.Scene()
    const size = {
        width: 2500,
        height: 2500,
    };

    const camera = new THREE.PerspectiveCamera(5, size.width / size.height, 13, 9000);
    camera.position.z = 0;
    camera.position.x = 5660;
    camera.position.y = 2220;

    var directionalLight = new THREE.DirectionalLight('0xffffff', 2)
    directionalLight.position.set(0, 1, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    var light3 = new THREE.PointLight(0xc4c4c4, 1)
    light3.position.set(0, 300, 500)
    scene.add(light3)

    var light5 = new THREE.PointLight(0xc4c4c4, 1)
    light5.position.set(0, 100, -500)
    scene.add(light5)

    var light6 = new THREE.PointLight(0xc4c4c4, 1)
    light6.position.set(-400, 300, 0)
    scene.add(light6)

    var light7 = new THREE.PointLight(0xc4c4c4, 1)
    light7.position.set(0, -700, 0)
    scene.add(light7)

    var light8 = new THREE.PointLight(0xc4c4c4, 1)
    light8.position.set(0, 1400, 0)
    scene.add(light8)


    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)

 
    renderer.setClearColor(0x000000, 0);

  
    {
        const loader = new GLTFLoader();
        loader.load('./model/m1/scene (1).gltf', gltf => {
            scene.add(gltf.scene);
        },
            function (error) {
                console.log('Error: ' + error)
            }
        )
    }

  
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableDamping = false;
    controls.minDistance = 13;
    controls.maxDistance = 1;

    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
        requestAnimationFrame(animate)
        controls.update();
        renderer.render(scene, camera)
    }
    animate()

}
console.log(THREE)
init()