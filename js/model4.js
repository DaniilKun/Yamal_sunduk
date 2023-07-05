import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';


function init() {
    let container = document.querySelector('.container');

    //Scene
    const scene = new THREE.Scene()
    const size = {
        width: 2500,
        height: 1725,
    };

    const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 13, 2000);
    camera.position.z = 60;
    camera.position.x = 0;
    camera.position.y = 20;

    var directionalLight = new THREE.DirectionalLight('0xffffff', 3)
    directionalLight.position.set(0, 1, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    var light3 = new THREE.DirectionalLight(0xc4c4c4, 1)
    light3.position.set(0, 300, 500)
    scene.add(light3)

    var light5 = new THREE.DirectionalLight(0xc4c4c4, 1)
    light5.position.set(0, 100, -500)
    scene.add(light5)

    var light6 = new THREE.DirectionalLight(0xc4c4c4, 1)
    light6.position.set(-400, 300, 0)
    scene.add(light6)

    var light7 = new THREE.DirectionalLight(0xc4c4c4, 1)
    light7.position.set(0, -700, 0)
    scene.add(light7)

    var light8 = new THREE.DirectionalLight(0xc4c4c4, 1)
    light8.position.set(0, 1400, 0)
    scene.add(light8)


    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)

 
    renderer.setClearColor(0x000000, 0);

  
    {
        const loader = new GLTFLoader();
        loader.load('../model/m4/bag3.glb', gltf => {
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
    controls.enableDamping = true;
    controls.minDistance = 29;
    controls.maxDistance = 50;

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