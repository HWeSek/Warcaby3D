import { MeshPhongMaterial, TextureLoader, DoubleSide, } from "three"
import black from "../textures/black.jpg";
import white from "../textures/white.jpg";
import w_pawn from "../textures/white_ivory.jpg"
import b_pawn from "../textures/black_ivory.jpg"
export const materials = {
    black_tile: new MeshPhongMaterial({ map: new TextureLoader().load(black), side: DoubleSide, specular: 0xffffff, shininess: 30 }),
    white_tile: new MeshPhongMaterial({ map: new TextureLoader().load(white), side: DoubleSide, specular: 0xffffff, shininess: 30 }),
    black_pawn: new MeshPhongMaterial({ map: new TextureLoader().load(b_pawn), side: DoubleSide, specular: 0xfafafa, shininess: 20 }),
    white_pawn: new MeshPhongMaterial({ map: new TextureLoader().load(w_pawn), side: DoubleSide, specular: 0xfafafa, shininess: 20 }),
}