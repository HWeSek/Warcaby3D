import { MeshPhysicalMaterial, MeshMatcapMaterial, TextureLoader, DoubleSide, } from "three"
import black from "../textures/black.jpg";
import white from "../textures/white.jpg";
import w_pawn from "../textures/white_ivory.jpg"
import b_pawn from "../textures/black_ivory.jpg"
export const materials = {
    black_tile: new MeshPhysicalMaterial({
        map: new TextureLoader().load(black), side: DoubleSide, specular: 0x000000, shininess: 30, metalness: 0.1,
        roughness: 0.8,
        reflectivity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: DoubleSide,
        shadowSide: DoubleSide,
    }),
    white_tile: new MeshPhysicalMaterial({
        map: new TextureLoader().load(white), side: DoubleSide, specular: 0xffffff, shininess: 30, metalness: 0.1,
        roughness: 0.8,
        reflectivity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: DoubleSide,
        shadowSide: DoubleSide,
    }),
    black_pawn: new MeshPhysicalMaterial({
        map: new TextureLoader().load(b_pawn), side: DoubleSide, metalness: 0.1,
        roughness: 0.8,
        reflectivity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: DoubleSide,
        shadowSide: DoubleSide,
    }),
    white_pawn: new MeshPhysicalMaterial({
        map: new TextureLoader().load(w_pawn), side: DoubleSide, metalness: 0.1,
        roughness: 0.8,
        reflectivity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: DoubleSide,
        shadowSide: DoubleSide,
    }),
    selected_pawn: new MeshMatcapMaterial({ color: 0x37de64, side: DoubleSide }),
    tile_choice: new MeshMatcapMaterial({ color: 0xe6e600, side: DoubleSide }),
}