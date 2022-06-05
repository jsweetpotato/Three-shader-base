
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import fragment from "../shaders/fragment.glsl"
import vertex from "../shaders/vertex.glsl"

class App {
  constructor() {
    this._container = document.querySelector("div");

    // renderer setting
    this._renderer = new THREE.WebGL1Renderer({ antialias: true });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._container.appendChild(this._renderer.domElement);

    // create scene
    this._scene = new THREE.Scene();

    // utils
    this._setCamera();
    this._setLight();
    this._setObject();
    this._setControls();

    // resize
    window.addEventListener("resize", this.onWindowResize.bind(this));

    // rendering
    this.render();
  }

  //

  _setControls() {
    this.controls = new OrbitControls(this._camera, this._container);
    console.log(this.controls);

    this.controls.target = this.cube.position;
    this.controls.rotateSpeed = 0.5;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.autoRotate = true;
  }

  _setLight() {
    const light1 = new THREE.AmbientLight(0x2fafdf, 1);
    this._scene.add(light1);

    const pointLight = new THREE.PointLight(0xffaf00, 3, 100);
    pointLight.position.set(2, 10, 8);
    this._scene.add(pointLight);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    this._scene.add(pointLightHelper);
  }

  _setCamera() {
    this._camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this._camera.position.z = 40;
  }

  _setObject() {
    const geo = new THREE.BoxGeometry(10, 10, 10);
    // for standard
    // const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // for shader
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mat = mat;
    const cube = new THREE.Mesh(geo, mat);
    this.cube = cube;
    this._scene.add(this.cube);
  }

  //

  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //

  render() {
    this._renderer.render(this._scene, this._camera);
    window.requestAnimationFrame(this.render.bind(this));
    this.update();

    // shader time update
    this.mat.uniforms.time.value = performance.now();
  }

  update() {
    this.controls.update();
  }
}

window.onload = new App();
