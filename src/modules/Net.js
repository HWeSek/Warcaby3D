import { Game } from "./Main";

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
                /////////////TU SIE WSZYSTKO DZIEJE!
                document.querySelector('nav').innerText = data.response;
                document.getElementById('login').close();
                document.getElementById('waiting_room').style.display = 'block';

                let server_check = setInterval(() => {
                    fetch('/', { method: "POST", headers: { "Content-Type": "application/json" } })
                        .then(response => response.json())
                        .then(data => {
                            if (data.players.length == 2) {
                                document.getElementById('waiting_room').style.display = 'none';
                                document.querySelector('nav').innerText = `Mecz: ${data.players[0]} vs ${data.players[1]}`;
                                clearInterval(server_check);
                            }
                        })
                        .catch(error => console.log(error));
                }, 1000)
            })
            .catch(error => console.log(error));
    },
    resetUsers() {
        const options = {
            method: "POST",
        }
        fetch("/resetUsers", options)
            .then(data => {

                // działania po resecie
            })
            .catch(error => console.log(error));


    }

}

export { allNetFunctions }