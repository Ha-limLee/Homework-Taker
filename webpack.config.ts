import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@server': path.resolve(__dirname, "../server"),
            '@contexts': path.resolve(__dirname, "src/contexts")
        }
    }
};

export default config;