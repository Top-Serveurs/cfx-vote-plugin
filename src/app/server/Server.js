import dgram from 'dgram';
import Decrypter from "./Decrypter";
import Security from "./Security";
import VoteReceptor from "./VoteReceptor";
import pjson from '../../package.json';

class Server {
    constructor(config) {
        const { token, port, env } = config;
        this.security = new Security(env);
        this.decrypter = new Decrypter();
        this.voteReceptor = new VoteReceptor(token);
        this.port = port;
        this.socketServer = dgram.createSocket('udp4')
    }

    start() {
        console.log(`Initializing vote plugin (v${pjson.version})...`);
        console.log(`Support Top-Games: https://top-games.net/contact`);
        console.log(`Support Top-Serveurs: https://top-serveurs.net/contact`);
        this.socketServer.on('error', this.handleError);
        this.socketServer.on('message', this.handleMessage);
        this.socketServer.on('listening', this.handleListening);
        this.socketServer.bind(this.port);
    }

    handleListening = () => {
        const address = this.socketServer.address();
        console.log(`The vote plugin is active and listening on port ${address.port}`);
    }

    handleMessage = (msg, rinfo) => {
        if (! this.security.isTrustedIP(rinfo.address)) {
            return console.log('ERROR: Receving a vote from an untrusted IP');
        }
        const payload = this.decrypter.decrypt(`${msg}`);
        if (payload.action === "vote") {
            this.voteReceptor.handleVote(payload);
        } else if (payload.action === "refresh_ip") {
            this.security.loadTrustedIP();
        } else if (payload.action === "test") {
            console.log('Test: The vote plugin is correctly linked to Top-games.net/Top-serveurs.net website');
        } else {
            console.log('ERROR: No action match the current payload');
        }
        console.log(payload);
    }

    handleError = error => {
        console.log(`ERROR: ${error.stack}`);
        this.socketServer.close();
    }

}

export default Server;
