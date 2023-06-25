import Server from "./server/Server";

const config = {
    port: GetConvar("vote_port", "8192" ),
    token: GetConvar("vote_token", ""),
    env: GetConvar("vote_env", "prod")
};

const server = new Server(config);

on('onResourceStart', resourceName => {
    if (resourceName === 'vote') {
        if (config.token.length === 0) {
            console.log('ERROR: the vote token is missing in your config file. Please fill it!')
        } else {
            server.start();
            emit('onVoteReady');
        }
    }
});