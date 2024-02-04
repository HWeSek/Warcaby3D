import { allEvents } from "./src/modules/Ui";
import { Game } from "./src/modules/Main";
Game.drawTiles()
Game.drawPawns()
Game.render()
allEvents.init()