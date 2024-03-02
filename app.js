const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const socketio = new Server(server);
const bodyParser = require("body-parser");
const { log } = require('console');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text())

///TABLICA GRACZY!:
let active_players = [];

socketio.on('connection', (client) => {
    console.log("klient się podłączył z id = ", client.id)
    client.on('pawn_movement_data', (data)=>{
        socketio.emit('pawn_movement_data', data)
    })
});

app.post('/', (req, res) => {
    let response = "error!";
    let isValid = false;
    let side;
    if (req.body.nick != undefined) {
        let player = req.body.nick;
        //console.log(player);
        if (active_players.length < 2) {
            if (active_players.includes(player)) {
                response = "Już jest taki gracz!";
                isValid = false;
            } else {
                active_players.push(player);
                response = `Witaj ${player}!`;
                isValid = true;
                if (active_players.length == 1) {
                    side = "white";
                } else if (active_players.length == 2) {
                    side = "black";
                }
            }
        } else {
            console.log("error serwera!");
            response = "Gra w toku!";
            isValid = false;
        }

        //console.log(active_players);
    }
    res.header("application/json");
    res.send({ response: response, players: active_players, side: side, validator: isValid });
})

app.post('/resetUsers', (req, res) => {
    console.log("reset");
    active_players = [];
    res.redirect('/')
})

app.use(express.static('dist'))
app.use(express.static('public'))
server.listen(PORT, function () {
    console.log('Serwer dziala na porcie ', PORT);
});