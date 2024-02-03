import { BoxGeometry, Mesh } from "three";

export class Tile extends Mesh {
    constructor(material) {
        super()
        this.material = material;
        this.geometry = new BoxGeometry(50, 20, 50);
    }
}