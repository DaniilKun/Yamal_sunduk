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

    const API = {
        lightProbeIntensity: 1.0,
        directionalLightIntensity: 2.6,
        envMapIntensity: 1
    };


    let lightProbe;
    let directionalLight;
    let directionalLight2;

    lightProbe = new THREE.LightProbe();
				scene.add( lightProbe );

    // light
    // directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
    // directionalLight.position.set( 10, 10, 10 );
    // scene.add( directionalLight );

    // directionalLight2 = new THREE.DirectionalLight( 0xffffff, 3 );
    // directionalLight2.position.set( -1000, -1000, -1100 );
    // directionalLight2.castShadow = true
    // scene.add( directionalLight2 );

    directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
    directionalLight.position.set( 3000, 1000, 3000 );
    directionalLightIntensity: 15.6
    scene.add( directionalLight );

    directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2.0 );
    directionalLight2.position.set( 3000, 3000, -3000 );
    directionalLightIntensity: 5.6
    scene.add( directionalLight2 );

    const camera = new THREE.PerspectiveCamera(4, size.width / size.height, 13, 9000);
    camera.position.z = 150;
    camera.position.x = 150;
    camera.position.y = 15;

    // var directionalLight2 = new THREE.DirectionalLight('0xffffff', 2)
    // directionalLight2.position.set(0, 5, 0)
    // directionalLight2.castShadow = true
    // scene.add(directionalLight2)

    // var light3 = new THREE.PointLight(0xc4c4c4, 1)
    // light3.position.set(0, 300, 500)
    // scene.add(light3)

    // var light5 = new THREE.PointLight(0xc4c4c4, 1)
    // light5.position.set(0, 100, -500)
    // scene.add(light5)

    // var light6 = new THREE.PointLight(0xc4c4c4, 1)
    // light6.position.set(-400, 300, 0)
    // scene.add(light6)

    // var light7 = new THREE.PointLight(0xc4c4c4, 1)
    // light7.position.set(0, -700, 0)
    // scene.add(light7)

    // var light8 = new THREE.PointLight(0xc4c4c4, 1)
    // light8.position.set(0, 1400, 0)
    // scene.add(light8)


    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    container.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping;

    {
        const loader = new GLTFLoader();
        loader.load('/model/mod5/sum1.glb', gltf => {
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