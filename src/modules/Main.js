import { Scene, AxesHelper, Color, AmbientLight, Raycaster, Vector2 } from 'three';
import Renderer from './renderer';
import Camera from './camera';
import { materials } from './Materials';
import { Tile } from './Tile';
import { Pawn } from './Pawn';

const container = document.getElementById('root')
const scene = new Scene()
scene.background = new Color(0x222222)
const renderer = new Renderer(scene, container)
const camera = new Camera(renderer.threeRenderer)
//const axes = new AxesHelper(1000);
//scene.add(axes)

const light = new AmbientLight(0xffffff, 2);
scene.add(light);
light.position.set(0, 200, 0);

///////////////////////////////
const szachownica = [

    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];

const pionki = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
];

const raycaster = new Raycaster();
const mouseVector = new Vector2()
let intersects = 0;

function toggleRaycaster(onof) {
    if (onof) {
        window.addEventListener('mousedown', (e) => {
            mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera.threeCamera);
            intersects = raycaster.intersectObjects(scene.children);
        })
    } else {
        window.removeEventListener('click');
    }
}


const Game = {
    setPlayer(side) {
        console.log(side);
        switch (side) {
            case "white":
                camera.changePosition(-250, 250, 0)
                break;
            case "black":
                camera.changePosition(250, 250, 0)
                break;
        }
    },
    drawTiles() {
        for (let i in szachownica) {
            for (let j in szachownica[i]) {
                let tile;
                if (szachownica[i][j] == 1) {
                    tile = new Tile(materials.white_tile, szachownica[i][j], { x: j, y: i })
                } else {
                    tile = new Tile(materials.black_tile, szachownica[i][j], { x: j, y: i })
                }
                tile.position.set((i - 3.5) * 50, 0, (j - 3.5) * 50);
                scene.add(tile);
            }
        }
    },
    drawPawns() {
        for (let i in pionki) {
            for (let j in pionki[i]) {
                if (pionki[i][j] != 0) {
                    let pawn;
                    if (pionki[i][j] == 1) {
                        pawn = new Pawn(materials.white_pawn, pionki[i][j], { x: j, y: i })
                    } else if (pionki[i][j] == 2) {
                        pawn = new Pawn(materials.black_pawn, pionki[i][j], { x: j, y: i })
                    }
                    pawn.position.set((i - 3.5) * 50, 20, (j - 3.5) * 50);
                    scene.add(pawn);
                }
            }
        }
    },
    movePawn() {
        toggleRaycaster(true)
        if (intersects.length > 0) {
            if (intersects[0].object.isPawn) {
                intersects[0].object.material = materials.selected_pawn;
                toggleRaycaster(false)
            }
        }
    }
    ,
    render() {
        if (intersects.length > 0) {
            if (intersects[0].object.isPawn) {
                intersects[0].object.material = materials.selected_pawn;
            }
        }

        renderer.render(scene, camera.threeCamera);
        requestAnimationFrame(Game.render);
    }


}
export { Game }