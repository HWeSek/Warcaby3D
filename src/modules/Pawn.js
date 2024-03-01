import { CylinderGeometry, Mesh } from "three";

export class Pawn extends Mesh {
    constructor(material, type, position) {
        super()
        this.color = type;
        this.default_material = material;
        this.material = material;
        this.geometry = new CylinderGeometry(21, 21, 15);
        this.cord = position;
        this.isPawn = true;
    }
}