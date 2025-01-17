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

    const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 13, 9000);
    camera.position.z = 180;
    camera.position.x = 50;
    camera.position.y = 0;

    var directionalLight = new THREE.DirectionalLight('0xffffff', 12)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    var directionalLight2 = new THREE.DirectionalLight('0xffffff', 12)
    directionalLight2.position.set(50, 50, 50)
    directionalLight2.castShadow = true
    scene.add(directionalLight2)

    var directionalLight3 = new THREE.DirectionalLight('0xffffff', 12)
    directionalLight3.position.set(-150, -150, -350)
    directionalLight3.castShadow = true
    scene.add(directionalLight3)

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)

 
    renderer.setClearColor(0x000000, 0);

  
    {
        const loader = new GLTFLoader();
        loader.load('/model/amulet7/AMULET.glb', gltf => {
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
    controls.minDistance = 30;
    controls.maxDistance = 70;

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