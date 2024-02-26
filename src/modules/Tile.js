import { BoxGeometry, Mesh } from "three";

export class Tile extends Mesh {
    constructor(material, type, position) {
        super()
        this.color = type;
        this.material = material;
        this.geometry = new BoxGeometry(50, 20, 50);
        this.cord = position;
        this.isTile = true;
    }
}