import { CylinderGeometry, Mesh } from "three";

export class Pawn extends Mesh {
    constructor(material, type) {
        super()
        this.color = type;
        this.material = material;
        this.geometry = new CylinderGeometry(21, 21, 15);
    }
}