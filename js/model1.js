import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';


function init() {
    let container = document.querySelector('.container');

    //Scene
    const scene = new THREE.Scene()
    const size = {
        width: 2400,
        height: 1725,
    };

    const camera = new THREE.PerspectiveCamera(5, size.width / size.height, 13, 9000);
    camera.position.z = 250;
    camera.position.x = 250;
    camera.position.y = 15;


    let directionalLight;

    // light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 3.0 );
    directionalLight.position.set( 300, 100, 300 );
    directionalLightIntensity: 15.6
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( 0xffffff, 3.0 );
    directionalLight.position.set( -500, -100, -300);
    directionalLight.castShadow = true
    directionalLightIntensity: 15.6
    scene.add( directionalLight );


    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping;

    {
        const loader = new GLTFLoader();
        loader.load('../model/m1/bag2.glb', gltf => {
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
    controls.minDistance = 103;
    controls.maxDistance = 550;
    controls.enablePan = false;

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