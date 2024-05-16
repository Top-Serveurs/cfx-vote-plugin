import dgram from 'dgram';
import pjson from '../../package.json';
import Security from "./Security";
import VoteReceptor from "./VoteReceptor";

class Server {
    constructor(config) {
        const { token, port, env } = config;
        this.security = new Security(env);
        this.voteReceptor = new VoteReceptor(token);
        this.port = port;
        this.socketServer = dgram.createSocket('udp4')
    }

    start() {
        console.log(`Initializing vote plugin (v${pjson.version})...`);
        console.log(`Support Top-Games: https://top-games.net/contact`);
        console.log(`Support Top-Serveurs: https://top-serveurs.net/contact`);
        SetHttpHandler((req, res) => {
            if (req.path === '/') {
                req.setDataHandler(data => {
                    this.handleRequest(data, req.address);
                })
                res.writeHead(200);
                res.send('OK');
            }
        })
    }

    handleListening = () => {
        const address = this.socketServer.address();
        console.log(`The vote plugin is active and listening on port ${address.port}`);
    };

    handleRequest = (data, address) => {
        if (! this.security.isTrustedIP(address)) {
            return console.log('ERROR: Receving a vote from an untrusted IP');
        }
        const payload = JSON.parse(data);
        if (payload.Action === "vote") {
	        this.voteReceptor.handleVote(payload);
        } else if (payload.Action === "refresh_ip") {
            this.security.loadTrustedIP();
        } else if (payload.Action === "test") {
            console.log('Test: The vote plugin is correctly linked to Top-games.net/Top-serveurs.net website');
        } else {
            console.log('ERROR: No action match the current payload');
        }
    };

    handleError = error => {
        console.log(`ERROR: ${error.stack}`);
        this.socketServer.close();
    };

}

export default Server;
