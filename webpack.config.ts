import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const config: webpack.Configuration & { devServer?: DevServerConfiguration } = {
    mode: 'production',
    entry: './src/index.ts', // Рекомендуется использовать TypeScript файл в качестве входного

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};

export default config;