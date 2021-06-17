import axios from "axios";

class Security {
    constructor(env) {
        this.env = env;
        this.trustedIP = [
          "188.165.45.67",
          "188.165.46.57",
        ];
        this.loadTrustedIP();
    }

    loadTrustedIP() {
        axios.get("https://top-games.net/trusted-ip.json")
        .then(response => {
            const {list} = response?.data;
            if (list) {
                this.trustedIP = list;
                if (this.env === 'dev') {
                    this.trustedIP.push("127.0.0.1");
                }
            } else {
                throw new Error("Invalid JSON");
            }
        })
        .catch(e => {
            console.log("ERROR: Unable to get trusted IP list from remote. Using default list.");
        });
    }

    isTrustedIP(ip) {
        return this.trustedIP.includes(ip);
    }
}

export default Security;