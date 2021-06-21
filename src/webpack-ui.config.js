const path = require('path');

const baseConfig = {
    mode: 'production',
    target: 'node',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /(.js|.jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-class-properties']
                    },
                },
            },
        ],
    },
};

module.exports = {
    entry: './app/ui.jsx',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../ui/js'),
    },
    ...baseConfig,
};
