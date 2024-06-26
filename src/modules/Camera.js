import { PerspectiveCamera, Vector3 } from 'three';

export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        this.threeCamera = new PerspectiveCamera(75, width / height, 0.1, 10000);
        this.threeCamera.position.set(250, 250, 0);
        this.threeCamera.lookAt(new Vector3(0, 0, 0))

        this.updateSize(renderer);

        window.addEventListener('resize', () => this.updateSize(renderer), false);
    }

    changePosition(x, y, z) {
        this.threeCamera.position.set(x, y, z);
        this.threeCamera.lookAt(new Vector3(0, 0, 0))
    }

    updateSize(renderer) {

        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }
}