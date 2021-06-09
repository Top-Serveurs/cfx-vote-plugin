const path = require('path');

const baseConfig = {
    mode: 'production',
    target: 'node',
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        node: true,
                                    },
                                },
                            ],
                        ],
                        plugins: ['transform-class-properties']
                    },
                },
            },
        ],
    },
};

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'vote.js',
        path: path.resolve(__dirname, '..'),
    },
    ...baseConfig,
};
