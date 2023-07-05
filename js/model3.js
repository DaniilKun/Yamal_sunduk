import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

function init() {
    let container = document.querySelector('.container');

    //Scene
    const scene = new THREE.Scene()
    const size = {
        width: 2500,
        height: 1750,
    };


    let directionalLight;

    // light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 3.0 );
    directionalLight.position.set( 300, 100, 3000 );
    directionalLightIntensity: 15.6
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( 0xffffff, 3.0 );
    directionalLight.position.set( -300, -100, -3000 );
    directionalLight.castShadow = true
    directionalLightIntensity: 15.6
    scene.add( directionalLight );


    const camera = new THREE.PerspectiveCamera(40, size.width / size.height, 13, 2000);
    camera.position.z = 60;
    camera.position.x = 0;
    camera.position.y = 20;



    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)

 
    renderer.setClearColor(0x000000, 0);

  
    {
        const loader = new GLTFLoader();
        loader.load('../model/m3/bag_scene.gltf', gltf => {
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