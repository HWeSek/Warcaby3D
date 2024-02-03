import { Scene, AxesHelper, Color } from 'three';
import Renderer from './renderer';
import Camera from './camera';
import { materials } from './Materials';
import { Tile } from './Tile';

const container = document.getElementById('root')
const scene = new Scene()
scene.background = new Color(0x222222)
const renderer = new Renderer(scene, container)
const camera = new Camera(renderer.threeRenderer)
const axes = new AxesHelper(1000);
scene.add(axes)

///////////////////////////////
const szachownica = [

    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
];

const Game = {
    drawTiles() {
        for (let i in szachownica) {
            for (let j in szachownica[i]) {
                let tile;
                if (szachownica[i][j] == 1) {
                    tile = new Tile(materials.white_tile)
                } else {
                    tile = new Tile(materials.black_tile)
                }
                tile.position.set((i - 4) * 50, 0, (j - 4) * 50);
                scene.add(tile);
            }
        }

    },
    render() {
        renderer.render(scene, camera.threeCamera);
        requestAnimationFrame(Game.render);

    }


}
export { Game }