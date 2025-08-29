import Server from "./server/Server";

const config = {
    token: GetConvar("vote_token", ""),
    env: GetConvar("vote_env", "prod")
};

const server = new Server(config);

on('onResourceStart', resourceName => {
    if (resourceName === GetCurrentResourceName()) {
        if (config.token.length === 0) {
            console.log('\x1b[31m########################\x1b[0m')
            console.error('The vote token is missing in your config file. Please fill it!')
            console.log('\x1b[31m########################\x1b[0m')
        } else if (resourceName !== 'vote') {
            console.log('\x1b[31m########################\x1b[0m')
            console.error('The resource name (directory name) must be "vote". Actual name: ' + resourceName);
            console.log('\x1b[31m########################\x1b[0m')
        } else {
            server.start();
            emit('onVoteReady');
        }
    }
});