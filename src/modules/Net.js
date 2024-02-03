import { Game } from "./Main";

const allNetFunctions = {

    loginUser(userName) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: userName
        }
        fetch("/", options)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                document.querySelector('nav').innerText = data;
                document.getElementById('login').close();
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