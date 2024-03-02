import { Game } from "./Main";
import { io } from "https://cdn.socket.io/4.6.0/socket.io.esm.min.js";

let round_interval;

const client = io("ws://localhost:3000")
client.on('pawn_movement_data', (data)=> {
    Game.pawnMovement(data.id, data.destination);
})

client.on('pawn_death_data', (data)=> {
    Game.pawnDeath(data.id, data.color);
})

client.on('game_status_change', (data)=>{
    console.log(Game.black_pawns,Game.white_pawns);
    clearInterval(round_interval)
    Game.toggleRaycaster(false)
    console.log(data, Game.playerSide);
    if(Game.playerSide == data.round_flag){
        Game.toggleRaycaster(true)
        document.getElementById('oponent_turn').style.display = 'none';
    } else {
        document.getElementById('oponent_turn').style.display = 'block';
    }
    round_interval = setInterval(()=>{
       let timer_value = (30000 - ( Date.now() - parseFloat(data.time_start)))/1000
       document.getElementById('time_left').innerText = timer_value.toFixed(2);
    },50)
})

const allNetFunctions = {

    loginUser(userName) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nick: userName })
        }
        fetch("/", options)
            .then(response => response.json())
            .then(data => {
                /////////////TU SIE WSZYSTKO DZIEJE! -> jednak nie :tf:
                document.querySelector('nav h1').innerText = data.response;
                if (data.validator) {
                    document.getElementById('login').close();
                    document.getElementById('waiting_room').style.display = 'block';
                    Game.setPlayer(data.side)

                    let server_check = setInterval(() => {
                        this.serverCheck(server_check);
                    }, 1000)
                }
            })
            .catch(error => console.log(error));
    },
    serverCheck(intervalName) {
        fetch('/', { method: "POST", headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
            .then(data => {
                if (data.players.length == 2) {
                    document.getElementById('waiting_room').style.display = 'none';
                    document.querySelector('nav h1').innerText = `Mecz: ${data.players[0]} vs ${data.players[1]}`;
                    clearInterval(intervalName);
                    client.emit('game_start', {status: 'start'})
                }
            })
            .catch(error => console.log(error));
    }
    ,
    resetUsers() {
        const options = {
            method: "POST",
        }
        fetch("/resetUsers", options)
            .then(data => {

                // działania po resecie
            })
            .catch(error => console.log(error));
    },
    movePawn(id, destination){
        client.emit('pawn_movement_data', {id: id, destination: destination});
        Game.toggleRaycaster(false);
    },
    killPawn(id, color){
        client.emit('pawn_death_data', {id: id, color: color});
    }

}

export { allNetFunctions }