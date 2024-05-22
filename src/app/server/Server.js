import pjson from '../../package.json';
import Security from "./Security";
import VoteReceptor from "./VoteReceptor";

class Server {
    constructor(config) {
        const { token, env } = config;
        this.security = new Security(env);
        this.voteReceptor = new VoteReceptor(token);
    }

    start() {
        console.log(`Initializing vote plugin (v${pjson.version})...`);
        console.log(`Support Top-Games: https://top-games.net/contact`);
        console.log(`Support Top-Serveurs: https://top-serveurs.net/contact`);
        SetHttpHandler((req, res) => {
            if (req.path === '/') {
                req.setDataHandler(data => {
                    this.handleRequest(res, data, req.address);
                })
            }
        })
        console.log(`The vote plugin is active on the default server port`);
    }
    handleRequest = (res, data, address) => {
        if (! this.security.isTrustedIP(address)) {
            return this.returnError(res, 'ERROR: Receving a vote from an untrusted IP');
        }
        const payload = JSON.parse(data);
        if (payload.Action === "vote") {
		    this.voteReceptor.handleVote(payload).then(() => {
                res.writeHead(200);
                return res.send('success');
            }).catch((error) => {
                return this.returnError(res, error);
            });
        } else if (payload.Action === "refresh_ip") {
        	this.security.loadTrustedIP();
        } else if (payload.Action === "test") {
        	console.log('Test: The vote plugin is correctly linked to Top-games.net/Top-serveurs.net website');
		    res.writeHead(200);
		    res.send('test-success');
        } else {
            return this.returnError(res, 'ERROR: No action match the current payload');
        }
    };

    returnError(res, error) {
        console.log(error);
        res.writeHead(400);
        res.send(error);
    }

}

export default Server;
