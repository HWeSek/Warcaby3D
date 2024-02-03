//UI BEEEEAAMU
import { allNetFunctions } from "./Net";
const allEvents = {

    init() {

        document.getElementById("loginBtn").onclick = function () {

            let userName = document.getElementById('nick').value;
            allNetFunctions.loginUser(userName)
        }

        document.getElementById("resetBtn").onclick = function () {

            allNetFunctions.resetUsers()
        }

    }

}

export { allEvents }