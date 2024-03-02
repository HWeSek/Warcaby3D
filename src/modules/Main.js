import { Scene, AxesHelper, Color, AmbientLight, Raycaster, Vector2 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Tween, Easing } from '@tweenjs/tween.js';
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

///////////////////FUNNY???///////////
var Tewi;
const gltfLoader = new GLTFLoader();


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

let pawn_object_list = [];
let tile_object_list = [];

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
        window.removeEventListener('mousedown');
    }
}
toggleRaycaster(true)

const Game = {
    options: [],
    selected_pawn: undefined,
    playerSide: undefined,
    context: undefined,
    pawn_direction: undefined,
    pawn_tween: undefined,
    setPlayer(side) {
        console.log(side);
        switch (side) {
            case "white":
                camera.changePosition(-250, 250, 0)
                Game.playerSide = "white";
                break;
            case "black":
                camera.changePosition(250, 250, 0)
                Game.playerSide = "black";
                break;
        }
        gltfLoader.load('./inaba_tewi_fumo_from_touhou_project/scene.gltf', (gltfScene)=>{
            gltfScene.scene.scale.set(400,400,400)
            gltfScene.scene.position.set(0,40,0)
            scene.add(gltfScene.scene);
            Tewi = gltfScene
        })
    },
    drawTiles() {
        for (let i in szachownica) {
            for (let j in szachownica[i]) {
                let tile;
                if (szachownica[i][j] == 1) {
                    tile = new Tile(materials.white_tile, szachownica[i][j], { x: parseInt(j), y: parseInt(i) })
                } else {
                    tile = new Tile(materials.black_tile, szachownica[i][j], { x: parseInt(j), y: parseInt(i) })
                }
                tile.position.set((i - 3.5) * 50, 0, (j - 3.5) * 50);
                tile_object_list.push(tile);
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
                        pawn = new Pawn(materials.white_pawn, pionki[i][j], { x: parseInt(j), y: parseInt(i) })
                    } else if (pionki[i][j] == 2) {
                        pawn = new Pawn(materials.black_pawn, pionki[i][j], { x: parseInt(j), y: parseInt(i) })
                    }
                    pawn.position.set((i - 3.5) * 50, 20, (j - 3.5) * 50);
                    pawn_object_list.push(pawn);
                    scene.add(pawn);
                }
            }
        }
    },
    render() {
        switch (Game.playerSide) {
            case "white":
                Game.context = [1, 2]
                Game.pawn_direction = 1
                break;
            case "black":
                Game.context = [2, 1]
                Game.pawn_direction = -1
                break;

            default:
                break;
        }
        if (intersects.length > 0) {
            if (intersects[0].object.isPawn && intersects[0].object.color == Game.context[0]) {
                let cords = intersects[0].object.cord;
                pawn_object_list.forEach((pawn) => {
                    pawn.material = pawn.default_material
                    tile_object_list.forEach((tile) => {
                        if (tile.color == 0) { tile.material = materials.black_tile }
                    })

                })
                intersects[0].object.material = materials.selected_pawn;
                Game.selected_pawn = intersects[0].object

                tile_object_list.forEach((tile) => {

                    if ((tile.cord.x == cords.x + 1 && tile.cord.y == cords.y + Game.pawn_direction) || (tile.cord.x == cords.x - 1 && tile.cord.y == cords.y + Game.pawn_direction)) {
                        let placement = true;
                        pawn_object_list.forEach((pawn) => {
                            if ((tile.cord.x == pawn.cord.x && tile.cord.y == pawn.cord.y)) {
                                if (pawn.color == Game.context[0]) {
                                    placement = false;
                                    console.log('nie ma');
                                } else if (pawn.color == Game.context[1]) {
                                    console.log('tutaj będzie bicie');
                                }
                            }
                        })
                        if (placement) {
                            tile.material = materials.tile_choice;
                            Game.options.push(tile);
                            //console.log(Game.options, tile);
                        }

                    }
                })
                intersects = 0;
            }
        }
        if (intersects.length > 0) {
            if (Game.options.includes(intersects[0].object)) {
                //console.log('ruch');
                Game.options.forEach((tile) => {
                    tile.material = tile.default_material;
                })
                let p_x = Game.selected_pawn.cord.x
                let p_y = Game.selected_pawn.cord.y

                let t_x = intersects[0].object.cord.x
                let t_y = intersects[0].object.cord.y
                Game.options = [];
                //console.log([p_x, p_y], [t_x, t_y]);
                Game.selected_pawn.material = Game.selected_pawn.default_material
                console.log(Game.selected_pawn.position)
                Game.pawn_tween = new Tween(Game.selected_pawn.position)
                   .to({x: ((t_y - 3.5) * 50), z: ((t_x - 3.5) * 50)}, 1000)
                   .easing(Easing.Quadratic.InOut)
                   .onUpdate((coords)=>{
                       Game.selected_pawn.position.x = coords.x
                       Game.selected_pawn.position.y = coords.y
                       console.log(coords);
                   })
                   .onComplete(() => { console.log("koniec animacji") }) 
                   .start()
                Game.selected_pawn.position.set((t_y - 3.5) * 50, 20, (t_x - 3.5) * 50)
                Game.selected_pawn.cord = { x: parseInt(t_x), y: parseInt(t_y) }        
            }
        }
        try {
            Game.pawn_tween.update()
        } catch (error) {
            
        }
        if(Tewi){Tewi.scene.rotation.y += 0.05; console.log('usa tei');}
        renderer.render(scene, camera.threeCamera);
        requestAnimationFrame(Game.render);
    }


}
export { Game }