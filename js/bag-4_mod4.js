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

    const camera = new THREE.PerspectiveCamera(6, size.width / size.height, 13, 9000);
    camera.position.z = 200;
    camera.position.x = 60;
    camera.position.y = 100;


    // Лампочка
    const spotLight = new THREE.SpotLight(0xffffff, 12);
    spotLight.position.set(900, -600, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
    directionalLight.position.set(500, 500, 5000)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5)
    directionalLight2.position.set(500, 500, -5000)
    directionalLight2.castShadow = true
    scene.add(directionalLight2)



    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size.width, size.height)
    renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.RCFSoftShadowMap
    container.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 0);


    {
        const loader = new GLTFLoader();
        loader.load('/model/TShirt/TShirt.glb', gltf => {
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
    controls.minDistance = 100;
    controls.maxDistance = 200;

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