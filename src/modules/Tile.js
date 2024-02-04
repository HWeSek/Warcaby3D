import { BoxGeometry, Mesh } from "three";

export class Tile extends Mesh {
    constructor(material, type) {
        super()
        this.color = type;
        this.material = material;
        this.geometry = new BoxGeometry(50, 20, 50);
    }
}