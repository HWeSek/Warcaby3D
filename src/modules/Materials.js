import { MeshBasicMaterial, TextureLoader, DoubleSide, } from "three"
import black from "../textures/black.jpg";
import white from "../textures/white.jpg";
export const materials = {
    black_tile: new MeshBasicMaterial({ map: new TextureLoader().load(black), side: DoubleSide, specular: 0xffffff, shininess: 30 }),
    white_tile: new MeshBasicMaterial({ map: new TextureLoader().load(white), side: DoubleSide, specular: 0xffffff, shininess: 30 })
}